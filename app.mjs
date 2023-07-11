import path from 'path';
import express from 'express';
import { validationForm } from './utils/validationForm.mjs';
import { loadDatas , findData , addDatas}
  from './utils/contact.mjs';
// FLASH MASSAGE
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';


const app = express()
const port = 3000
const relativeRoute = path.join(path.join(process.cwd()));


//CONFIGURE FLASH

app.use(cookieParser('secret'))
app.use(
  session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true,
  })
)
app.use(flash())

//CONFIGURE EJS
app.set('view engine' , 'ejs');
app.set('views' , `${relativeRoute}/display`)
app.use(express.urlencoded({extended : true}))

// HOME PAGE
app.get('/' , (req , res) => {
  res.render('index' , {
    titel : 'HOME',
    msg: req.flash('msg')
  })
})
// ABOUTPAGE
app.get('/about' , (req , res) => {
  res.render('about' , {titel : 'ABOUT'})
})
// CONTACT PAGE
app.get('/contact' , (req , res) => {
  const datas = loadDatas()
  res.render('contact' , {
    titel : 'CONTACT' , datas
  })
})

app.post('/' , (req , res) => {
  const validation = validationForm(req.body)
  console.table(validation)
  req.flash('msg' , validation.message)
  if (validation.message == "Successfully sending data") {
// VALIDATION FULLFIELD
    addDatas(req.body);
    res.redirect('/')
  }else {
// VALIDATION NOT FULLFIELD
    res.redirect('/')
    // res.render('index' , {
    //   titel : 'HOME' ,
    //   message : validation.message
    // })
  }
  
})

// DETAIL CONTACT
app.get('/contact/:code' , (req , res) => {
  const data = findData(req.params.code)
  res.render('detail.ejs' , {
    titel : 'CONTACTIONAL ', data
  })
  // res.send(req.params.code)
})

// HALAMAN YANG DIJALANKAN JIKA REQUES ROUTE TIDAK ADA
app.use('/' , (req ,res) => {
  res.status(404)
  res.send('<h1>ERROR 404 </h1><p>FILE NOT FOUND</p>')
})

// MENJALANKAN EXPRESS APP
app.listen(port, () => {
  console.log(`server ready in http://localhost:${port}`)
})