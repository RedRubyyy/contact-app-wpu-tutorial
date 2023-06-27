import http from 'http'
import fs from 'fs'
function renderHTML (path , res) {
    fs.readFile(path , (err , data) => {
        function succesfull () {
            res.write(data);
        };
        function error () {
            res.writeHead(404);
            res.write('error file not found');
        };
        err ? error () : succesfull();
        res.end()
    });
};

http
    .createServer((req , res) => {
        res.writeHead(200 , {
            'Content-Type' : 'text/html',
        })
        const url = req.url;
        switch (url) {
            case '/about' : 
                renderHTML('about.html' , res)
                break;
            case '/home' : 
                renderHTML('home.html' ,res)
                break;
            default :
                res.writeHead(404);
                res.write('error not found')
        }
    })
    .listen(3000 , () => {
        console.log('server is listen in port 3000')
    })