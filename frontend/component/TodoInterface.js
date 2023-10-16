"use client";
import { useEffect, useState } from "react";
import { postData } from "./FetchNodeServices";
import { Avatar, Grid, TextField, Button, AppBar, Toolbar, Typography } from "@mui/material";
import { useStyles } from "./TodoInterfaceCss";
import Swal from 'sweetalert2';
import UploadFile from '@mui/icons-material/UploadFile';
import Heading from "./Heading";
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link'
import { useRouter as useNavigate } from 'next/navigation'

export default function CategoryInterface() {
  const classes = useStyles();
  const navigate=useNavigate()
  const admin = JSON.parse(localStorage.getItem("TODOUSER"));
  
  ///? useStates///////////////////////////
  const [restaurantId, setRestaurantId] = useState("");
  const [taskName, setTaskName] = useState("");

  useEffect(function () {
    setRestaurantId(admin.restaurantid);
  }, []);

  ///? formData///////////////////////////
  const handleSubmit = async () => {
    if (true) {
      var formData = new FormData();
     // formData.append("restaurantid", restaurantId);
      formData.append("taskname", taskName);
      formData.append("userid", admin.userid)

      var result = await postData("task/task_submit", formData);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Task Registration",
          text: result.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
        });
      }
    }
  };

  const handlelogout=() => {
    
    localStorage.clear();
    navigate.push("/login");
  };

  return (
    <div >

      <div >
        <Grid container spacing={2}>
          <AppBar position="sticky"> 
              <Toolbar variant="dense"> 
                <Typography variant="h6" color="inherit" component="div" >
                  <div style={{display:"flex",flexDirection:"row",justifyContent:'space-evenly',alignItems:"center"}}>
                    <div>Hello   
                    {" "+admin.userfirstname+" "+admin.userlastname}
                    </div>

                      <div> 
                      <Button variant="text"  color="secondary" onClick={handlelogout} >
                      Logout
                      </Button>
                      </div>
                  </div>
                </Typography>
              </Toolbar>
            </AppBar>
        </Grid>
      </div>      

    <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
            
              <Heading title={"Register Task"}
            
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField value={admin.restaurantid} disabled fullWidth />
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                onChange={(event) => setTaskName(event.target.value)}
                label="Enter Task"
                fullWidth
              />
            </Grid>

            

            <Grid item xs={6}>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" fullWidth onClick={()=>navigate.push('/displayalltodo')} >
                Display All todo
              </Button>
            </Grid>
            
          </Grid>
        </div>
      </div>
    </div>
  );
}
