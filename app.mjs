// import http from 'http'
// import fs from 'fs'
// function renderHTML (path , res) {
//     fs.readFile(path , (err , data) => {
//         function succesfull () {
//             res.write(data);
//         };
//         function error () {
//             res.writeHead(404);
//             res.write('error file not found');
//         };
//         err ? error () : succesfull();
//         res.end()
//     });
// };
// http
//     .createServer((req , res) => {
//         res.writeHead(200 , {
//             'Content-Type' : 'text/html',
//         })
//         const url = req.url;
//         switch (url) {
//             case '/about' : renderHTML('about.html' , res)
//                 break;
//             case '/home' : renderHTML('home.html' ,res)
//                 break;
//             default :
//                 res.writeHead(404);
//                 res.write('error not found')
//         }
//     })
//     .listen(3000 , () => {
//         console.log('server is listen in port 3000')
//     })





import express from 'express'
const app = express()
const port = 3000
//<<< __filname dan __dirname tidak bisa diakses di js es6
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OR THIS
const relativeRoute = path.join(path.join(process.cwd()));
//>>>Gunakan untuk mengakses __filname dan __dirname di js es 6 


// RQUEST => YANG DIMINTA
// RESPONSE => YANG DIKEMBALIKAN

function createPage (root , source) {
  app.get(root, (req, res) => {
    res.send(source)
  })
}

app.get('/' , (req , res) => {
  res.sendFile('./index.html' , {root: __dirname})
})

app.get('/about' , (req , res) => {
  res.sendFile('./about.html' , {root: relativeRoute})
})

app.get('/contact' , (req , res) => {
  res.sendFile('./contact.html' , {root: __dirname})
})

//<<<<< ROUTE DENGAN METODHE GET (MENULIS DI URL)
// app.get('/home', (req, res) => {
//   // res.json({
//   //   name: 'nopal',
//   //   quote: 'bakso kontol'
//   // })

//   // res.send('Hello World!')
//   res.sendFile('./home.html' , { root: __dirname })
// })
//>>>>>

// HALAMAN YANG DIJALANKAN JIKA REQUES ROUTE TIDAK ADA
app.use('/' , (req ,res) => {
  //<<< DIGUNAKAN UNTUK MENGGANTI STATUS CODE KE 404 dari 304
  res.status(404)
  //>>>
  res.send('<h1>ERROR 404 </h1><p>FILE NOT FOUND</p>')
})

// Nmenambahkan fungsi yang dijalankan 
app.listen(port, () => {
  console.log(`server ready in http://localhost:${port}`)
})
