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
        const userId = await userService.createUserInPasswordsTable(userName, password);
        const user = await userService.createUser(userId, userName, "", "", "");
        res.status(201).json({ userId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user' });
    }
}

async function login(req, res) {
    try {
        const { userName, password } = req.body;

        const userInPasswords = await userService.getUserByNameAndPassword(userName, password);
        if (!userInPasswords) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userInfo = await userService.getUserByName(userName);
        if (!userInfo) {
            return res.status(404).json({ error: 'User not found in info table' });
        }

        res.json(userInfo);
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.params.userId;
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
        const userName = req.params.userName;
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
        const userId = req.params.userId;
        const { name, email, phone, password } = req.body;
        if (password) {
            await userService.updateUserPassword(password, userId);
        }
        if(name || email || phone) {
            await userService.updateUserDetails(userId, name, email, phone);
        }
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
    deleteUser,
    login
};
