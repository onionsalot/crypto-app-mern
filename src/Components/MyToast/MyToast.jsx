import "./MyToast.css"
import Toast from 'react-bootstrap/Toast'


export default function MyToast({ show, setShow, msg }) {

    return(
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
    )
}