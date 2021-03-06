import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail } from "../../store/actions/user";

function ChangeEmailModal({ value, isLink }) {
  const dispatch = useDispatch();
  const { currentUser, error, isError } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleClose = () => {
    setShow(false);
    setForm({ ...form, email: "", password: "" });
  };
  const handleShow = () => {
    setShow(true);
    setForm({ ...form, email: "", password: "" });
  };
  const change = () => {
    dispatch(changeEmail(currentUser.user._id, form.email, form.password));
    setForm({ ...form, email: "", password: "" });
  };

  return (
    <>
      <div className={!isLink ? "btn bord" : ""} onClick={handleShow}>
        {value}
      </div>

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Изменение email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column" autoComplete="off">
            {isError && <p className="text-danger">{error}</p>}
            <input
              autocomplete="off"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="text"
              placeholder="Новый email"
              className="input"
            />
            <input
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              placeholder="Пароль"
              className="input"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={change}>
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangeEmailModal;
