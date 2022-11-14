import React from "react";
import { useEffect, useState } from "react";
import { getRestaurantService } from "../services/restaurant.services";
import { useNavigate, useParams } from "react-router-dom";


function RestaurantDetails() {
  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const {restId} = useParams()

  useEffect(() => {
    getRestaurant();
  }, []);

  const getRestaurant = async () => {
    try {
      let response = await getRestaurantService(restId);
      setDetails(response.data);
      setIsFetching(false);
      console.log('response dataaaaa',response.data);
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
    <h3>Hola</h3>
       {/* {details.map((eachRestaurant) => {
        return (
          <div key={eachRestaurant._id}>
            <h1>{eachRestaurant.name}</h1>
            <h3>{eachRestaurant.location}</h3>
            <h5>{eachRestaurant.cuisinType}</h5>
            <h6>{eachRestaurant.phoneNumber}</h6>
          </div>
        );
      })}  */}
    </div>
  );
}

export default RestaurantDetails;
