import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width:"auto",
    height:"97vh",
    background:"#dfe4ea",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  box:{
    width:"50%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:15,
    marginBlock:'40px',
    boxShadow:"0 0 15px #222",
  },
  center:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
});