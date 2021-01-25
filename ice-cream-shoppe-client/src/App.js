import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [flavorsData, setFlavorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3030/flavors")
    .then(response => {
      setFlavorsData(response.data)
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      setHasError(true);
    })
  }, []);

  const flavorsElements = flavorsData.map(flavor => (
    <Col key={flavor.name} xs="12" sm="6" md="4" lg="3">
      <img
        className="icecream"
        src={`http://localhost:3030/${flavor.imagePath}`}
        alt={`${flavor.name} flavor`}
        />
    </Col>
  ));

  return (
    <Container className="App">
      <h1>The Ice Cream Shoppe</h1>
      <h2>Today's Flavors</h2>
      <Spinner
        style={{ display: loading ? "block" : "none" }}
        role="progressbar"
        animation="grow"
        aria-hidden={!loading}
        aria-label="Loading"
      />
      <Alert style={{ display: hasError ? "block" : "none" }} variant="danger">
        There was an error contacting the server. Try again later and stay cool!
      </Alert>
      <Row>{flavorsElements}</Row>
    </Container>
  );
}

export default App;
