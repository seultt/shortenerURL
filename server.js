const express = require('express')


const app = express()

app.set('view engine', 'ejs')

// 'hello world 찍기'
app.get('/', (req, res)=> {
  res.render('index.ejs')
})


// 포트 연결
app.listen(3006, ()=> {
  console.log('listening..')
})




