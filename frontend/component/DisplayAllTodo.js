"use client";
import { useStyles } from "./DisolayAllTodoCss";
import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import { serverURL,getData,postData } from "./FetchNodeServices";
import { Avatar,Grid,TextField,Button ,Dialog,DialogActions,DialogContent,FormControl,} from "@mui/material";
import Heading from "./heading";
import UploadFile from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";
import { useRouter as useNavigate } from 'next/navigation'
//import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory()
{  const classes = useStyles();
  const admin = JSON.parse(localStorage.getItem("TODOUSER"));
//   const admin=JSON.parse(localStorage.getItem('ADMIN'));
   const navigate = useNavigate();

  const [taskList,setTaskList]=useState([]);
  const [open,setOpen]=useState(false)

  const [taskName,setTaskName]=useState();
  const [icon,setIcon]=useState({url:'',bytes:''});
  const [taskId,setTaskId]=useState("");
  
  ///? formData///////////////////////////
  const handleSubmit=async()=>
  {
    if(true){

    const body={'taskid':taskId,
              'taskname':taskName,   
    }
    
    var result=await postData('task/task_edit',body);
    if(result.status)
    {
      Swal.fire({
        icon: 'success',
        title: 'Edit Task',
        text: result.message,
        position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true
        
      })
      
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message,
        position:'top-end',
            timer:5000,
            showConfirmButton:false,
            toast:true

      })
      
    }
    }
  }

  const fetchAllTask=async()=>{
   var result=await postData('task/fetch_all_task',{"userid":admin.userid})
   setTaskList(result.data)

  };

  const handleEdit=(rowData)=>{
    setTaskName(rowData.task);
    setTaskId(rowData.taskid);

    setOpen(true); 
  }

  const handleDialogClose=()=>{
    setOpen(false);
    fetchAllTask()
   }

  const showDataInDialog=()=>{
    return(<div  >
      <div >
  
      <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <EditIcon/>
            <Heading title={"Edit Task"}/>
          </Grid>
  
          {/* <Grid item xs={12}>
            <TextField onChange={(event)=>setRestaurantId(event.target.value)} 
            onFocus={()=>handleError(false,'restaurantId','')}
            error={categoryError?.restaurantId?.error}
            helperText={categoryError?.restaurantId?.message} 
            value={restaurantId}
            label="Restaurant Id" fullWidth/>
          </Grid> */}
  
          <Grid item xs={12}>
            <TextField onChange={(event)=>setTaskName(event.target.value)} 
            value={taskName}
            label="Task Name" fullWidth/>
          </Grid>    
  
      </Grid>
      </div>
  </div>)
  }

  const showDialogForEdit=()=>{
    return(
     <Dialog
     maxWidth={'sm'}
       open={open}>
         <DialogContent  >
             {showDataInDialog()}
         </DialogContent>
        <DialogActions>
        <Button onClick={handleSubmit}>Update</Button>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
     </Dialog>
    )}

  useEffect(function(){
      fetchAllTask()
  },[]);

  const handleDelete=async(rowData)=>{
    Swal.fire({
      title: 'Do you want to delete the record?',
      showDenyButton: true,
     
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const body={'taskid':rowData.taskid}; 
        const result=await postData('task/task_delete',body)
         if(result.status)      
        {Swal.fire('Deleted!', '', result.message)
        fetchAllTask()
         }
         else
         Swal.fire('Fail!', '', result.message)

      } else if (result.isDenied) {
        Swal.fire('Task not Deleted', '', 'info')
      }
    })
  }

  function displayAll() {
    return (
      <MaterialTable
        title="Task List"
        columns={[
          { title: 'Task Id', field: 'taskid' },
          { title: 'Task Name', field: 'task' },
        ]}
        data={taskList}        
        actions={[
          {
            icon: '+',
            tooltip: 'Edit Task',
            onClick: (event, rowData) => handleEdit(rowData)
          },
          {
            icon: '-',
            tooltip: 'Delete Task',
            onClick: (event, rowData) => handleDelete(rowData)
          },
          {
            icon: '+',
            tooltip: 'Add New Todo',
            isFreeAction: true,
            onClick: (event, rowData) => navigate.push("/todointerface")
          ,}
        ]}
        options={{
          paging:true,
          pageSize:3,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions:[3,5,7],    // rows selection options
        }}  
      />
    )
  }

   return(
    <div className={classes.rootDisplay}>
      <div className={classes.boxDisplay}>
          
      {displayAll()}
    </div>
      {showDialogForEdit()}
    </div>
   )
}   