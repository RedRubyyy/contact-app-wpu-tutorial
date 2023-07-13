// NODE && EXPRESS
import path from 'path';
import express from 'express';
// VALIDATION
import { validationForm , editDataValidation} from './utils/validationForm.mjs';
// DATA PROCESSING
import {loadDatas , findData , deleteData , addData} from './utils/datasPocessing.mjs';
// FLASH MASSAGE
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';

// ROUTE CONFIGURE
const app = express()
const port = 3000
const processCwd = process.cwd()
const relativeRoute = path.join( path.join(processCwd) );

//CONFIGURE FLASH
app.use(cookieParser('secret'))
app.use( session(
  {
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
});
// POST DATA
app.post('/' , (req , res) => {
  const validation = validationForm(req.body);
  req.flash('msg' , validation.message);
  if (validation.message == "Successfully sending data") {
    addData(req.body);
  }
  res.redirect('/')
})
// DELETE DATA
app.get('/contact/delete/:code' , (req , res) => {
  const data = findData(req.params.code);
  if (!data ){
    res.status(404)
    res.redirect(`/contact/not-found/${req.params.code}`);
  }else{
    deleteData(req.params.code);
    res.redirect('/contact')
  };
});
// EDIT DATA
app.get('/contact/edit/:code' , (req , res) => {
  const data = findData(req.params.code)
  res.render('edit.ejs' , {
    titel : 'EDIT CONTACT' , 
    data ,
    msg: req.flash('msg')
  })
})
// UPDATE CONTACT LIST
app.post('/contact/update' , (req , res) => {
  const data = req.body
  const validation = editDataValidation(data);
  req.flash('msg' , validation.message);
  if (validation.status) {
    deleteData(data.code)
    addData(validation.dataSend , data.code)
  }
  res.redirect(`/contact/edit/${data.code}`)
})
// DETAIL CONTACT
app.get('/contact/detail/:code' , (req , res) => {
  const data = findData(req.params.code)
  res.render('detail.ejs' , {
    titel : 'CONTACTIONAL ', data
  })
});
// HALAMAN YANG DIJALANKAN JIKA REQUES ROUTE TIDAK ADA
app.use('/' , (req ,res) => {
  res.status(404)
  res.send('<h1>ERROR 404 </h1><p>FILE NOT FOUND</p>')
});
// MENJALANKAN EXPRESS APP
app.listen(port, () => {
  console.log(`server ready in http://localhost:${port}`)
});