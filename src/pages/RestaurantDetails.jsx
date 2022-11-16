import { useContext, useEffect, useState } from "react";
import { getRestaurantService } from "../services/restaurant.services";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantEdit from "./RestaurantEdit";
import AllDishesModal from "./AllDishesModal";
import ReservaModal from "../components/ReservaModal";
import Carousel from "react-bootstrap/Carousel";
import { AuthContext } from "../context/auth.context";

function RestaurantDetails() {
  const { user, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const { restId } = useParams();

  useEffect(() => {
    getRestaurant();
  }, []);

  const getRestaurant = async () => {
    try {
      let response = await getRestaurantService(restId);
      setDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <h3>Loading... </h3>;
  }

  return (
    <div>
      <div id="card">
        <Carousel fade>
          {details.photos.map((eachPhoto, index) => {
            return (
              <Carousel.Item key={index}  style={{backgroundColor: 'lightgrey'}}>
                <img  className="d-block w-100" src={eachPhoto}  alt='restaurant-img' />
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
          <h3>Location: {details.location}</h3>
          <h3>Ciusin Type: {details.cuisinType}</h3>
        </div>
        <div className="info"></div>
        <div className="followers">
          <div>
            <h6> Phone Number: {details.phoneNumber}</h6>
          </div>
          <div>{/* <h6> Owner: {details.owner}</h6> */}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "20px",
          }}
        >
          {isLoggedIn === true &&
          <ReservaModal />}

          {details !== undefined && 
          <AllDishesModal restaurantDetails={details}/>}
          
          {isLoggedIn === true && user.user._id === details.owner &&
          <RestaurantEdit />}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
