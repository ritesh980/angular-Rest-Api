
module.exports = (app) => {
    const students = require('../controller/student.controller');

    // Create a new studentData
    app.post('/students', students.create);

    // Retrieve all studentData
    app.get('/students', students.findAll);

    // Retrieve a single studentData with studentId
    app.get('/students/:studentId', students.findOne);

    // Update a studentData with studentId
    app.put('/students/:studentId', students.update);

    // Delete a studentData with studentId
    app.delete('/students/:studentId',students.delete);
}