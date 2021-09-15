import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import { Alert } from "react-bootstrap";
//! Components
import LoadingPage from "./NewComponents/LoadingPage/LoadingPage";
import AddingForm from "./NewComponents/AddingForm/AddingForm";
import GroceryList from "./NewComponents/ItemList/GroceryItemList";
import UpdateForm from "./NewComponents/UpdatePage/UpdatePage";
import Message from "./NewComponents/UserMessage/UserMessage";
function App() {
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [message, setMessage] = useState(false);
  const [successfullyAdded, setSuccessfullyAdded] = useState(false);
  const [successfullyRemoved, setSuccessfullyRemoved] = useState(false);
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);
  const updateHandler = () => {
    setIsUpdated(!isUpdated);
  };
  const itemAddedMsg = () => {
    setSuccessfullyAdded(true);
    setTimeout(() => {
      setSuccessfullyAdded(false);
    }, 1800);
  };
  const itemDeleteMsg = () => {
    setSuccessfullyRemoved(true);
    setTimeout(() => {
      setSuccessfullyRemoved(false);
    }, 1800);
  };
  const itemUpdateMsg = () => {
    setSuccessfullyUpdated(true);
    setTimeout(() => {
      setSuccessfullyUpdated(false);
    }, 1800);
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage(true);
    }, 2000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 900);
  }, []);
  if (!loading) {
    return (
      <div className="loadingBG">
        <LoadingPage></LoadingPage>
      </div>
    );
  } else {
    return (
      <main className="App">
        {message ? <Message></Message> : null}
        <Switch>
          <Route path="/" exact>
            <div className="headerBox">
              <h1 className="headerText">You Can Add a New Item to List</h1>
              <div style={{ height: "67px" }}>
                {successfullyAdded ? (
                  <div style={{ height: "85px" }}>
                    {["success"].map((variant, idx) => (
                      <Alert key={idx} variant={variant}>
                        New item has been successfully added!
                      </Alert>
                    ))}
                  </div>
                ) : null}
                {successfullyRemoved ? (
                  <div>
                    {["danger"].map((variant, idx) => (
                      <Alert key={idx} variant={variant}>
                        Item has been successfully deleted!
                      </Alert>
                    ))}
                  </div>
                ) : null}
                {successfullyUpdated ? (
                  <div>
                    {["warning"].map((variant, idx) => (
                      <Alert key={idx} variant={variant}>
                        Item has been successfully updated!
                      </Alert>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-4 mx-auto">
                  <AddingForm
                    updating={updateHandler}
                    itemAdded={itemAddedMsg}
                  ></AddingForm>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mx-auto">
                  <GroceryList
                    updating={updateHandler}
                    itemDeleted={itemDeleteMsg}
                  ></GroceryList>
                </div>
              </div>
            </div>
          </Route>
          <Route path="/update/:id">
            <div className="headerBox updateHeaderBox">
              <h1 className="formText">Update Your Item</h1>
            </div>
            <UpdateForm
              updating={updateHandler}
              itemUpdated={itemUpdateMsg}
            ></UpdateForm>
          </Route>
        </Switch>
      </main>
    );
  }
}

export default App;
