import { Post } from '../models/post.model.js';
import { cloudinary } from '../cloudinary/cloudinary.js';
export const getAllPosts = (req, res) => {
  Post.find({})
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json('Error: ' + err));
  console.log('data sent');
  console.log(req.user);
};

export const newPost = async (req, res) => {
  const { title, links, body } = req.body;
  const { user } = req;
  const addedPost = new Post({ title, links, body });
  addedPost.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  addedPost.author = user._id;
  await addedPost.save();
  console.log(addedPost);
  res.status(201).json({
    message: 'you added a post',
    post: addedPost,
  });
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const foundPost = await Post.findById(id).populate('author');
  if (!foundPost) {
    return res.status(404).json('post not found');
  }
  res.status(200).json(foundPost);
};

export const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, links, body } = req.body;
  const foundPost = await Post.findByIdAndUpdate(id, { title, links, body });

  if (!foundPost) {
    return res.status(404).json({ error: 'Post not found' });
  }

  console.log(req.files);

  if (
    !req.files &&
    (!req.body.path || req.body.path.length >= foundPost.images.length)
  ) {
    return res
      .status(400)
      .json({ error: 'You must provide at least one image' });
  }

  if (req.files && req.files.length) {
    const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    foundPost.images.push(...imgs);
  }

  if (req.body.path) {
    for (let deleted of foundPost.images) {
      if (req.body.path.includes(deleted.filename)) {
        await cloudinary.uploader.destroy(deleted.filename);
      }
    }
    foundPost.images = foundPost.images.filter(
      (img) => !req.body.path.includes(img.filename)
    );
  }

  await foundPost.save();
  res
    .status(200)
    .json({ message: 'Post updated successfully', post: foundPost });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findById(id);
  for (let deleted of deletedPost.images) {
    await cloudinary.uploader.destroy(deleted.filename);
  }
  await deletedPost.deleteOne();
  res.status(200).json('you successfully deleted the post');
};

export const likePost = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const post = await Post.findById(id).populate('author');
  if (!post) return res.status(404).json('post not found');
  if (post.likes.includes(user._id)) {
    const post = await Post.findById(id).populate('author');
    post.likes = post.likes.filter(
      (userId) => userId.toString() !== user._id.toString()
    );
    await post.save();
    return res.status(201).json({
      message: 'you unliked the post',
      post,
    });
  }
  post.likes.push(user._id);
  await post.save();
  res.status(201).json({
    message: 'you liked the post',
    post: post,
  });
};
