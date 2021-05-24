import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function UserMessage({ showModal }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal centered onHide={handleClose} show={show}>
        <Modal.Header className="d-flex justify-content-center align-items-center">
          <Modal.Title>
            <h2 className="text-center">Murat Can Öncü</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="h4 mb-0">
            Thank you for visiting my page!
            <br /> I wish you having fun!
          </p>
          <br /> Please, click "Close" or somewhere on the screen
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserMessage;
