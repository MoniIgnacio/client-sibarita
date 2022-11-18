import { useContext, useEffect, useState } from "react";
import { getRestaurantService } from "../services/restaurant.services";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantEdit from "../pages/RestaurantEdit";
import AllDishesModal from "../pages/AllDishesModal";
import ReservaModal from "../components/ReservaModal";
import Carousel from "react-bootstrap/Carousel";
import { AuthContext } from "../context/auth.context";
import RestaurantReservations from "../components/RestaurantReservations";
import { MoonLoader } from "react-spinners";

function RestaurantDetails() {
  const { user, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const { restId } = useParams();

  useEffect(() => {
    getRestaurant();
  }, []);
//gets all the data for a specific restaurant via the ID of itself
  const getRestaurant = async () => {
    try {
      let response = await getRestaurantService(restId);
      setDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
  //A cool spinner when you are waiting for the data to be retrieved
  if (isFetching) {
    return (
      <div className="spinner">
        <MoonLoader color="black" size={95} speedMultiplier={0.4} />
      </div>
    );
  }

  return (
    <div>
      <div id="card">
      {/* Anything better than a nice carousel to show some images? Yes, being able to upload more than one when you have something as cool as this! */}
        <Carousel fade>
          {details.photos.map((eachPhoto, index) => {
            return (
              <Carousel.Item
                key={index}
                style={{ backgroundColor: "lightgrey" }}
              >
                <img
                  // className="d-block w-100"
                  src={eachPhoto}
                  alt="restaurant-img"
                  width={'400px'}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div className="personal">
          <div className="nameHolder">
            <h1>{details.name}</h1>
          </div>
        </div>
        <div className="info">
          <h3>Dirección: {details.location}</h3>
          <h3>Tipo de cocina: {details.cuisinType}</h3>
        </div>
        <div className="followers">
            <h2> Número de teléfono: {details.phoneNumber}</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "20px",
          }}
        >
          {isLoggedIn === true && user.user._id !== details.owner && (
            <ReservaModal />
          )}

          <AllDishesModal restaurantDetails={details} />
          {(isLoggedIn === true && user.user._id === details.owner) && (
            <RestaurantEdit getRestaurant={getRestaurant}/>
          )}
          {isLoggedIn === true && user.user._id === details.owner && (
            <RestaurantReservations parentId={restId} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
