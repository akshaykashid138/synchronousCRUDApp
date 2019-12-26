var express=require('express');
var router=express.Router();

//importing studentSchema Here

//Method to render manageStudent page
router.get('/manageStudents',function (req,res) {
    res.render('manageStudents/managestudent');


});

module.exports=router;