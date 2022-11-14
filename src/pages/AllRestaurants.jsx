import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRestaurantsService } from "../services/restaurant.services";


function AllRestaurants() {
  const navigate = useNavigate();

  const [list, setList] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      let response = await getAllRestaurantsService();
      setList(response.data);
      setIsFetching(false);

      console.log(response.data);
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
      modal de todos los restaurantes con su informacion imagen
      {list.map((eachRestaurant) => {
        return (<div key={eachRestaurant._id}>
        <h2>{eachRestaurant.name}</h2>
        <Link to={`/restaurant/${eachRestaurant._id}`}>Más información</Link>
        </div>)
      })}
    </div>
  );
}

export default AllRestaurants;
