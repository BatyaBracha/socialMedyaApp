const express=require('express');
const cors = require('cors');
const usersRouter = require('./Routers/users');
const todosRouter = require('./Routers/todos');
const postsRouter = require('./Routers/posts');
const commentsRouter = require('./Routers/comments');

const PORT=3000;

const server=express();

// server.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
//     credentials: true
// }));

server.use(cors());

server.use(express.json());

server.use('/users', usersRouter);
server.use('/posts', postsRouter);
server.use('/todos', todosRouter);
server.use('/comments', commentsRouter);

server.get('/', (req, res) => {
    res.send('השרת עובד! ברוכים הבאים ל-API שלי 🚀');
  });
  
server.listen(PORT, () => {
    console.log(`Listening to requests at http://localhost:${PORT}`);
});

// const PORT = process.env.PORT || 3000; // או כל פורט אחר שתבחרי

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

