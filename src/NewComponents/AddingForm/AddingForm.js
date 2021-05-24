import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
function AddingForm({ updating, itemAdded }) {
  const [groceryItem, setGroceryItem] = useState({
    importance: 1,
    name: "",
    amount: 0,
    done: false,
  });
  const updateInput = (e) => {
    setGroceryItem({ ...groceryItem, [e.target.name]: e.target.value });
  };
  const addNewGrocery = (event) => {
    event.preventDefault();
    const jsonGrocery = JSON.stringify(groceryItem);
    const config = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "Token",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post("https://activeitserver.herokuapp.com/additem", jsonGrocery, config)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          updating();
          itemAdded();
        }
      })
      .catch((err) => console.log("Error:", err));
    setGroceryItem({
      importance: 1,
      name: "",
      amount: 0,
      done: false,
    });
  };
  return (
    <Form className="addingForm w-100" onSubmit={addNewGrocery}>
      <Form.Group controlId="formGridState" className="mt-2">
        <Form.Label>Importance</Form.Label>
        <Form.Control
          as="select"
          name="importance"
          defaultValue="1 - Very Much Important"
          onChange={updateInput}
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
          value={groceryItem.name}
          placeholder="Tomato, Garlic, Melon, Apple..."
          onChange={updateInput}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          value={groceryItem.amount}
          placeholder=".. kg"
          onChange={updateInput}
        />
      </Form.Group>
      <Button className="mt-2" variant="success" type="submit">
        Add The New Item
      </Button>
    </Form>
  );
}

export default AddingForm;
