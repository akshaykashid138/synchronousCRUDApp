var express=require('express');
var router=express.Router();

//importing studentSchema Here
var studentSchema=require('../Schema/student.schema');

//Method to render manageStudent page
router.get('/manageStudents',function (req,res) {
    studentSchema.find(function (err,students) {

        if(err)
            res.render('error',{error:{status:500,stack:err},message:err.message});
        else
            res.render("manageStudents/manageStudent",{students:students});

    })


});

//method to render add Student page
router.get('/createStudent',function (req,res) {
    res.render("manageStudents/addStudent");

});

//method to add students to database
router.post('/createStudent',function (req,res) {
    var newStudent=new studentSchema(req.body);
    newStudent.save(function (err) {
        if(err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.redirect("/manageStudents");

    });

});

//method to render editStudent Page

router.get("/editStudent",function (req,res) {
    studentSchema.findOne({_id:req.query._id},function(err,student) {
        if (err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.render("manageStudents/editStudent", {student: student});

    })
});

//method to edit the studnet
router.post("/editStudent",function (req,res) {
    studentSchema.findOneAndUpdate({_id:req.query._id},{$set: req.body},function (err,student) {
        if(err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.redirect("/manageStudents");

    });

});

//method to delete Students from Database
router.get('/deleteStudent',function (req,res) {
    console.log(req.query)
    studentSchema.findOneAndRemove({_id: req.query._id}, function (err) {
        if (err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.redirect('/manageStudents');
    });
});

module.exports=router;