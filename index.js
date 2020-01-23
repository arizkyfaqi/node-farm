const http = require('http')
const url = require('url')
const fs = require('fs')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url;
    
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the Overview!')
    } else if(pathName === '/product'){
        res.end('This is the Product!')
    } else if(pathName === '/api'){
         res.writeHead(200, {'Content-Type' : 'application/json'})
         res.end(data);
        
    } else {
        res.writeHead(404, {
            'Content-Type' : 'text/html',
            'my-own-header' : 'hello-world'
        })
        res.end('<h1>Page Not Found!</h1>')
    }

})

server.listen(3000)
console.log('server is running!')