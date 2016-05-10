import {IncomingMessage, ServerResponse, createServer} from 'http';
// import {readFileSync, writeFileSync} from 'fs';
import {readFile, writeFile} from 'mz/fs';
import {join, extname} from 'path';
const js_yaml = require('js-yaml');
import * as less from 'less';
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const mime = require('mime-types');
import * as optimist from 'optimist';
import * as url from 'url';
import * as urlio from 'urlio';
import * as React from 'react';
import * as ReactServer from 'react-dom/server';

const propsFilepath = join(__dirname, 'props.yaml');

const pages = [
  {name: 'About',        current_variable: 'a'},
  {name: 'Call',         current_variable: 'c'},
  {name: 'Help',         current_variable: null},
  {name: 'Index',        current_variable: 'm'}, // m for main
  {name: 'Instructions', current_variable: 'i'},
  {name: 'Local',        current_variable: 'l'},
  {name: 'Program',      current_variable: 'p'},
  {name: 'Registration', current_variable: 'r'},
];

interface Route {
  url: string;
  handler({params}): Promise<Buffer>;
}
const routes: Route[] = [
  {
    url: '/:id.html',
    handler({params}) {
      const {name, current_variable} = pages.find(page => page.name.toLowerCase() === params.id);
      // force reload of components module
      delete require.cache[require.resolve('./components')];
      const components = require('./components');
      const Component = components[name];
      return readFile(propsFilepath, {encoding: 'utf8'}).then(props_yaml => {
        return js_yaml.safeLoad(props_yaml);
      }).then(commonProps => {
        const version = process.env.VERSION;
        const props = Object.assign({}, commonProps, {current_variable, version});
        const element = React.createElement(components.Layout, props,
          React.createElement(Component, props)
        );
        const html = '<!DOCTYPE html>\n' + ReactServer.renderToStaticMarkup(element);
        return new Buffer(html, 'utf8');
      });
    },
  },
  {
    url: '/site.css',
    handler() {
      const site_less_path = join(__dirname, 'site.less');
      return readFile(site_less_path, {encoding: 'utf8'})
      .then(site_less_string => less.render(site_less_string))
      .then(renderOutput => postcss([autoprefixer]).process(renderOutput.css))
      .then(result => new Buffer(result.css, 'utf8'));
    },
  },
  {
    url: '/**',
    handler({params}) {
      const local_path = join(__dirname, params.splat);
      return readFile(local_path);
    },
  },
];

export function render(url: string): Promise<Buffer> {
  const route = urlio.parse(routes, {url});
  return route.handler({params: route.params});
}

export function start(port: number = 7258, hostname: string = '127.0.0.1') {
  const server = createServer((req, res) => {
    const {pathname} = url.parse(req.url);
    // try {url}, {url + '.html'}, and {url + 'index.html'}
    render(pathname)
    .catch(() => render(pathname + '.html'))
    .catch(() => render(pathname + 'index.html'))
    .then(data => {
      const contentType = mime.contentType(extname(pathname)) || 'text/html';
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }, error => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');

      res.end(error.stack);
    });
  });
  server.on('listening', () => {
    const address = server.address();
    console.log(`server listening on http://${address.address}:${address.port}`);
  });
  server.listen(port, hostname);
}

// node_modules/.bin/tsc --watch
function main() {
  const argv = optimist.options({
    out: {
      alias: 'o',
      describe: 'output directory',
      default: '/tmp',
    },
  }).argv;

  const command = argv._[0];
  if (command === 'render') {
    Promise.all(
      [
        '/site.css',
        '/site.js',
        ...pages.map(page => `/${page.name.toLowerCase()}.html`),
      ].map(url => {
        const filepath = join(argv.out, url);
        console.log(`Rendering ${url}`);
        return render(url).then(data => {
          console.log(`Writing ${filepath}`);
          return writeFile(filepath, data);
        });
      })
    ).then(() => {
      console.log('Done');
    }, error => {
      console.log('Error: ', error.stack);
    });
  }
  else {
    start();
  }
}
if (require.main === module) {
  main();
}
