import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import './MyModal.css';

export default function MyModal(props) {
  function getMsg() {
    if (props.title === "Add Portfolio") {
      return(<label>
        Name:
        <input
          type="text"
          name="name"
          value={props.form.name}
          onChange={props.handleChange}
          placeholder="Portfolio Name"
          required
        />
      </label>)
    } else if (props.title === "Change Default") {
      return(<p>Change default portfolio?</p>)
    } else if (props.title === "Delete Portfolio") {
      return(<p>Remove selected portfolio?</p>)
    }
  } 

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="MyModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
      <form autoComplete="off" onSubmit={props.handleSubmit}>
        <div className="modal-main">
          {getMsg()}
        </div>
        <div className="modal-buttons"> 
          <Button type="submit">
            Confirm
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </form>
        </Modal.Body>
    </Modal>
  );
}
