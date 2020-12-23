const Student = require('../model/model.student');
const student = require('../router/student');

// Create and Save a new studentData
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    // Create a studentData
    const student = new Student({
        name: req.body.name, 
        mobile: req.body.mobile,
        description:req.body.description
    });

    // Save studentData in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the studentData."
        });
    });
};
exports.findAll = (req, res) => {
    Student.find()
    .then(student => {
        res.send(student);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving studentData."
        });
    });
};
// Find a single note with a noteId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: " not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "studentData not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving studentData with id " + req.params.studentId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: " can not be empty"
        });
    }

    // Find note and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        name: req.body.name , 
        mobile: req.body.mobile,
        description:req.body.description
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "studentData not found with id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "studentData not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: `Error updating studentData with id ${req.params.studentId}`
        });
    });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.studentId
        });
    });
};