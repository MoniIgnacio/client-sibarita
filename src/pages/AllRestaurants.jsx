import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
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
    <div style={{padding: '35px'}}>
          <Row xs={1} md={2} className="g-4">
      {list.map((eachRestaurant) => {
        return (
            <Col key={eachRestaurant._id}>
              <Card>
                <img
                  variant="top"
                  src={eachRestaurant.photos[0]}
                  alt="img-restaurant"
                  // width={"600px"}
                />
                <Card.Title>{eachRestaurant.name}</Card.Title>
                <Card.Body>
                  <Card.Text key={eachRestaurant._id}>
                   Ubicacion: {eachRestaurant.location}
                  </Card.Text>{" "}
                  <Link to={`/restaurant/${eachRestaurant._id}`}>
                    Más información
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
