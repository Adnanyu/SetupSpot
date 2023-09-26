import { User } from '../models/user.model.js';
import { Post } from '../models/post.model.js';
import passport from 'passport';

export const getUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(500).send('Internal Server Error');
  }
  console.log('user is', req.user);
  return res.send(req.user);
};

export const registerUser = async (req, res) => {
  try {
    const { name, lastname, username, password } = req.body;
    const user = new User({ name, lastname, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      console.log(user);
    });
    await user.save();
    console.log('data before registeration', req.body);
    console.log('data after registeration', registeredUser);
    const sanitizedUser = {
      _id: registeredUser._id,
      username: registeredUser.username,
      name: registeredUser.name,
      lastname: registeredUser.lastname,
      createdAt: registeredUser.createdAt,
      updatedAt: registeredUser.updatedAt,
      favorites: registeredUser.favorites,
    };
    return res.status(201).json({
      message: 'Successfully registered',
      user: sanitizedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(409).json(e);
  }
};

export const loginUser = async (req, res, next) => {
  await passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    } else if (!user) {
      res.status(401).send('username or passsword is incorrect');
    } else {
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          next(err);
          return res.status(500).send('Internal Server Error');
        }
        const sanitizedUser = {
          _id: user._id,
          username: user.username,
          name: user.name,
          lastname: user.lastname,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          favorites: user.favorites,
        };
        return res.status(201).json({
          message: 'Successfully Authenticated',
          user: sanitizedUser,
        });
      });
    }
  })(req, res, next);
};

export const logoutUser = async (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json('succesfully logged out');
  });
};

export const addTOfavorites = async (req, res) => {
  const { user } = req;
  const { id } = req.body;
  const post = await Post.findById(id);
  const currentUser = await User.findById(user._id);
  if (currentUser.favorites.includes(post._id)) {
    const foundUser = await User.findById(user._id);
    foundUser.favorites = foundUser.favorites.filter(
      (postId) => postId.toString() !== post._id.toString()
    );
    await foundUser.save();
    return res.status(201).json({
      message: 'You removed the post to favorites',
      user: foundUser,
    });
  }
  currentUser.favorites.push(post._id);
  await currentUser.save();
  res.status(201).json({
    message: 'You added the post to favorites',
    user: currentUser,
  });
};

export const getUserPosts = async(req, res) => {
  const { id } = req.params
  const posts = await Post.find({ author: id }).populate('author')
  if (posts) {
      console.log(posts)
      return res.status(200).json(posts)
  }
  res.status(404).json({ error: 'User not found' });
}