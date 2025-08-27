import {Button} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';

function FabButton( props ){
    return(
        <Button variant='primary' className='fab-button' onClick={props.onClick}>
            <i className='bi bi-plus-lg'></i>
        </Button>
    );
}

export default FabButton;
