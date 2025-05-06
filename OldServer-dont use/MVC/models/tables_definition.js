const passwords = `
CREATE TABLE IF NOT EXISTS passwords (
  user_id INT PRIMARY KEY   AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

const user_info = `
CREATE TABLE IF NOT EXISTS user_info (
  user_id INT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);
`;

const user_todos = `
CREATE TABLE IF NOT EXISTS user_todos (
  user_id INT NOT NULL,
  id INT  NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  complete BOOL NOT NULL,
  PRIMARY KEY(id)
);
`;

const user_posts = `
CREATE TABLE IF NOT EXISTS user_posts (
  user_id INT NOT NULL,
  id INT  NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  body longtext NOT NULL,
  PRIMARY KEY(id)
);
`;

const comments = `
CREATE TABLE IF NOT EXISTS comments (
  post_id INT NOT NULL ,
  id INT  NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  body VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);
`;

const tables = {
    passwords,
    user_info,
    user_todos,
    user_posts,
    comments
};

module.exports = tables;