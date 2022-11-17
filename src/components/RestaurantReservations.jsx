import { useEffect, useState } from "react";
import { getAllReservasService } from "../services/reserva.services";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Modal, Button } from "react-bootstrap";
import DeleteReserveModal from "./DeleteReserveModal";

function RestaurantReservations() {
  const navigate = useNavigate();
  const { restId } = useParams();
  const [reservations, setReservations] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  console.log("Hola", reservations)
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  useEffect(() => {
    getReservationList();
  }, []);

  const getReservationList = async () => {
    try {
      const response = await getAllReservasService();
      const { data } = response;
      setReservations(data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
  if (isFetching) {
    return <h3>Loading...</h3>;
  }
  return (
    <div>
    {values.map((v, idx) => (
          <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
            Reservas
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
          <Modal.Title> Reservas </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Pax</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((eachReservation) => {
                return (
                  <tr key={eachReservation._id}>
                    <td>{eachReservation.whoReserved.username}</td>
                    <td>{eachReservation.fecha}</td>
                    <td>{eachReservation.hour}</td>
                    <td>{eachReservation.pax}</td>
                    <td>
                      {" "}
                      <DeleteReserveModal
                        reservationId={eachReservation._id}
                        parentReservation={getReservationList}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RestaurantReservations;
