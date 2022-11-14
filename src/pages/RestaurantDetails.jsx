import React from "react";
import { useEffect, useState } from "react";
import { getRestaurantService } from "../services/restaurant.services";
import { Link, useNavigate, useParams } from "react-router-dom";
import RestaurantEdit from "./RestaurantEdit";
import AllDishesModal from "./AllDishesModal";

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
      console.log("Leyendo data", response.data)
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
 

  return (
    <div>
    <img src={details.photos} alt="restphoto" />
      <h1>{details.name}</h1>
      <h3>{details.location}</h3>
      <h5>{details.cuisinType}</h5>
      <h6>{details.phoneNumber}</h6>
      <h6>{details.owner}</h6>
      <RestaurantEdit />
      <AllDishesModal />

    </div>
  );
}

export default RestaurantDetails;
