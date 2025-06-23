// tests/integration/employee.integration.test.js
jest.setTimeout(30000); // 30s timeout

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
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
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});


describe('Employee DB Integration', () => {
  it('should create and find an employee', async () => {
    await Employee.create({ name: 'alice', department: 'HR' });
    const emp = await Employee.findOne({ name: /alice/i });
    expect(emp.department).toBe('HR');
  });

  it('should update employee info', async () => {
    const emp = await Employee.create({ name: 'bob', salary: 40000 });
    emp.salary = 50000;
    await emp.save();
    const updated = await Employee.findById(emp._id);
    expect(updated.salary).toBe(50000);
  });

  it('should soft delete an employee', async () => {
    const emp = await Employee.create({ name: 'charlie' });
    await Employee.findByIdAndUpdate(emp._id, { isActive: false });
    const inactive = await Employee.findOne({ _id: emp._id });
    expect(inactive.isActive).toBe(false);
  });
});
