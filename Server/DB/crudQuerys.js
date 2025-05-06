console.log("2");

function createQuery(type) {

    switch (type) {
        case "addTodo":
            return sql = `
            INSERT INTO project.user_todos (user_id,title,complete) 
            VALUES (?, ?, ?);
        
            `;
        case "addPost":
            return sql = `
            INSERT INTO user_posts (user_id,title,body)
            VALUES (?, ?, ?)
            `;
        case "addComment":
            return sql = `
            INSERT INTO comments (post_id,name,email,body)
            VALUES (?, ?, ?, ?)
            `;
        default:
            return;
    }
}

function getAllQuery(type) {
    switch (type) {
        case "getAllTodos":
            return sql = `
            SELECT user_todos.*
            FROM user_todos
            WHERE user_todos.user_id = ?
            `;
        case "getAllMyPosts":
            return sql = `
            SELECT user_posts.*
            FROM user_posts
            WHERE user_posts.user_id = ?
            `;
        case "getAllPosts":
            return sql = `
                SELECT user_posts.*
                FROM user_posts
                `;
        case "getComments":
            return sql = `
            SELECT comments.*
            FROM comments
            WHERE comments.post_id = ?
            `;
        default:
            return;
    }
}

function getQuery(type) {
    switch (type) {
        case "userPassword":
            return sql = `
            SELECT passwords.user_id
            FROM passwords
            WHERE passwords.user_name = ? AND passwords.password=? 
            `;
        case "users":
            return sql = `
            SELECT *
            FROM user_info
            WHERE user_info.user_id = ?  
            `;
        case "getPost":
            return sql = `
            SELECT user_posts.*
            FROM user_posts
            WHERE user_posts.user_id = ? AND user_posts.id=?
            `;
        case "getPostId":
            return sql = `
                SELECT LAST_INSERT_ID() as id;
                `;
        case "getTodoId":
            return sql = `
            SELECT LAST_INSERT_ID() as id;
            `;
        case "getTodo":
            return sql = `
            SELECT user_todos.*
            FROM user_todos
            WHERE user_todos.user_id = ? AND user_todos.id=?
            `;
        case "getComment":
            return sql = `
            SELECT comments.*
            FROM comments
            WHERE comments.post_id = ? AND comments.id=?
            `;
        case "getCommentId":
            return sql = `
                SELECT LAST_INSERT_ID() as id;
                `;

        default:
            return;
    }
}

function updateQuery(type) {
    switch (type) {
        case "updateTodo":
            return sql = `
            UPDATE user_todos
            SET user_todos.title = ?, user_todos.complete = ?
            WHERE user_todos.user_id = ? AND user_todos.id=? 
            `;
        case "updatePost":
            return sql = `
            UPDATE user_posts
            SET user_posts.title = ?, user_posts.body = ?
            WHERE user_posts.user_id = ? AND user_posts.id=? 
            `;
        case "updateComment":
            return sql = `
            UPDATE comments
            SET comments.body = ?
            WHERE comments.post_id = ? AND comments.id=? 
            `;
        default:
            return;
    }
}

function deleteQuery(type) {
    let sql;
    switch (type) {
        case "deleteTodo":
            return sql = `
            DELETE
            FROM user_todos
            WHERE user_todos.user_id = ? AND user_todos.id=?
            `;
        case "deletePost":
            return sql = `
            DELETE 
            FROM user_posts
            WHERE user_posts.user_id = ? AND user_posts.id=?
            `;
        case "deleteCommentsOfPost":
            return sql = `
                DELETE 
                FROM comments
                WHERE comments.post_id = ? 
                `;
        case "deleteComment":
            return sql = `
            DELETE 
            FROM comments
            WHERE comments.post_id = ? AND comments.id=?
            `;
        default:
            return;
    }
}

const crudQuery = {
    createQuery,
    getAllQuery,
    getQuery,
    updateQuery,
    deleteQuery,
};
module.exports = crudQuery;