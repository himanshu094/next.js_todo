var express = require('express');
var router = express.Router();
const pool=require("./pool");
const upload = require('./multer');

router.post('/task_submit',upload.any(), function(req, res, next) {
  console.log(req.body);
  pool.query("insert into tasktable (task,userid) values(?,?)",[req.body.taskname,req.body.userid],function(error,result){
  if(error)
  {
    console.log("Errorrr",error);
    res.status(200).json({status:false,message:'Database Error'});
  }
  else
  {
      res.status(200).json({status:true,message:'Task Added Successfully'})
  }
  
  })
  });

  router.post('/fetch_all_task',function(req,res){
    pool.query('select * from tasktable where userid=?',[req.body.userid],function(error,result){
        if(error)
        {
          console.log(error)
          res.status(200).json({status:false,message:'Database Error',data:[]})
        }
        else
        {  console.log(result)
            res.status(200).json({status:true,data:result,message:'task Get Successfully'})
        }
    
    }) 
    })

    router.post('/task_edit',upload.any(), function(req, res, next) {
      pool.query("update tasktable set task=? where taskid=?",[ req.body.taskname,req.body.taskid],function(error,result){
      if(error)
      {
          console.log("Errorrr",error);
          res.status(200).json({status:false,message:'Database Error'})
      
      }
      else
      {
          res.status(200).json({status:true,message:'Task Updated Successfully'})
      }
      
      })
      });




        router.post('/task_delete',upload.any(), function(req, res, next) {
          pool.query("delete from tasktable where taskid=?",[req.body.taskid],function(error,result){
          if(error)
          {
              console.log("Errorrr",error);
              res.status(200).json({status:false,message:'Database Error'})
          
          }
          else
          {
              console.log("res......",req.body.taskid);
              res.status(200).json({status:true,message:'Task deleted Successfully'})
          }
          
          })
          });

module.exports = router;