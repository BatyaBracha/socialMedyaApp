const todoService = require('../service/todoService'); // Assuming you have a Todo model defined in services/todoService.j

const getTodosByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const todos = await todoService.getTodosByUserId(userId);
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos by userId:', error);
        res.status(500).json({ message: 'Error fetching todos by userId', error });
    }
};


// Get a single todo by ID
const getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await todoService.getTodoById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todo', error });
    }
};

// Create a new todo
const createTodo = async (req, res) => {
    const { userId, title, complete } = req.body;
    try {
        const newTodoId = await todoService.createTodo(userId, title, complete || false);
        res.status(201).json({ id: newTodoId, userId, title, completed: complete || false });
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
};

// Update a todo by ID
const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, complete } = req.body;

        if (title === undefined || complete === undefined) {
            return res.status(400).json({ message: 'Missing title or complete' });
        }
        await todoService.updateTodo(id, title, complete);
        const updatedTodo = await todoService.getTodoById(id);
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await todoService.deleteTodo(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
};

module.exports = {
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByUserId
};