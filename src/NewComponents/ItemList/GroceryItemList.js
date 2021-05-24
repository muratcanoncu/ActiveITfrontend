import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
function GroceryItemList({ updating, itemDeleted }) {
  const [groceryList, setGroceryList] = useState([]);

  const deleteItem = async (id) => {
    const removeItemId = id;
    await axios
      .post(`https://activeitserver.herokuapp.com/delete/${removeItemId}`, {
        removeItemId,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          updating();
          itemDeleted();
        }
      });
  };
  const updateToDoneItem = async (id) => {
    const doneItemId = id;
    await axios
      .post(`https://activeitserver.herokuapp.com/done/${doneItemId}`, {
        doneItemId,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          updating();
        }
      });
  };
  const updateToNotDoneItem = async (id) => {
    const notDoneItemId = id;
    await axios
      .post(`https://activeitserver.herokuapp.com/notdone/${notDoneItemId}`, {
        notDoneItemId,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          updating();
        }
      });
  };

  useEffect(() => {
    axios
      .get("https://activeitserver.herokuapp.com/showitem")
      .then((response) => {
        const itemListImportance = response.data.sort((a, b) => {
          const itemA = a.importance;
          const itemB = b.importance;
          let comparison = 0;
          if (itemA > itemB) {
            comparison = 1;
          } else if (itemA < itemB) {
            comparison = -1;
          }
          return comparison;
        });
        const itemListByDone = itemListImportance.sort((a, b) => {
          const itemA = a.done;
          const itemB = b.done;
          let comparison = 0;
          if (itemA > itemB) {
            comparison = 1;
          } else if (itemA < itemB) {
            comparison = -1;
          }
          return comparison;
        });
        setGroceryList(itemListByDone);
      })
      .catch((err) => console.log(err));
  }, [updating]);

  return (
    <Table className="w-100" striped bordered hover size="lg" variant="dark">
      <thead>
        <tr>
          <th>Importance</th>
          <th>Name ({groceryList.length} item)</th>
          <th>Amount (kg)</th>
          <th>Done</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {groceryList.map((groceryItem) => {
          // console.log(groceryItem.name, ":", groceryItem.done);
          return (
            <tr key={groceryItem._id}>
              <td>{groceryItem.importance}</td>
              <td>
                <b>{groceryItem.name}</b>
              </td>
              <td>{groceryItem.amount} </td>
              <td>
                {groceryItem.done ? (
                  <button
                    className="btn btn-success"
                    onClick={() => updateToNotDoneItem(groceryItem._id)}
                  >
                    Done
                  </button>
                ) : (
                  <button
                    className="btn btn-light"
                    onClick={() => updateToDoneItem(groceryItem._id)}
                  >
                    Not Done
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(groceryItem._id)}
                >
                  <a>Delete</a>
                </button>
              </td>
              <td>
                <button className="btn btn-warning">
                  <Link to={`/update/${groceryItem._id}`}>Update</Link>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default GroceryItemList;
