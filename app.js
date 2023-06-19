const express = require('express')
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors');
const db = require('./utils/db')
const player = require('./utils/player')
const app = express()
const port = 3000

const session = require('express-session')
const cookie = require('cookie-parser')
const flash = require('connect-flash')

//flahs configuration
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

//set up ejs as view engine
app.set('view engine', 'ejs')
app.use(expressLayouts)

//set up cors
app.use(cors());

//set up body parser
// app.use(express.urlencoded())
// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies (e.g., form data)
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Halaman Utama',
        layout: 'layouts/main-layout'
    })
})

app.get('/play', (req, res) => {
    res.render('login', {
        title: 'Halaman Login',
        layout: 'layouts/main-layout',
        msg: req.flash('msg')
    })
})

app.get('/daftar', (req, res) => {
    res.render('daftar', {
        title: 'Halaman Pendaftaran',
        layout: 'layouts/main-layout'
    })
})

app.get('/rank', (req, res) => {
    res.render('rank', {
        title: 'Halaman Rank',
        layout: 'layouts/main-layout'
    })
})

app.get('/topup', (req, res) => {
    res.render('topup', {
        title: 'Halaman Top Up',
        layout: 'layouts/main-layout'
    })
})

app.get('/library', (req, res) => {
    res.render('library', {
        title: 'Halaman Library',
        layout: 'layouts/main-layout'
    })
})

app.get('/player', (req, res) => {
    const sql = ('SELECT * FROM player')
    db.query(sql, (err, result) => {
        res.status(200).send({
            message: 'Success',
            result
        })
    })
})

app.post('/player', (req, res) => {
    // const result = req.body
    // const { username, password } = req.body
    player.addPlayer(req.body)
    // const sql = (`INSERT INTO player (username, password) VALUES ('${username}', '${password}')`)
    // db.query(sql, (err, result) => {
    //     res.status(200).send({
    //         message: 'Success',
    //         result,
    //         err
    //     })
    // })

    // send flash message
    req.flash('msg', 'Akun berhasil dibuat!')
    res.redirect('/play')
})

app.get('/player/:id', (req, res) => {
    const id = req.params.id
    const sql = (`SELECT * FROM player WHERE id = ${id}`)
    db.query(sql, (err, result) => {
        console.log()
        if (err) {
            res.status(406).send({
                message: 'Id must a number!'
            })
        } else if (result.length == 0) {
            res.status(404).send({
                message: 'User not found!'
            })
        } else {
            res.status(200).send({
                message: 'Success',
                result
            })
        }
    })
})

app.use('/', (req, res) => {
    res.status(404).send('404')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})