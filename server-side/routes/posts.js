import { Router } from "express";
import multer from "multer";
import { storage } from "../cloudinary/cloudinary.js";
import { isAuthenticated, isAuthor } from "../middleware.js";
import { catchAsync } from "../utilities/catchAsync.js";
import * as post from '../controllers/post.controller.js'
import { Post } from "../models/post.model.js";

export const postRouter = Router()

const upload = multer({
    storage,
    onError : function(err, next) {
      console.log('error', err);
      next(err);
    }
  })



postRouter.route('/')
    .get(post.getAllPosts)
    .post(isAuthenticated, upload.array('image[]', 2), catchAsync(post.newPost))

postRouter.route('/:id')
    .get(catchAsync(post.getPost))
    .put(isAuthor, isAuthenticated, upload.array('image[]'),catchAsync(post.editPost))
    .delete(isAuthor, isAuthenticated, catchAsync(post.deletePost))
    
postRouter.post('/:id/like', isAuthenticated, catchAsync(post.likePost))

