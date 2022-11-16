import React from "react";
import { useEffect, useState } from "react";
import { getUserService } from "../services/user.services";
import { getReservaService } from "../services/reserva.services";
import { useNavigate, useParams } from "react-router-dom";

import Table from "react-bootstrap/Table";
import EditProfileModal from "../components/EditProfileModal";
import DeleteReserveModal from "../components/DeleteReserveModal";
import EditReserveModal from "../components/EditReserveModal";

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
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      <h1>Nombre de usuario: {username}</h1>
      <h4>Número de telefono: {phoneNumber}</h4>
      <h4>Dirección de correo:{email}</h4>
      <EditProfileModal
        parentSetUserDetails={[setPhoneNumber, setUsername, setEmail]}
        parentGetUserDetails={[username, phoneNumber, email]}
      />
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
                  {/* <td>
                    <EditReserveModal
                      parentInfo={[
                        eachReservation.fecha,
                        eachReservation.hour,
                        eachReservation.pax,
                      ]}
                      parentId={eachReservation._id}
                    />{" "}
                  </td> */}
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
