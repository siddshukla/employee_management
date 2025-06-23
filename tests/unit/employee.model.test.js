// tests/unit/employee.model.test.js
const mongoose = require('mongoose');
const Employee = require('../../models/employee');

describe('Employee Model Unit Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test-employee', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should create an employee with required fields', async () => {
    const emp = new Employee({ name: 'john doe' });
    const saved = await emp.save();
    expect(saved.name).toBe('John doe');
    expect(saved.isActive).toBe(true);
    expect(saved.formattedJoinDate).toBeDefined();
  });

  it('should not save without name', async () => {
    const emp = new Employee({});
    let err;
    try {
      await emp.save();
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
    expect(err.errors.name).toBeDefined();
  });

  it('should apply email format validation', async () => {
    const emp = new Employee({ name: 'test', email: 'invalidemail' });
    let err;
    try {
      await emp.save();
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });
});
