import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import cors from 'cors'
import { postRouter } from './routes/posts.js'
import { userRouter } from './routes/user.js'
import LocalStrategy from 'passport-local'
import { ExpressError } from "./utilities/expressError.js";
import { User } from './models/user.model.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'


import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.ATLAS_URI
const frontEndLink = process.env.FRONTEND_URL || 'http://localhost:5173'

mongoose.connect(uri)
    .then(() => {
        console.log('mongoo connection is open!!')
    })
    .catch((err) => {
        console.log('there is errooo!!!')
        console.log(err)
    })

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, saveUninitialized: false,
    cookie: { httpOnly: true , expires: Date.now() + 1000 * 60 * 60 * 24 * 7, maxAge: 1000 * 60 * 60 * 24 * 7}
}))
app.use(cors({
    origin: frontEndLink,
    credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser(process.env.COOKIE_SECRET))
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})


app.use('/posts', postRouter)
app.use('/users', userRouter)


app.get('/', (req, res) => {
    res.send('hello there')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    console.log(err)
    if(!err.message) err.message = 'oh no, something went wrong11'
    res.status(statusCode).json(err)
}) 

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
