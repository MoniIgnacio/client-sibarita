import { useEffect, useState } from "react";
import { getRestaurantService } from "../services/restaurant.services";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantEdit from "./RestaurantEdit";
import AllDishesModal from "./AllDishesModal";
import ReservaModal from "../components/ReservaModal";

function RestaurantDetails() {
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
      console.log("Leyendo data", response.data);
      setIsFetching(false);
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
      <div id="card">
            <img src={details.photos} alt="restphoto" width={"300px"} />
        <div className="personal">
          <div className="nameHolder">
            <h1>{details.name}</h1>
          </div>
        </div>
        <div className="info">
          <h3>Location: {details.location}</h3>
          <h3>Ciusin Type: {details.cuisinType}</h3>
        </div>
        <div className="info">
        </div>
        <div className="followers">
          <div>
            <h6> Phone Number: {details.phoneNumber}</h6>
          </div>
          <div>
            {/* <h6> Owner: {details.owner}</h6> */}
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around', paddingTop:'20px', }}>
          <ReservaModal />
          <AllDishesModal />
          <RestaurantEdit /> 
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
