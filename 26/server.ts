import {IncomingMessage, ServerResponse, createServer} from 'http'
import {AddressInfo} from 'net'
import {spawn, ChildProcess} from 'child_process'
import {readFile, writeFile, exists, createReadStream, createWriteStream, readdir} from 'mz/fs'
import {join, extname} from 'path'
const js_yaml = require('js-yaml')
import * as less from 'less'
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const mime = require('mime-types')
import * as optimist from 'optimist'
import {parse} from 'url'
import * as urlio from 'urlio'
import * as React from 'react'
import * as ReactServer from 'react-dom/server'

const propsFilepath = join(__dirname, 'props.yaml')

const boxSyncDirpath = join(process.env.HOME, 'Box Sync')

const pages = [
  {name: 'About',        current_variable: 'a'},
  {name: 'Call',         current_variable: 'c'},
  {name: 'Help',         current_variable: null},
  {name: 'Index',        current_variable: 'm'}, // m for main
  {name: 'Instructions', current_variable: 'i'},
  {name: 'Local',        current_variable: 'l'},
  {name: 'Program',      current_variable: 'p'},
  {name: 'Registration', current_variable: 'r'},
  {name: 'Proceedings',  current_variable: 's'},
]

interface Submission {
  id: string
  author: string
  title: string
}
interface Session {
  id?: string
  submissions: Submission[]
}
interface Props {
  lightningtalks: Session[]
}

function submissionName(submission: Submission): string {
  return submission.author.split(/,|\s+and\s+/)[0].match(/[-\w']+$/)[0].toLowerCase()
}

function findFiles() {
  return Promise.all(
    ['abstracts', 'shared'].map(dirpath => {
      return readdir(join(__dirname, dirpath))
    })
  ).then(([abstracts, shared]) => ({abstracts, shared}))
}

interface Route {
  url: string
  handler({params}): Promise<Buffer>
}
const routes: Route[] = [
  {
    url: '/:id.html',
    handler({params}) {
      const {name, current_variable} = pages.find(page => page.name.toLowerCase() === params.id)
      // force reload of components module
      delete require.cache[require.resolve('./components')]
      const components = require('./components')
      const Component = components[name]
      const commonPropsPromise = readFile(propsFilepath, {encoding: 'utf8'}).then(props_yaml => {
        return js_yaml.safeLoad(props_yaml)
      })
      const filesPromise = findFiles()
      return Promise.all([commonPropsPromise, filesPromise]).then(([commonProps, files]) => {
        const version = process.env.VERSION
        const props = Object.assign({}, commonProps, {current_variable, version, files})
        const element = React.createElement(components.Layout, props,
          React.createElement(Component, props)
        )
        const html = `<!DOCTYPE html>\n${ReactServer.renderToStaticMarkup(element)}`
        return Buffer.from(html, 'utf8')
      })
    },
  },
  {
    url: '/site.css',
    handler() {
      const site_less_path = join(__dirname, 'site.less')
      return readFile(site_less_path, {encoding: 'utf8'})
      .then(site_less_string => less.render(site_less_string))
      .then(renderOutput => postcss([autoprefixer]).process(renderOutput.css))
      .then(result => Buffer.from(result.css, 'utf8'))
    },
  },
  {
    url: '/**',
    handler({params}) {
      const local_path = join(__dirname, params.splat)
      return readFile(local_path)
    },
  },
]

export function render(url: string): Promise<Buffer> {
  const route = urlio.parse(routes, {url})
  return route.handler({params: route.params})
}

function formatServerAddress(address: string | AddressInfo): string {
  if (typeof address == 'string') {
    return address
  }
  return `${address.address}:${address.port}`
}

export function start(port: number = 7258, hostname: string = '127.0.0.1') {
  const server = createServer((req, res) => {
    const {pathname} = parse(req.url)
    // try {url}, {url + '.html'}, and {url + 'index.html'}
    render(pathname)
    .catch(() => render(`${pathname}.html`))
    .catch(() => render(`${pathname}index.html`))
    .then(data => {
      const contentType = mime.contentType(extname(pathname)) || 'text/html'
      res.setHeader('Content-Type', contentType)
      res.end(data)
    }, error => {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')

      res.end(error.stack)
    })
  })
  server.on('listening', () => {
    const address = server.address()
    console.log(`server listening on http://${formatServerAddress(server.address())}`)
  })
  server.listen(port, hostname)
}

/** Returns the filepath of the title slide for the indicated lightning talk, generating it if needed */
function prepareTitleSlide(session: Session, submission: Submission): Promise<string> {
  const name = submissionName(submission)
  const filepath = join(boxSyncDirpath, 'salt26', 'lightning', 'titles', `${session.id}-${name}.pdf`)
  return exists(filepath).then(filepathExists => {
    if (filepathExists) {
      return filepath
    }
    else {
      console.error(`Generating ${filepath}`)
      return readFile(join(__dirname, 'title-template.html'), {encoding: 'utf8'}).then(templateHtml => {
        const titleHtml = templateHtml
          .replace('TITLE', submission.title)
          .replace('AUTHOR', submission.author)
        return new Promise<string>((resolve, reject) => {
          const wkhtmltopdf = spawn('wkhtmltopdf', ['--page-width', '5in', '--page-height', '4in', '-', filepath])
          wkhtmltopdf.stdin.end(titleHtml)
          wkhtmltopdf.on('close', () => {
            console.error(`Generated ${filepath}`)
            resolve(filepath)
          }).on('error', reject)
        })
      })
    }
  })
}

function prepareSlidePair(session: Session, submission: Submission): Promise<string[]> {
  return prepareTitleSlide(session, submission).then(titleSlideFilepath => {
    const name = submissionName(submission)
    const submittedSlidesFilepath = join(boxSyncDirpath, 'salt26', 'lightning', `${session.id}-${name}.pdf`)
    return exists(submittedSlidesFilepath).then(submittedSlidesFilepathExists => {
      return [titleSlideFilepath, ...(submittedSlidesFilepathExists ? [submittedSlidesFilepath] : [])]
    })
  })
}

// npx tsc --watch
function main() {
  const argv = optimist.options({
    out: {
      alias: 'o',
      describe: 'output directory',
      default: '/tmp',
    },
  }).argv

  const command = argv._[0]
  if (command === 'render') {
    Promise.all(
      [
        '/site.css',
        '/site.js',
        ...pages.map(page => `/${page.name.toLowerCase()}.html`),
      ].map(url => {
        const filepath = join(argv.out, url)
        console.log(`Rendering ${url}`)
        return render(url).then(data => {
          console.log(`Writing ${filepath}`)
          return writeFile(filepath, data)
        })
      })
    ).then(() => {
      console.log('Done')
    }, error => {
      console.log('Error: ', error.stack)
    })
  }
  else if (command === 'lightning-sessions') {
    // const root = '~/BoxSync/salt26/lightning';
    return readFile(propsFilepath, {encoding: 'utf8'}).then(props_yaml => {
      return js_yaml.safeLoad(props_yaml)
    }).then((props: Props) => {
      // return a list of two strings if they submitted slides (the title slide
      // and submission), or just one string (the title slide) if they didn't.
      props.lightningtalks.map(session => {
        Promise.all<string[]>(
          session.submissions.map(submission => {
            return prepareSlidePair(session, submission)
          })
        ).then(filenamess => {
          const filenames = [].concat(...filenamess)
          console.log('pdftk \\')
          filenames.forEach(filename => {
            console.log(`    "${filename}" \\`)
          })
          console.log('  cat output -')
          const pdftk_process = spawn('pdftk', [...filenames, 'cat', 'output', '-'])

          const targetFilepath = join(boxSyncDirpath, 'salt26', `lightning-${session.id}-all.pdf`)
          console.error(`Writing ${targetFilepath}`)
          const targetStream = createWriteStream(targetFilepath)
          pdftk_process.stdout.pipe(targetStream)
        }, (error) => {
          console.error('root level error', error)
        })

      })
    })
  }
  else {
    start()
  }
}
if (require.main === module) {
  main()
}
