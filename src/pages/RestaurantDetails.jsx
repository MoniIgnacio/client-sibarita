import React from "react";
import { useEffect, useState } from "react";
import { getRestaurantService } from "../services/restaurant.services";
import { useNavigate, useParams } from "react-router-dom";

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
      <h1>{details.name}</h1>
      <h3>{details.location}</h3>
      <h5>{details.cuisinType}</h5>
      <h6>{details.phoneNumber}</h6>
    </div>
  );
}

export default RestaurantDetails;
