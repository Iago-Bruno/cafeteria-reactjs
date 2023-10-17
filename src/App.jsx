import { useState } from "react";
import { Modal, Button, Form, Container, Row } from "react-bootstrap";

import FoodCard from "./components/foodCard";
import Foods from "./dataSet/foods";

import "./App.css";

let dataStorage = JSON.parse(localStorage.getItem("foods"));

if (dataStorage == null) {
  localStorage.setItem("foods", JSON.stringify(Foods));
  dataStorage = JSON.parse(localStorage.getItem("foods"));
}

function App() {
  const [foodList, setFoodList] = useState(dataStorage);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    image: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.id = dataStorage.length + 1;
    localStorage.setItem("foods", JSON.stringify([...dataStorage, formData]));
    dataStorage = JSON.parse(localStorage.getItem("foods"));
    handleClose();
    setFoodList(dataStorage);
  };

  return (
    <>
      <div className="container">
        <h1 className="mt-5 text-center">Menu</h1>

        <div className="mb-3 text-center">
          <Button
            variant="primary"
            className="btn btn-secondary rounded-circle mr-4 font-weight-bold"
            onClick={handleShow}
            style={{ fontSize: "18px" }}
          >
            +
          </Button>
        </div>

        <Container className="d-flex gap-3">
          <Row>
            {foodList.map((food, index) => {
              return <FoodCard key={index} food={food} index={index} />;
            })}
          </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Comida</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome da comida"
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="URL da imagem"
                  name="image"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                Fechar
              </Button>
              <Button variant="primary" type="submit">
                Confirmar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default App;
