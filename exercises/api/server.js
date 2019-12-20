const http = require('http');
const url = require('url');
const fs = require('fs')
const path = require('path')
const mime = require('mime')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  return new Promise((resolve, reject) => {
    const assetPath = path.join(__dirname, 'assets', name);
    fs.readFile(assetPath, (err, file) => {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    })
  })
}

const hostname = '127.0.0.1';
const port = 3000;

const router = {
  "/ GET": {
    asset: "text/html",
    type: mime.type("html")
  },
  "/ styles.css": {
    asset: "styles/css",
    type: mime.type("css")
  }
}

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer((req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  // this is sloppy, especially with more assets, create a "router

  const routerMatch = router[`${route} ${method}`]

  const {
    asset,
    type
  } = routerMatch;

  res.writeHead(200, type);
  res.write(findAsset('index.html'));
  res.end();
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})