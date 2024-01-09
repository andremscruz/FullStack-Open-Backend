const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')


//FETCH ALL RESOURCES
blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blog => response.json(blog))
  })

//CREATES NEW RESOURCE
blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)
  
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      upvotes: body.upvotes,
      user: user.id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    .catch(error => next(error))
})

//DELETES IDENTIFIED RESOURCE
blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//UPDATE IDENTIFIED RESOURCE
blogRouter.put('/:id', async (request, response, next) => {
  const { author, title, url, upvotes } = request.body

  await Blog.findByIdAndUpdate(
    request.params.id, 
    { author, title, url, upvotes },
    { new: true, runValidators: true, context: 'query' }
  ) 
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter