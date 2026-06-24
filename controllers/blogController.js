const Blog = require("../models/Blog");

// GET ALL BLOGS

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1
    });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET SINGLE BLOG

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE BLOG

const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : "",
    });

    res.status(201).json(blog);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE BLOG

const updateBlog = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BLOG

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Blog deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
};