const userService = require('../service/userService');

async function getUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

async function addUser(req, res) {
    try {
        const { userName, password } = req.body;
        const userId = await userService.createUser(userName, password);
        res.status(201).json({ userId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user' });
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

async function getUserByName(req, res) {
    try {
        const userName = req.params.name;
        const user = await userService.getUserByName(userName);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

async function getUserByNameAndPassword(req, res) { 
    try {
        const { userName, userPassword } = req.params;
        const user = await userService.getUserByNameAndPassword(userName, userPassword);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}   

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const { userName, password } = req.body;
        await userService.updateUser(userId, userName, password);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}   




module.exports = {
    getUsers,
    addUser,
    getUserById,
    getUserByName,
    getUserByNameAndPassword,
    updateUser,
    deleteUser
};
