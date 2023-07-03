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


// APLICATION LEVEL MIDDLEWARE

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
  // JIKA TIDAK DITAMBAHKAN NEXT() HALAMAN AKAN HANGGING
})


const APIData = [
  {
    name : 'Roger',
    bounty : 4_269_000
  },{
    name : 'Marshal teach',
    bounty : 2_820_000
  },{
    name : "Zoro",
    bounty : 1_500_000
  },{
    name : 'Monkey D',
    bounty : 3_000_000
  }
]


//CONFIGURE EJS

//<<<< UNTUK MENGATUR TIPE VIEW ENGINE
app.set('view engine' , 'ejs');
//>>>>

//<<<< UNTUK MENGATUR DIREKTORI REALATIF PADA FILE VIEW
app.set('views' , __dirname + '/display')
//>>>>

app.get('/' , (req , res) => {
  res.render('index' , { 
    titel : 'HOMEEXAPLE' ,
    APIData})
})

app.get('/about' , (req , res) => {
  res.render('about' ,{titel : 'ABOUTPAGE'})
})

app.get('/contact' , (_req , res) => {
  res.render('contact' , {titel : 'CONTACTIONAL '})

})

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

