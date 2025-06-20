const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Home page - List all employees
router.get('/', async (req, res) => {
    try {
        const { search, department, sort } = req.query;
        let query = { isActive: true };
        
        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Filter by department
        if (department && department !== 'all') {
            query.department = department;
        }
        
        // Sorting
        let sortOption = {};
        switch (sort) {
            case 'name':
                sortOption = { name: 1 };
                break;
            case 'date':
                sortOption = { joinDate: -1 };
                break;
            case 'salary':
                sortOption = { salary: -1 };
                break;
            default:
                sortOption = { createdAt: -1 };
        }
        
        const employees = await Employee.find(query).sort(sortOption);
        const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Other'];
        
        res.render('index', { 
            employees, 
            departments,
            currentSearch: search || '',
            currentDepartment: department || 'all',
            currentSort: sort || 'default'
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: 'Failed to fetch employees' });
    }
});

// Show add employee form
router.get('/add', (req, res) => {
    const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Other'];
    res.render('add', { departments });
});

// Add new employee
router.post('/add', async (req, res) => {
    try {
        const { name, email, position, salary, department } = req.body;
        
        const employeeData = { name };
        if (email) employeeData.email = email;
        if (position) employeeData.position = position;
        if (salary) employeeData.salary = parseFloat(salary);
        if (department) employeeData.department = department;
        
        await Employee.create(employeeData);
        res.redirect('/?success=Employee added successfully');
    } catch (error) {
        console.error('Error adding employee:', error);
        const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Other'];
        res.render('add', { 
            error: error.message,
            departments,
            formData: req.body 
        });
    }
});

// Show edit employee form
router.get('/edit/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).render('error', { error: 'Employee not found' });
        }
        const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Other'];
        res.render('edit', { employee, departments });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: 'Failed to fetch employee' });
    }
});

// Update employee
router.post('/edit/:id', async (req, res) => {
    try {
        const { name, email, position, salary, department } = req.body;
        
        const updateData = { name };
        if (email) updateData.email = email;
        if (position) updateData.position = position;
        if (salary) updateData.salary = parseFloat(salary);
        if (department) updateData.department = department;
        
        await Employee.findByIdAndUpdate(req.params.id, updateData, { 
            new: true, 
            runValidators: true 
        });
        res.redirect('/?success=Employee updated successfully');
    } catch (error) {
        console.error('Error updating employee:', error);
        const employee = await Employee.findById(req.params.id);
        const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Other'];
        res.render('edit', { 
            employee, 
            departments,
            error: error.message 
        });
    }
});

// Delete employee
router.post('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, { isActive: false });
        res.redirect('/?success=Employee removed successfully');
    } catch (error) {
        console.error(error);
        res.redirect('/?error=Failed to remove employee');
    }
});

// View employee details
router.get('/view/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).render('error', { error: 'Employee not found' });
        }
        res.render('view', { employee });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: 'Failed to fetch employee details' });
    }
});

// API endpoint for AJAX requests
router.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find({ isActive: true });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;