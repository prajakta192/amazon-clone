import { Spinner } from "react-bootstrap";

export default function LoadingBox(){
 return(
   <div style={{textAlign:"center"}}>

       <Spinner animation="border" role="status">
       <span className="visually-hidden">Loading...</span>
     </Spinner>
     </div>
    )
   
}