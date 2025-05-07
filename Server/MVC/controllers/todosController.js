const Todo = require('../service/todoService'); // Assuming you have a Todo model defined in services/todoService.j

// Get all todos
const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
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
    const { title, description, completed } = req.body;
    try {
        const newTodo = new Todo({
            title,
            description,
            completed: completed || false,
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
};

// Update a todo by ID
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
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
};