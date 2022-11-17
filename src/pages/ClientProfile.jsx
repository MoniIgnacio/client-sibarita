import { useEffect, useState } from "react";
import { getUserService } from "../services/user.services";
import { getReservaService } from "../services/reserva.services";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

import Table from "react-bootstrap/Table";
import EditProfileModal from "../components/EditProfileModal";
import DeleteReserveModal from "../components/DeleteReserveModal";
import EditReserveModal from "../components/EditReserveModal";
import { MoonLoader } from "react-spinners";

function ClientProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getDataUser();
    getReservationList();
  }, []);

  const getDataUser = async () => {
    try {
      const response = await getUserService(userId);
      const { data } = response;
      setUsername(data.username);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
    } catch (error) {
      navigate("/error");
    }
  };

  const getReservationList = async () => {
    try {
      let response = await getReservaService(userId);
      setReservations(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return (
      <div className="spinner">
        <MoonLoader color="black" size={95} speedMultiplier={0.4} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <Card style={{ width: "100%", paddingTop: "30px" }}>
          <Card.Body>
            <Card.Title>Nombre de usuario: {username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
            <Card.Text>Número de telefono: {phoneNumber}</Card.Text>
            <Card.Link href="#">
              {" "}
              <EditProfileModal
                parentSetUserDetails={[setPhoneNumber, setUsername, setEmail]}
                parentGetUserDetails={[username, phoneNumber, email]}
              />
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
      <div style={{ width: "30vw", marginLeft: "20px" }}>
        <Table striped>
          <thead>
            <tr>
              <th>Restaurante</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Pax</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((eachReservation) => {
              return (
                <tr key={eachReservation._id}>
                  <td>{eachReservation.restaurant.name}</td>
                  <td>{eachReservation.fecha}</td>
                  <td>{eachReservation.hour}</td>
                  <td>{eachReservation.pax}</td>
                  <td>
                    <EditReserveModal
                      parentInfo={[
                        eachReservation.fecha,
                        eachReservation.hour,
                        eachReservation.pax,
                      ]}
                      parentId={eachReservation._id}
                      parentReservation={getReservationList}
                    />{" "}
                  </td>
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
      </div>
    </div>
  );
}

export default ClientProfile;
