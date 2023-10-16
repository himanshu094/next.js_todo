var express = require('express');
var router = express.Router();
const pool=require('./pool');

/* GET users listing. */
router.post('/checklogin',function(req,res,next){
  console.log(req.body);
  pool.query('select * from usertable where emailid=? and password=?',[req.body.emailid,req.body.password],function(error,result){
    if(result.error)
    {
      res.status(200).json({status:false,data:[],message:'Server Error....'})
    }
    else
    {
     if(result.length==1)
     { 
       res.status(200).json({status:true,data:result[0],message:'Login Successful....'});
      }
      else
      {
        res.status(200).json({status:false,data:[],message:'Invalid userid/password'});
      }
    }
  })
});

router.post('/submit_user',function(req,res,next){
  console.log(req.body);
  pool.query("insert into usertable (userfirstname, userlastname, emailid, password) values(?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.emailid,req.body.password],function(error,result){
    if(error)
    {
      console.log("Errorrr",error);
      res.status(200).json({status:false,message:'Database Error'});
    }
    else
    {
        res.status(200).json({status:true,message:'Details Submitted Successfully Please Login'})
    }
    
    })
  })

module.exports = router;
