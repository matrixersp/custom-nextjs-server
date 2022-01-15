import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

console.log('starting app');
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)

    if(parsedUrl.pathname === '/a' && req.method === 'GET') {
      console.log('pathname', parsedUrl.pathname, 'method', req.method);
      // push data into array

      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({ success: true }));
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port)

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
