const express = require('express')
const app = express()

// app.set('view engine', 'ejs') // express가 자동으로 ejs를 불러옴

app.get('/', (req, res)=> {
  res.send('hello world')
})

// app.use(morgan('tiny'))

app.listen(3000, ()=> {
  console.log('listening..')
})




