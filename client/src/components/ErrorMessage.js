import { Alert } from "react-bootstrap"


export default function ErrorMessage(props){
    console.log(props.variant)
    return(
        <Alert variant={props.variant || 'Info'}>
         {props.children}
        </Alert>
    )
}