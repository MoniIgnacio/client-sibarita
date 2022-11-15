import { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
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
        return (
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col>
                <Card>
                  <Card.Img variant="top" src={eachRestaurant.photos} />
                  <Card.Title>{eachRestaurant.name}</Card.Title>
                  <Card.Body>
                    <Card.Text key={eachRestaurant._id}>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">
                      {" "}
                      <Link to={`/restaurant/${eachRestaurant._id}`}>
                        Más información
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        );
      })}
    </div>
  );
}

export default AllRestaurants;
