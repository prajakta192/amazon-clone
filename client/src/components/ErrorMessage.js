import { Alert } from "react-bootstrap"


const ErrorMEssage = (props) =>{
    return (
        <Alert variant={props.variant || 'Info'}>{props.children}</Alert>
    )
}

export default ErrorMEssage;