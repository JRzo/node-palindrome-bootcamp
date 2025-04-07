const http = require('http');
const fs = require('fs');
const url = require('url')
const querystring = require('querystring');
const { json } = require('stream/consumers');


const server = http.createServer( (req, res) =>{
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page)

    if(page ===  '/'){
        fs.readFile("../index.html", (error, data) =>{
            if(error){
                console.log('404 Error html');
                res.writeHead(404);
                return res.end("404 => not found")
            }

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        })
    }

    else if(page === '/result'){
        console.log(params.answer)
        if('answer' in params){
            console.log(params['answer'])
            let re = /[^A-Za-z0-9]/g;
            let lowWord = params['answer'].toLowerCase().replace(re, "");
            let reverseWord = lowWord.split("").reverse().join("");
    
            res.end(JSON.stringify(lowWord === reverseWord));

    }}

    else if(page === '/css/index.css'){
        fs.readFile('../css/index.css', (error, data) =>{
            if(error){
                console.log('404 Error css' );
                res.writeHead(404);
                return res.end("404 => not found css")
            }

            res.writeHead(200, {"Content-Type": "text/css"});
            res.end(data);
        })
    }

    else if(page === '/js/index.js'){
        fs.readFile('../js/index.js', (error, data) =>{
            if(error){
                console.log('404 Error js');
                res.writeHead(404);
                return res.end("404 => not found js")
            }
            res.writeHead(200, {'Content-Type': "application/json"});
            res.end(data);
        })
    }
});

server.listen(5000)