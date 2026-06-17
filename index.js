import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//REQUETS HANDLERS:
app.get('/', (req, res) => {
  const isClicked = req.query.create === 'true';
  res.render('index.ejs', { isClicked, posts });
});
app.post('/submit', (req, res) => {
  const { title, content, author } = req.body;
  const newPost = { id: Date.now().toString(), title, content, author, createdAt: new Date() };
  posts.push(newPost);
  console.log(`New blog post created: Title - ${title}, Content - ${content}, Author - ${author}`);
  res.redirect('/');
});

// Delete a post
app.post('/posts/:id/delete', (req, res) => {
  const { id } = req.params;
  const idx = posts.findIndex(p => p.id === id);
  if (idx !== -1) posts.splice(idx, 1);
  res.redirect('/');
});

// Show update form for a post
app.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  if (!post) return res.redirect('/');
  res.render('update.ejs', { post });
});

// Handle update submission
app.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const post = posts.find(p => p.id === id);
  if (post) {
    post.title = title;
    post.content = content;
    post.author = author;
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//List of posts:
const posts = [];