# 🏢 Employee Management System

A modern, full-featured employee management web application built with Node.js, Express.js, MongoDB, and EJS templating engine. Features a beautiful glassmorphism UI design with comprehensive CRUD operations, advanced search, filtering capabilities, and robust testing suite.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![Test Coverage](https://img.shields.io/badge/Coverage-90%25-brightgreen?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🌐 Live Demo
**[🚀 View Live Application](https://employee-management-3-iyby.onrender.com)**

## ✨ Features

### 🎯 Core Functionality
- **Complete CRUD Operations** - Create, Read, Update, Delete employees
- **Advanced Search** - Search by name, email, or position with regex matching
- **Smart Filtering** - Filter employees by department
- **Flexible Sorting** - Sort by name, join date, or salary
- **Soft Delete** - Mark employees as inactive instead of permanent deletion
- **Form Validation** - Client and server-side validation with meaningful error messages

### 🎨 User Experience
- **Modern Glassmorphism UI** - Beautiful gradient backgrounds with blur effects
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Interactive Cards** - Hover effects and smooth animations
- **Real-time Feedback** - Success and error notifications
- **Clean Typography** - Inter font family for optimal readability

### 🔧 Technical Features
- **RESTful API Design** - Clean, organized route structure
- **MongoDB Integration** - Efficient data storage with Mongoose ODM
- **Environment Configuration** - Secure configuration management
- **Error Handling** - Comprehensive error handling and user feedback
- **Template Engine** - Server-side rendering with EJS
- **Comprehensive Testing** - Unit, integration, and API tests with Jest

## 🚀 Tech Stack

| Layer        | Technology                                    |
|--------------|-----------------------------------------------|
| **Backend**  | Node.js, Express.js                         |
| **Database** | MongoDB, Mongoose ODM                       |
| **Frontend** | EJS Templating, HTML5, CSS3, JavaScript     |
| **Testing**  | Jest, Supertest, mongodb-memory-server       |
| **Styling**  | Custom CSS with Glassmorphism Design        |
| **Config**   | dotenv for environment variables             |

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/employee-management-system.git
   cd employee-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/employee-management
   # For MongoDB Atlas:
   # MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/employee-management
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
employee-management-system/
├── models/
│   └── employee.js          # Mongoose schema and model
├── routes/
│   └── employee.js          # Route handlers and API endpoints
├── views/
│   ├── index.ejs            # Home page with employee list
│   ├── add.ejs              # Add employee form
│   ├── edit.ejs             # Edit employee form
│   └── view.ejs             # Employee details view
├── tests/
│   ├── unit/
│   │   └── employee.model.test.js      # Unit tests for models
│   ├── integration/
│   │   └── employee.integration.test.js # Integration tests
│   └── api/
│       └── employee.api.test.js         # API endpoint tests
├── public/
│   └── style.css            # Modern glassmorphism styling
├── .env                     # Environment variables
├── package.json            # Dependencies and scripts
├── app.js                  # Main application entry point
└── README.md               # Project documentation
```

## 🛠️ API Endpoints

### Web Routes (EJS Views)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page with employee list |
| GET | `/add` | Add employee form |
| POST | `/add` | Create new employee |
| GET | `/edit/:id` | Edit employee form |
| POST | `/edit/:id` | Update employee |
| POST | `/delete/:id` | Soft delete employee |
| GET | `/view/:id` | View employee details |

### JSON API Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all active employees (JSON) |

## 🧪 Testing Suite

The application includes a comprehensive testing suite with three levels of testing:

### Testing Tools
- ✅ **[Jest](https://jestjs.io/)** — JavaScript testing framework
- ✅ **[Supertest](https://github.com/visionmedia/supertest)** — HTTP assertions for API testing
- ✅ **[mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server)** — In-memory MongoDB for integration tests

### Test Categories
- **Unit Tests** - Test individual components and models
- **Integration Tests** - Test database operations and business logic
- **API Tests** - Test HTTP endpoints and responses

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage report
npm run coverage

# Run tests in watch mode
npm run test:watch

# Run specific test suites
npm test -- --testPathPattern=unit
npm test -- --testPathPattern=integration
npm test -- --testPathPattern=api

# Generate HTML coverage report
npm run coverage:html
```

### Test Coverage
The application maintains high test coverage across all components:

- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 95%+
- **Lines**: 90%+

Coverage reports are generated in the `coverage/` directory and can be viewed in your browser.

### 📊 Test Coverage Report

After running `npm run coverage`, a detailed HTML report will be generated under the `coverage/` folder. Open it in your browser:

```bash
open coverage/lcov-report/index.html
```

### 📸 Test Coverage Screenshot

![Test Coverage Screenshot](https://github.com/shivangisaraf/shivangisaraf/blob/main/dem.jpg)

### ✅ Test Results Summary

| Test Suites | Tests Passed | Status | Coverage |
|-------------|--------------|--------|----------|
| 3 total     | 15+ total    | ✅ All pass | ~90% overall |

**💡 Tip:** Maintain >85% coverage for production-ready systems.

## 📊 Employee Data Model

```javascript
{
  name: String,           // Required, 2-50 characters
  email: String,          // Optional, validated format
  position: String,       // Optional, max 100 characters
  salary: Number,         // Optional, non-negative
  department: String,     // Enum: HR, Engineering, Marketing, etc.
  joinDate: Date,         // Auto-generated timestamp
  isActive: Boolean,      // Soft delete flag
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## 🎨 UI Components

### Employee Card Features
- **Employee Information Display** - Name, email, position, department, salary
- **Department Badges** - Color-coded department indicators
- **Action Buttons** - View, Edit, Delete with consistent styling
- **Hover Effects** - Smooth card elevation and shadow transitions

### Search & Filter System
- **Real-time Search** - Search across multiple fields simultaneously
- **Department Filter** - Dropdown filter with all departments
- **Sort Options** - Multiple sorting criteria with intuitive controls
- **Form Persistence** - Maintains search state across navigation

## 🔧 Configuration

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | 3000 |
| `MONGO_URL` | MongoDB connection string | Required |

### Department Options
The system supports the following departments:
- HR
- Engineering
- Marketing
- Sales
- Finance
- Operations
- Other

## 🎯 Usage Examples

### Adding a New Employee
1. Click "Add Employee" button
2. Fill out the form (only name is required)
3. Select department from dropdown
4. Submit form to create employee

### Searching Employees
- Use the search box to find employees by name, email, or position
- Combine with department filter for more specific results
- Sort results by name, join date, or salary

### Managing Employees
- **View Details**: Click "View" to see complete employee information
- **Edit Information**: Click "Edit" to modify employee data
- **Remove Employee**: Click "Delete" to soft-delete (can be restored)

## 🛡️ Security Features

- **Input Validation** - Server-side validation for all form inputs
- **MongoDB Injection Prevention** - Mongoose provides built-in protection
- **Error Handling** - Secure error messages without sensitive information
- **Data Sanitization** - Automatic trimming and formatting

## 🚀 Deployment

### Heroku Deployment
1. Install Heroku CLI
2. Create Heroku app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set MONGO_URL=your_mongodb_url`
4. Deploy: `git push heroku main`

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Render Deployment
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on each push to main branch

## 🔄 Development Workflow

### 🔧 Test Environment Setup

Create a `.env.test` file for test-specific environment variables:

```env
NODE_ENV=test
MONGO_URL=mongodb://localhost:27017/employee-management-test
PORT=3001
```

### 📝 Writing New Tests

When adding new features, follow this testing checklist:

- [ ] Write unit tests for new models/functions
- [ ] Add integration tests for new routes
- [ ] Include API tests for new endpoints
- [ ] Update test coverage thresholds if needed
- [ ] Document any new testing patterns or utilities

### 🚨 CI/CD Integration

Tests are automatically run on:
- Every pull request
- Before deployment to staging/production
- Nightly builds for regression testing

```yaml
# Example GitHub Actions workflow
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
      - run: npm run coverage
```

### Available Scripts
```bash
# Start development server
npm run dev

# Start production server
npm start

# Run all tests
npm test

# Run tests with coverage
npm run coverage

# Run tests in watch mode
npm run test:watch

# Generate HTML coverage report
npm run coverage:html

# Run linting (if configured)
npm run lint

# Build for production (if applicable)
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Write tests for your changes
4. Ensure all tests pass: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style Guidelines
- Use consistent indentation (2 spaces)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inter Font** - Beautiful typography from Google Fonts
- **Glassmorphism Design** - Modern UI trend implementation
- **MongoDB** - Flexible document database
- **Express.js** - Fast, unopinionated web framework
- **EJS** - Embedded JavaScript templating
- **Jest Community** - Excellent testing framework and ecosystem

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/employee-management-system/issues) page
2. Create a new issue with detailed description
3. Include error messages and screenshots if applicable

---

<div align="center">
  <p>Built with ❤️ using Node.js, Express.js, MongoDB, EJS, and Jest</p>
  <p>
    <a href="#quick-start">Get Started</a> •
    <a href="#api-endpoints">API Docs</a> •
    <a href="#testing-suite">Testing</a> •
    <a href="#contributing">Contribute</a>
  </p>
</div>
