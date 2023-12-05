const blogRouter = require('express').Router()
const Blog = require('../models/blog')


  //FETCH ALL RESOURCES
blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blog => response.json(blog))
  })

//CREATES NEW RESOURCE
blogRouter.post('/', (request, response, next) => {
    const body = request.body
  
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      upvotes: body.upvotes
    })
  
    blog.save()
      .then((savedBlog) => {
        response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter