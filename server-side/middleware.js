import { Post } from "./models/post.model.js";
import { catchAsync } from "./utilities/catchAsync.js";
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // If authenticated, proceed to the next middleware or route handler
    }
    // If not authenticated, send an error response or redirect to login page
    return res.status(401).json({ error: 'Unauthorized, you must be signed in' });
};
  
export const isAuthor = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const foundPost = await Post.findById(id)
    if (foundPost.author.equals(req.user._id)) {
        return next()
    }
    res.status(401).json({ error: 'Unauthorized, you are not the author of the post' });
})
