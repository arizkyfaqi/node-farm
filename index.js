const http = require('http')
const url = require('url')
const fs = require('fs')


const server = http.createServer((req, res) => {
    const pathName = req.url;
    
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the Overview!')
    } else if(pathName === '/product'){
        res.end('This is the Product!')
    } else if(pathName === '/api'){
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            const productData = JSON.parse(data)
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(data);
        })
        res.end('This is the API!')
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