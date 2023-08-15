import { Router } from "express";
import { User } from "../models/user.model.js";
import { catchAsync } from "../utilities/catchAsync.js";
import { Post } from "../models/post.model.js";
import * as user from '../controllers/user.controller.js'
import passport from "passport";
import { isAuthenticated } from "../middleware.js";


export const userRouter = Router()

userRouter.route('/')
    .get(user.getUser)
    .post(catchAsync(user.registerUser))

userRouter.post('/login', catchAsync(user.loginUser))

userRouter.get('/logout', catchAsync(user.logoutUser))

userRouter.post('/favorites',isAuthenticated, catchAsync(user.addTOfavorites))
