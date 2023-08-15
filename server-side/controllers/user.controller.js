import { User } from "../models/user.model.js";
import passport from "passport";

export const getUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(500).send('Internal Server Error')
    }
    console.log('user is', req.user)
    return res.send(req.user)
}

export const registerUser = async (req, res) => {
    try {
        const { name, lastname, username, password } = req.body
        const user = new User({ name, lastname, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            console.log(user)
        })
        await user.save()
        console.log('data before registeration', req.body)
        console.log('data after registeration', registeredUser)
        res.status(200).send(req.user)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

export const loginUser = async (req, res, next) => {
    await passport.authenticate('local', (err, user, info) => {
        if (err){
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(!user) {
            res.status(401).send('username or passsword is incorrect')
        }
        else {
            req.login(user, err => {
                if (err){
                    console.log(err);
                    next(err)
                    return res.status(500).send('Internal Server Error');
                }
                console.log('it is working now', req.user)
                return res.send('Successfully Authenticated');
            })
        }
    })(req, res, next)
}

export const logoutUser = async (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        return res.send('succesfully logged out')
    })
}

export const addTOfavorites = async (req, res) => {
    const { user } = req
    const { id } = req.body
    const post = await Post.findById(id)
    const currentUser = await User.findById(user._id)
    if (currentUser.favorites.includes(post._id)) {
        const data = await User.findByIdAndUpdate(user._id, { $pull: { favorites: post._id } })
        console.log('removed post')
        return res.status(201).json({
            message: 'You removed the post to favorites',
            user: data
        })
    }
    currentUser.favorites.push(post._id)
    await currentUser.save()
    res.status(201).json({
        message: 'You added the post to favorites',
        user: currentUser
    })
}