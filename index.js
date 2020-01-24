const http = require('http')
const url = require('url')
const fs = require('fs')

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url;
    
    //Overview page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-Type' : 'text/html'})
        
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el))
        
        res.end(tempOverview)

    //product page
    } else if(pathName === '/product'){
        res.end('This is the Product!')

    //api page
    } else if(pathName === '/api'){
         res.writeHead(200, {'Content-Type' : 'application/json'})
         res.end(data);
    
    //not found page
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