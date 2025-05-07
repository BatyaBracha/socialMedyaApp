const db = require('./MVC/models/connection');

(async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM comments');
        console.log('Rows:', rows);
    } catch (err) {
        console.error('Query failed:', err);
    }
})();
