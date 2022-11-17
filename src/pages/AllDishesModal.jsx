import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../context/auth.context";

import CartaModal from "../components/CartaModal";
import DeleteDishModal from "../components/DeleteDishModal";
import { MoonLoader } from "react-spinners";

function AllDishesModal(restaurantDetails) {
  const { isLoggedIn, user } = useContext(AuthContext);
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
//gets all the dishes from a restaurant passing the id of the restaurant to the service and changes the fetching state to false so the spinner does not show up 
  const getList = async () => {
    try {
      let response = await getAllDishesService(restId);
      setList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //A cool spinner when you are waiting for the data to be retrieved
  if (isFetching === true) {
    return (
      <div className="spinner">
        <MoonLoader color="black" size={95} speedMultiplier={0.4} />
      </div>
    );
  }

  let entradaDish = [];
  let principalDish = [];
  let postreDish = [];
//goes through the array of dishes and makes sure each one is pushed to its corresponding category
  list.map((eachDishCategory) => {
    if (eachDishCategory.category === "principal") {
      principalDish.push(eachDishCategory);
    } else if (eachDishCategory.category === "postre") {
      postreDish.push(eachDishCategory);
    } else {
      entradaDish.push(eachDishCategory);
    }
  });
//shows the list for all the dishes in that restaurant, and if you the owner of said restaurant shows a button to be able to create or delete dishes
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
          style={{ padding: "30px 0 30px 0" }}
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title> All Dishes</Modal.Title>
          </Modal.Header>
          <div style={{ padding: "20px" }}>
            {isLoggedIn === true &&
            user.user._id === restaurantDetails.restaurantDetails.owner ? (
              <CartaModal actualizarPage={getList} />
            ) : null}
          </div>
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
                        {entradaDish.map((eachEntrada) => {
                          return (
                            <ListGroup.Item
                              key={eachEntrada._id}
                              as="li"
                              className="d-flex justify-content-between align-items-start"
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                  {eachEntrada.title}
                                </div>
                                {eachEntrada.description}
                              </div>
                              <Badge bg="primary" pill>
                                $ {eachEntrada.price}
                              </Badge>
                              <DeleteDishModal
                                parentGetList={getList}
                                parentListId={eachEntrada._id}
                              />
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link2">
                      <ListGroup as="ol" numbered>
                        {principalDish.map((eachPrincipal) => {
                          return (
                            <ListGroup.Item
                              key={eachPrincipal._id}
                              as="li"
                              className="d-flex justify-content-between align-items-start"
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                  {eachPrincipal.title}
                                </div>
                                {eachPrincipal.description}
                              </div>
                              <Badge bg="primary" pill>
                                $ {eachPrincipal.price}
                              </Badge>
                              <DeleteDishModal
                                parentGetList={getList}
                                parentListId={eachPrincipal._id}
                              />
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link3">
                      <ListGroup as="ol" numbered>
                        {postreDish.map((eachPostre) => {
                          return (
                            <ListGroup.Item
                              key={eachPostre._id}
                              as="li"
                              className="d-flex justify-content-between align-items-start"
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                  {eachPostre.title}
                                </div>
                                {eachPostre.description}
                              </div>
                              <Badge bg="primary" pill>
                                $ {eachPostre.price}
                              </Badge>
                              <DeleteDishModal
                                parentGetList={getList}
                                parentListId={eachPostre._id}
                              />
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Tab.Pane>
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
