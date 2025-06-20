const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        sparse: true // Allows multiple null values but unique non-null values
    },
    position: {
        type: String,
        trim: true,
        maxlength: [100, 'Position cannot exceed 100 characters']
    },
    salary: {
        type: Number,
        min: [0, 'Salary cannot be negative']
    },
    department: {
        type: String,
        trim: true,
        enum: ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Other']
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for formatted join date
employeeSchema.virtual('formattedJoinDate').get(function() {
    return this.joinDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Pre-save middleware
employeeSchema.pre('save', function(next) {
    if (this.name) {
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    }
    next();
});

// Instance method
employeeSchema.methods.getFullInfo = function() {
    return `${this.name} - ${this.position || 'No Position'} at ${this.department || 'No Department'}`;
};

// Static method
employeeSchema.statics.findByDepartment = function(department) {
    return this.find({ department, isActive: true });
};

module.exports = mongoose.model('Employee', employeeSchema);