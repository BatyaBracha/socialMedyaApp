const express=require('express');
const cors = require('cors');

const usersRouter = require('./MVC/routes/users');
const todosRouter = require('./MVC/routes/todos');
const postsRouter = require('./MVC/routes/posts');
const commentsRouter = require('./MVC/routes/comments');

const PORT=3000;

const server=express();

const db = require('./MVC/models/connection');

db.query('SELECT 1')
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.error('Database connection failed:', err));

server.use(cors());

server.use(express.json());

server.use('/users', (req, res, next) => {
    console.log('Request to /users');
    next();
}, usersRouter);

server.use('/posts', (req, res, next) => {
    console.log('Request to /posts');
    next();
}, postsRouter);

server.use('/todos', (req, res, next) => {
    console.log('Request to /todos');
    next();
}, todosRouter);

server.use('/comments', (req, res, next) => {
    console.log('Request to /comments');
    next();
}, commentsRouter);

server.get('/', (req, res) => {
    res.send('השרת עובד! ברוכים הבאים ל-API שלי 🚀');
});

server.listen(PORT, () => {
    console.log(`Listening to requests at http://localhost:${PORT}`);
});

db.query('SELECT 1')
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.error('Database connection failed:', err));

