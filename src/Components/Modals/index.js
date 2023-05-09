import React, { useContext } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "../../Axios";
import { Modal } from "react-bootstrap";
import { MyContext } from "../../Context";

function Modals({ title, description, idMeal }) {
  const [show, setShow] = useState(false);
  const [loading,setLoading]=useState(false);
  const { user, setUser } = useContext(MyContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToFavorites = () => {
    setLoading(true);
    axios
      .post("/add-favorites", { mealId: idMeal })
      .then(({ data }) => {
        setLoading(false);

        setUser(data);
        alert("Meal added to Favorites");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)});
  };

  const handleRemoveFromFavorites = () => {
    setLoading(true);
    axios
      .post("/remove-favorites", { mealId: idMeal })
      .then(({ data }) => {
        setLoading(false);
        setUser(data);
        alert("Meal removed from Favorites");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)});
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Button variant="primary" onClick={handleShow}>
        see more
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {user && (
            <>
              {user.favorites.includes(idMeal) ? (
                <Button
                  variant="danger"
                  onClick={handleRemoveFromFavorites}
                  disabled={loading}
                >
                  Remove from Favorites
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleAddToFavorites}
                  disabled={loading}
                >
                  Add to Favorites
                </Button>
              )}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Modals;
