var mongoose=require('mongoose');

var studentSchema=mongoose.Schema({
    FirstName: String,
    LastName: String,
    ContactNumber: {type: String, unique: true},
    EmailID: {type: String, unique: true}
});

module.exports=mongoose.model('students',studentSchema);