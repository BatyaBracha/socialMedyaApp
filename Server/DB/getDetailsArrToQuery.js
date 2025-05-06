function getDetailsInArr(type, details) {
    switch (type) {
        case "users":
            return [parseInt(details.userID)];
        case "userPassword":
            return [details.userName, details.userPassword];
        case "getAllTodos":
            return [parseInt(details.user_id)];
        case "getTodo":
            return [parseInt(details.user_id), parseInt(details.id)];
        case "deleteTodo":
            return [parseInt(details.user_id), parseInt(details.id)];
        case "addTodo":
            return [details.newTodoDetails.user_id, details.newTodoDetails.title, details.newTodoDetails.complete];
        case "updateTodo":
            return [details.detailsToUpdate.title, details.detailsToUpdate.complete, details.user_id, details.id];
        case "getAllMyPosts":
            return [parseInt(details.userID)];
        case "getAllPosts":
            return [];
        case "deletePost":
            return [parseInt(details.userID), parseInt(details.id)];
        case "deleteCommentsOfPost":
            return [parseInt(details.id)];
        case "addPost":
            return [details.newPostDetails.userId, details.newPostDetails.title, details.newPostDetails.body];
        case "getPost":
            return [parseInt(details.userID), parseInt(details.id)];
        case "updatePost":
            return [details.detailsToUpdate.title, details.detailsToUpdate.body, details.user_id, details.id];
        case "getComments":
            return [parseInt(details.id)];
        case "getComment":
            return [parseInt(details.postId), parseInt(details.commentId)];
        case "addComment":
            return [details.commentDetails.postId, details.commentDetails.name, details.commentDetails.email, details.commentDetails.body];
        case "deleteComment":
            return [parseInt(details.postId), parseInt(details.commentId)];
        case "updateComment":
            return [details.detailsToUpdate.body, details.postId, details.commentId];
        default:
            break;
    }
}

const arrDetailsToQuery = {
    getDetailsInArr
};

module.exports = arrDetailsToQuery;