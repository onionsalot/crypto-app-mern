import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function MyModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <form autoComplete="off" onSubmit={props.handleSubmit}>
        <Modal.Body>
            {props.title==="Add Portfolio" ? (
                    <label>
                        Name: 
                        <input          
                            type="text"
                            name="name"
                            value={props.form.name}
                            onChange={props.handleChange}
                            required />
                    </label>
            ) : (
                null
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} type="submit">Add</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </form>
      </Modal>
    )
}