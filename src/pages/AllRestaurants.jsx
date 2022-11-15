import { useEffect, useState } from "react";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
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
      {list.map((eachRestaurant) => {
        return (
          <Row xs={1} md={3} className="g-4">
            <Col>
              <Card>
                <img
                  variant="top"
                  src={eachRestaurant.photos}
                  alt="img-restaurant"
                  width={"100px"}
                />
                <Card.Title>{eachRestaurant.name}</Card.Title>
                <Card.Body>
                  <Card.Text key={eachRestaurant._id}>
                    {eachRestaurant.location}
                  </Card.Text>{" "}
                  <Link to={`/restaurant/${eachRestaurant._id}`}>
                    Más información
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })}
    </div>
  );
}

{
}
export default AllRestaurants;
