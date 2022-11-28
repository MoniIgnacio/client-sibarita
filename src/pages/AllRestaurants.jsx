import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllRestaurantsService } from "../services/restaurant.services";
import { MoonLoader } from "react-spinners";

function AllRestaurants() {
  const navigate = useNavigate();

  const [list, setList] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getList();
  }, []);
//gets all the restaurants that exists on the DB 
  const getList = async () => {
    try {
      let response = await getAllRestaurantsService();
      setList(response.data);
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
//Shows a card for each restaurant showing the photo, name, ad location, plus a button to enter it details
  return (
    <div style={{ padding: "35px"}}>
      <Row xs={1} md={2} className="g-4">
        {list.map((eachRestaurant) => {
          return (
            <Col key={eachRestaurant._id}>
              <Card style={{ borderRadius: "40px", display: 'flex', alignItems: 'center', backgroundColor:'lightgrey', color: 'black'}}>
              <Card.Img variant="top" src={eachRestaurant.photos[0]} 
                  width={"540px"}
                  style={{borderRadius: "40px"}}
                  alt="img-restaurant" />

                <Card.Title>{eachRestaurant.name}</Card.Title>
                <Card.Body>
                  <Card.Text key={eachRestaurant._id}>
                    Ubicacion: {eachRestaurant.location}
                  </Card.Text>{" "}
                  <Link to={`/restaurant/${eachRestaurant._id}`}>
                    <Button>Más información</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default AllRestaurants;
