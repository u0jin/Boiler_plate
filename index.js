
const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')

const {User} = require("./models/User");
const bodyParser = require('body-parser');

const config = require("./config/key");

//서버에서 받은 데이터 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello ujin~~!')
})


app.post('/register', (req, res) => {
  // 회원가입 라우터
  const user = new User(req.bosy)
  
  user.save((err,userInfo)=>{
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})