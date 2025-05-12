const todoService = require('../service/todoService'); // Assuming you have a Todo model defined in services/todoService.j

// Get all todos
const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error.stack || error.message || error);
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};
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
    const { userId, title, completed } = req.body;
    try {
        const newTodoId = await todoService.createTodo(userId, title, completed || false);
        res.status(201).json({ id: newTodoId, userId, title, completed: completed || false });
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
};

// Update a todo by ID
const updateTodo = async (req, res) => {
    try {
    const  id  = req.params.id;
    const { title, completed } = req.body;
        await todoService.updateTodo(id, title, completed);
        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
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
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByUserId
};