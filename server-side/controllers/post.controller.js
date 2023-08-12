import { Post } from "../models/post.model.js";
import { cloudinary } from "../cloudinary/cloudinary.js";
export const getAllPosts = (req, res) => {
    Post.find({})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
    console.log('data sent')
    console.log(req.user)
}

export const newPost = async (req, res) => {
    const { title, links, body } = req.body
    const { user } = req
    const addedPost = new Post({title, links, body})
    addedPost.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    addedPost.author = user._id
    await addedPost.save()
    console.log(addedPost)
    res.send(addedPost)
}

export const getPost = async (req, res) => {
    const { id } = req.params
    const foundPost = await Post.findById(id).populate('author')
    if (!foundPost) {
        return res.json('post not found')
    }
    res.json(foundPost)
}

export const editPost = async (req, res) => {
    const { id } = req.params
    const { title, links, body} = req.body
    const foundPost = await Post.findByIdAndUpdate(id, { title, links , body})
    if (req.files.length) {
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
        foundPost.images.push(...imgs)
    }
    if (!foundPost) {
        return res.json('post not found')
    }
    // res.json(foundPost)
    console.log(req.files)
    if (req.body.path) {
        for (let deleted of foundPost.images) {
            await cloudinary.uploader.destroy(deleted.filename)
        }
        await foundPost.updateOne({ $pull: { images: { filename: { $in: req.body.path } } } })
    }
    if (!req.files && req.body.path || req.body.path && req.body.path.length >= foundPost.images.length ) {
        return res.send('you must provide a picture')
    }
    await foundPost.save()
    res.send(foundPost)

}

export const deletePost = async (req, res) => {
    const {id} = req.params
    const deletedPost = await Post.findById(id)
    for (let deleted of deletedPost.images) {
        await cloudinary.uploader.destroy(deleted.filename)
    }
    await deletedPost.deleteOne()
    res.send('you successfully deleted the post')
}

