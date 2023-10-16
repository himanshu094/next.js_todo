

export default function Heading({title}){
  return(
    <div style={{fontFamily:"Kanit",
    fontWeight:"bold",
    fontSize:20,
    letterSpacing:1,
    display:"flex",
    justifyContent:'space-between',
    alignItems:"center"}}>
      <div style={{display:'flex',alignItems:'center'}}>
      
      <div>{title}</div></div>
      
    </div>
  )
}