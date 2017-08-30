const express = require('express')
const morgan = require('morgan') // 현재 서버상황
const basicAuth = require('express-basic-auth')


// data 구조
// const data = [
//   {longUrl: 'http://google.com', 
//   id: '58DX37' }
// ]

const app = express()
// 로그인 안하면 막는 기능
const authMiddleware = basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
})


app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(morgan('tiny'))


// 'hello world 찍기'
app.get('/', authMiddleware, (req, res)=> {
  res.render('index.ejs')
})



//form 전송방법
// app.post()


// 포트 연결
app.listen(3014, ()=> {
  console.log('listening..')
})




