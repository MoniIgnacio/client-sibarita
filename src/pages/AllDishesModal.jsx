import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDishService } from "../services/dish.services.js";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartaModal from "../components/CartaModal";

function AllDishesModal() {
  const navigate = useNavigate();
  const { restId } = useParams();

  const [list, setList] = useState();
  const [isFetching, setIsFetching] = useState(true);

  // modal states
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  // modal function
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      let response = await getDishService(restId);
      setList(response.data);
      setIsFetching(false);
      console.log(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isFetching) {
    return <h3>Loading... </h3>;
  }

  return (
    <div>
      <>
        {values.map((v, idx) => (
          <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
            All dishes
            {typeof v === "string" && `below ${v.split("-")[0]}`}
          </Button>
        ))}
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Dishes</Modal.Title>
            <CartaModal />
          </Modal.Header>
          <Modal.Body> Todo contenido de los platos </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default AllDishesModal;
