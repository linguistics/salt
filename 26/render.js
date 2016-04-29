const fs = require('fs');
const path = require('path');
const optimist = require('optimist');
const js_yaml = require('js-yaml');
const less = require('less');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const React = require('react');
const ReactServer = require('react-dom/server');

var props_yaml = fs.readFileSync(path.join(__dirname, 'props.yaml'), {encoding: 'utf8'});
const commonProps = js_yaml.safeLoad(props_yaml);
Object.assign(commonProps, {version: process.env.VERSION});

require('babel-core/register');

const components = require('./components');

/**
Each route's handler should return a Buffer.
*/
const routes = [
  {
    url: 'about.html',
    handler() {
      return renderReact(components.About, {current_variable: 'a'});
    },
  },
  {
    url: 'call.html',
    handler() {
      return renderReact(components.Call, {current_variable: 'c'});
    },
  },
  {
    url: 'help.html',
    handler() {
      return renderReact(components.Help);
    },
  },
  {
    url: 'index.html',
    handler() {
      return renderReact(components.Main, {current_variable: 'm'});
    },
  },
  {
    url: 'instructions.html',
    handler() {
      return renderReact(components.Instructions, {current_variable: 'i'});
    },
  },
  {
    url: 'local.html',
    handler() {
      return renderReact(components.Local, {current_variable: 'l'});
    },
  },
  {
    url: 'program.html',
    handler() {
      return renderReact(components.Program, {current_variable: 'p'});
    },
  },
  {
    url: 'registration.html',
    handler() {
      return renderReact(components.Registration, {current_variable: 'r'});
    },
  },
  {
    url: 'site.css',
    handler() {
      return new Promise((resolve, reject) => {
        var less_string = fs.readFileSync(path.join(__dirname, 'site.less'), {encoding: 'utf8'});
        less.render(less_string, {}, (error, result) => {
          if (error) return reject(error);
          resolve(result.css);
        });
      }).then(css_string => {
        return postcss([autoprefixer]).process(css_string).then(result => {
          return new Buffer(result.css, 'utf8');
        });
      });
    },
  },
];

function renderReact(Component, localProps) {
  const props = Object.assign({}, commonProps, localProps);
  const element = React.createElement(components.Layout, props,
    React.createElement(Component, props)
  );
  const html = '<!DOCTYPE html>\n' + ReactServer.renderToStaticMarkup(element);
  return new Buffer(html, 'utf8');
}

function main() {
  const argv = optimist.options({
    out: {
      alias: 'o',
      describe: 'output directory',
      default: '/tmp',
    },
  }).argv;

  routes.forEach(route => {
    Promise.resolve(route.handler()).then(data => {
      const filepath = path.join(argv.out, route.url);
      console.error(`Rendering ${filepath}`);
      fs.writeFileSync(filepath, data);
    });
  });
}
if (require.main === module) {
  main();
}
