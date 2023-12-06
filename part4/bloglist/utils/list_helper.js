const dummy = (blogs) => {
    return 1
  }

const likes = array => {
    const likesArray = array.map(blog => blog.likes)

    const totalLikes = likesArray.reduce((sum, likes) => sum + likes, 0)

    return array.length === 0 
    ? 0 
    : totalLikes
}

const favorite = array => {
  const filteredArray = array.map(blog => (
    {
      title: blog.title, 
      author: blog.author, 
      likes: blog.likes
    }
  ))

  const favoriteBlog = filteredArray.reduce((mostLikedBlog, currentBlog) => 
  currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog, filteredArray[0])

  return array.length === 0
  ? 0
  : favoriteBlog
  
}

const mostBlogs = array => {
  const blogCount = {}

  array.forEach(blog => {
    if(blogCount[blog.author]){
      blogCount[blog.author]++
    }
    else {
      blogCount[blog.author] = 1
    }
  })

  if (Object.keys(blogCount).length === 0) {
    return 0
  }

  const mostBlogsAuthor = Object.keys(blogCount).reduce((a, b) =>
  blogCount[a] > blogCount[b]? a : b)

  const mostBlogsCount = blogCount[mostBlogsAuthor]

  return {author: mostBlogsAuthor, blogs: mostBlogsCount}
}

const mostLikes = array => {
  const likesByAuthor = {}

  array.forEach(blog => {
    const author = blog.author;
    const likes = blog.likes;

    if (!likesByAuthor[author]) {
      likesByAuthor[author] = likes;
    } else {
      likesByAuthor[author] += likes;
    }
  })

  let mostLikesAuthor = "";
  let maxLikes = 0;

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      mostLikesAuthor = author;
      maxLikes = likesByAuthor[author];
    }
  }

  return array.length === 0 
  ? 0
  : {author: mostLikesAuthor, likes: maxLikes}
}
  
  module.exports = {
    dummy,
    likes,
    favorite,
    mostBlogs,
    mostLikes
  }