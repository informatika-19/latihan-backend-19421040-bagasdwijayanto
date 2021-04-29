const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/latihan', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('berhasil konek ke database')
}).catch((e) => {
    console.log(e)
    console.log('gagal konek ke database')
})
 
app.use(bodyParser.json({
    extends: true,
    limit: '20mb'
}))

app.use(bodyParser.urlencoded({
    extends: true,
    limit: '20mb'
}))

app.get('/', function (req, res) {
  res.send('<h1>Hello Word</h1>')
})
 
app.get('/profile/:provinsi', (req, res) => {
    console.log(req.params)
    res.send('Provinsi Anda ' + req.params.provinsi)
})

//req params
app.get('/daerah/:namadaerah/:id', (req, res) => {
    const namaDaerah = req.params.namaDaerah
    const idDaerah = req.params.id
    res.send('anda Di ' +namaDaerah + ' Id Daerah = ' + idDaerah)
})

app.use('/User', require('./routes/User'))
app.use('/kegiatan', require('./routes/kegiatan'))

app.listen(3000, () => {
    console.log('Server Started')
})