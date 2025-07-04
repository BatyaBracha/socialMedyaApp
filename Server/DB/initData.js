const mysql = require('mysql2/promise');

(async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'BatyaOren20',
        database: 'project',
        port: '3306'
    });

    try {
        // Insert data into the `passwords` table
        for (let i = 1; i <= 5; i++) {
            const userName = `user${i}`;
            const password = `password${i}`;
            await connection.execute(
                `INSERT INTO passwords (user_name, password) VALUES (?, ?)`,
                [userName, password]
            );
            console.log(`Inserted into passwords: ${userName}`);
        }

        // Insert data into the `user_info` table
        for (let i = 1; i <= 5; i++) {
            const userInfo = [
                i, // user_id
                `user${i}`, // user_name
                `Name ${i}`, // name
                `user${i}@example.com`, // email
                `phone${i}`
            ];
            await connection.execute(
                `INSERT INTO user_info (user_id, user_name, name, email, phone) VALUES (?, ?, ?, ?, ?)`,
                userInfo
            );
            console.log(`Inserted into user_info: user${i}`);
        }

        // Insert data into the `user_todos` table
        for (let i = 1; i <= 10; i++) {
            const todo = [
                Math.ceil(i / 2), // user_id
                `Todo Title ${i}`, // title
                i % 2 === 0 // complete
            ];
            await connection.execute(
                `INSERT INTO user_todos (user_id, title, complete) VALUES (?, ?, ?)`,
                todo
            );
            console.log(`Inserted into user_todos: Todo ${i}`);
        }

        // Insert data into the `user_posts` table
        for (let i = 1; i <= 10; i++) {
            const post = [
                Math.ceil(i / 2), // user_id
                `Post Title ${i}`, // title
                `This is the body of post ${i}.` // body
            ];
            await connection.execute(
                `INSERT INTO user_posts (user_id, title, body) VALUES (?, ?, ?)`,
                post
            );
            console.log(`Inserted into user_posts: Post ${i}`);
        }

        // Insert data into the `comments` table
        for (let i = 1; i <= 15; i++) {
            const comment = [
                Math.ceil(i / 3), // post_id
                `Commenter ${i}`, // name
                `commenter${i}@example.com`, // email
                `This is comment ${i}.` // body
            ];
            await connection.execute(
                `INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)`,
                comment
            );
            console.log(`Inserted into comments: Comment ${i}`);
        }
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        await connection.end();
    }
})();