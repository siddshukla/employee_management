const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Other'];

// Home page - List all employees
router.get('/', async (req, res) => {
    try {
        const { search, department, sort } = req.query;
        let query = { isActive: true };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } }
            ];
        }

        if (department && department !== 'all') {
            query.department = department;
        }

        const sortOption = {
            name: { name: 1 },
            date: { joinDate: -1 },
            salary: { salary: -1 },
            default: { createdAt: -1 }
        }[sort] || { createdAt: -1 };

        const employees = await Employee.find(query).sort(sortOption);

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
    res.render('add', { departments });
});

// Add new employee
router.post('/add', async (req, res) => {
    try {
        const { name, email, position, salary, department } = req.body;

        const employeeData = {
            name,
            email: email || undefined,
            position: position || undefined,
            salary: salary ? parseFloat(salary) : undefined,
            department: department || undefined
        };

        await Employee.create(employeeData);
        res.redirect('/?success=Employee added successfully');
    } catch (error) {
        console.error('Error adding employee:', error.message);
        res.status(400).render('add', {
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

        const updateData = {
            name,
            email: email || undefined,
            position: position || undefined,
            salary: salary ? parseFloat(salary) : undefined,
            department: department || undefined
        };

        await Employee.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.redirect('/?success=Employee updated successfully');
    } catch (error) {
        console.error('Error updating employee:', error.message);
        const employee = await Employee.findById(req.params.id);
        res.status(400).render('edit', {
            employee,
            departments,
            error: error.message
        });
    }
});

// Delete employee (soft delete)
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
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

module.exports = router;
