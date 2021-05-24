import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
function UpdatePage({ updating, itemUpdated }) {
  const history = useHistory();
  const match = useRouteMatch();
  const [updateItem, setUpdateItem] = useState({
    importance: 1,
    name: "",
    amount: 0,
    done: false,
  });
  const updateInputHandler = (e) => {
    setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
  };
  //!  Sending updated Data
  const updateGroceryItem = async (event) => {
    event.preventDefault();
    const jsonUpdateItem = JSON.stringify(updateItem);
    const config = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "Token",
        "Access-Control-Allow-Origin": "*",
      },
    };
    await axios
      .post(
        `https://activeitserver.herokuapp.com/updatepost/${match.params.id}`,
        jsonUpdateItem,
        config
      )
      .then((response) => {
        if (response.data) {
          console.log(response.data);
        }
      })
      .catch((err) => console.log("Error:", err));
    setUpdateItem({
      importance: 1,
      name: "",
      amount: 0,
    });

    history.push("/");
    itemUpdated();
    updating();
  };
  //! Getting item to update
  useEffect(async () => {
    await axios
      .get(`https://activeitserver.herokuapp.com/update/${match.params.id}`)
      .then((response) => {
        console.log("Item to update:", response.data);
        setUpdateItem({
          importance: response.data.importance,
          name: response.data.name,
          amount: response.data.amount,
          done: response.data.done,
        });
      })
      .catch((err) => console.log("Error:", err));
  }, []);
  return (
    <Form className="addingForm" onSubmit={updateGroceryItem}>
      <Form.Group controlId="formGridState" className="mt-2">
        <Form.Label>Importance</Form.Label>
        <Form.Control
          as="select"
          name="importance"
          value={updateItem.importance}
          onChange={updateInputHandler}
        >
          <option value="1">1 - Very Much Important</option>
          <option value="2">2 - Very Important</option>
          <option value="3">3 - Important</option>
          <option value="4">4 - Not Important</option>
          <option value="5">5 - Not Important At All</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={updateItem.name}
          placeholder="Tomato, Garlic, Melon, Apple..."
          onChange={updateInputHandler}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          value={updateItem.amount}
          placeholder=".. kg"
          onChange={updateInputHandler}
        />
      </Form.Group>
      <Button className="mt-2" variant="danger">
        <Link to="/">Cancel</Link>
      </Button>
      <Button className="mt-2" variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdatePage;
