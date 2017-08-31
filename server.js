const express = require('express')
const morgan = require('morgan') // 현재 서버상황
const basicAuth = require('express-basic-auth')
const randomstring = require('randomstring')
const bodyParser = require('body-parser')


//data 구조
const data = [
  {longUrl: 'http://google.com', 
  id: randomstring.generate(6) }
]

const app = express()
// 로그인( 안하면 막는 )기능 
const authMiddleware = basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
})

// form 데이터 전송 body에 URL에 인코딩 전송된 특별한 형식을 자바스크립트로 변경
const bodyParserMiddleware = bodyParser.urlencoded({extended: false}) 


app.set('view engine', 'ejs') // express가 자동으로 ejs를 불러옴
app.use('/static', express.static('public'))
app.use(morgan('tiny')) // 현재 터미널의 서버 상황

// 'hello world 찍기' => data 객체 찍기
app.get('/', authMiddleware, (req, res)=> {
  res.render('index.ejs', {data}) 
})

// find을 이용하여 shortener url을 logurl로 연결
app.get('/:id', (req, res) => {
  const id = req.params.id
  const matched = data.find(item => item.id === id)
  if (matched) {
    res.redirect(301, matched.longUrl)
  } else {
    res.status(404)
    res.send('404 Not Found')
  }
})



//form 전송방법

// data에 있는 id와 새로 randomstring한 변수 candiate를 while문으로 반복 비교하여 같은 값이 없다면 candidate를 변수 id에 담아 while문을 끝내라! 
app.post('/', authMiddleware, bodyParserMiddleware, (req,res)=> {
  const longUrl = req.body.longUrl // ejs파일의 form 태그 name이 url 인것을 longUrl 변수에 담음 
  let id
  if(!longUrl){
    res.redirect('/');
    return;
  } // 입력값이 빈문자열일 때!
  while (true) {
    const candidate = randomstring.generate(6)
    const matched = data.find(item => item.id === candidate)
    if (!matched) {
      id = candidate
      break
    }
  }
  data.push({id, longUrl})
  res.redirect('/')
})


// 포트 연결
app.listen(5002, ()=> {
  console.log('listening..')
})




