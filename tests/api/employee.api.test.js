// tests/api/employee.api.test.js
jest.setTimeout(30000); // Allow more time

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../app'); // use app.js, not server.js
const Employee = require('../../models/employee');


let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({
    binary: {
      version: '6.0.6', // ✅ tested working version
      arch: 'arm64'     // ✅ force correct CPU architecture
    }
  });

  await mongoose.connect(mongo.getUri(), {
    useNewUrlParser: true, // optional now
    useUnifiedTopology: true // optional now
  });
});


afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  if (mongo) {
    await mongo.stop();
  }
});


afterEach(async () => {
  await Employee.deleteMany();
});

describe('Employee API Tests', () => {
  it('should add a new employee via POST /add', async () => {
    const res = await request(app)
      .post('/add')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        position: 'Engineer',
        department: 'Engineering',
        salary: 60000
      });
    
    expect(res.statusCode).toBe(302); // redirect after success
    const employee = await Employee.findOne({ email: 'jane@example.com' });
    expect(employee).not.toBeNull();
    expect(employee.name).toBe('Jane doe');
  });

  it('should return employees from GET /api/employees', async () => {
    await Employee.create({ name: 'John', isActive: true });
    const res = await request(app).get('/api/employees');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('should soft delete an employee via POST /delete/:id', async () => {
    const emp = await Employee.create({ name: 'Soft Delete' });
    const res = await request(app).post(`/delete/${emp._id}`);
    expect(res.statusCode).toBe(302);
    const updated = await Employee.findById(emp._id);
    expect(updated.isActive).toBe(false);
  });
});
