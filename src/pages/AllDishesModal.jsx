import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDishesService } from "../services/restaurant.services";
import {
  Button,
  Modal,
  Badge,
  ListGroup,
  Col,
  Row,
  Tab,
} from "react-bootstrap";

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
      let response = await getAllDishesService(restId);
      setList(response.data);
      setIsFetching(false);
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
            <Modal.Title> All Dishes</Modal.Title>
          </Modal.Header>
          <br />
          <CartaModal />
          <Modal.Body>
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
            >
              <Row>
                <Col sm={4}>
                  <ListGroup>
                    <ListGroup.Item action href="#link1">
                      Entrada
                    </ListGroup.Item>
                    <ListGroup.Item action href="#link2">
                      Principal
                    </ListGroup.Item>
                    <ListGroup.Item action href="#link3">
                      Postre
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="#link1">
                      <ListGroup as="ol" numbered>
                        {list.map((eachDish) => {
                          return (
                            <ListGroup.Item
                              as="li"
                              className="d-flex justify-content-between align-items-start"
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">{eachDish.title}</div>
                                {eachDish.description}
                              </div>
                              <Badge bg="primary" pill>
                                $ {eachDish.price}
                              </Badge>
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link2">otro map</Tab.Pane>
                    <Tab.Pane eventKey="#link3">map</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default AllDishesModal;
