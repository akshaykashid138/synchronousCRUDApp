var express=require("express");

var router=express.Router();

//User Schema imported here
const userSchema=require('../schema/user.schema');

router.get('/manageUsers',function (req,res) {
    userSchema.find(function (err,users) {

        if(err)
            res.render('error',{error:{atatus:500,stack:err},message:err.message});
        else
            res.render("manageUsers/manageUser",{users:users});

    })

});

//Method to render addUSer page
router.get('/createUser',function (req,res) {
    res.render("manageUsers/addUser");

});

//Method to save user details
router.post('/createUser',function (req,res) {
    var newUser=new userSchema(req.body);
    newUser.save(function (err) {
        if(err)
            res.render('error',{error:{atatus:500,stack:err},message:err.message});
        else
            res.redirect("/manageUsers");

        
    })

});

//update user details
router.get("/editUser",function (req,res) {
    userSchema.findOne({_id:req.query._id},function(err,user){
    if(err)
        res.render('error',{error:{atatus:500,stack:err},message:err.message});
    else
        res.render("manageUsers/editUser",{user:user});
    });

});

//method to update the data
router.post("/editUser",function (req,res) {
    userSchema.findOneAndUpdate({_id:req.body._id},{$set: req.body},function (err) {
        if(err)
                 res.render('error',{error:{atatus:500,stack:err},message:err.message});

    else
            res.redirect('/manageUsers');

    });
    
});

//method to delete data
router.get('/deleteUser',function (req,res) {
   console.log(req.query)
    userSchema.findOneAndRemove({_id: req.query._id}, function (err) {
        if (err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.redirect('/manageUsers');
    });
});


module.exports=router;