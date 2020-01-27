const http = require('http')
const url = require('url')
const fs = require('fs')
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate')

//blocking proccess
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)


const slugs = dataObj.map(el => slugify(el.productName, {lower:true}))

console.log(slugs)

const server = http.createServer((req, res) => {

     const {query, pathname} = url.parse(req.url, true)   
    
    //Overview page
    if(pathname === '/' || pathname === "/overview"){
        res.writeHead(200, {'Content-Type' : 'text/html'})
        
        /*
            join() is an array function that used to retrun a string form the array
        */

        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
        
        res.end(output)

    //product page
    } else if(pathname === '/product'){
        res.writeHead(200, {'Content-Type' : 'text/html'})
        
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        
        res.end(output)

    //api page
    } else if(pathname === '/api'){
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