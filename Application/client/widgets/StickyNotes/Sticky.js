import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";

import { attemptUpdateSticky, attemptDeleteSticky } from "_thunks/stickies"; //

import ConfirmModal from "_components/ConfirmModal";

export default function Sticky({ id, text, color, textColor, remove }) {
  const dispatch = useDispatch();

  const [currentText, setCurrentText] = useState(text);
  const [currentColor, setCurrentColor] = useState(color);
  const [currentTextColor, setCurrentTextColor] = useState(textColor);

  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);
  const updateText = (e) => setCurrentText(e.target.value);
  const editSticky = () => setEdit(true);

  const cancelEdit = () => {
    setEdit(false);
    setCurrentText(text);
    setCurrentColor(color);
    setCurrentTextColor(textColor);
  };

  const handleUpdateSticky = () => {
    if (currentText) {
      dispatch(
        attemptUpdateSticky(id, currentText, currentColor, currentTextColor)
      ).then(() => setEdit(false));
    }
  };

  const deleteSticky = () => {
    remove(id);
    dispatch(attemptDeleteSticky(id));
  };
  const updateColor = (e) => setCurrentColor(e.target.value);
  const updateTextColor = (e) => setCurrentTextColor(e.target.value);
  return (
    <div className={`card height-100`}>
      <div
        className="card-content"
        style={{ backgroundColor: currentColor, color: currentTextColor }}
      >
        <div className="content">
          {edit ? (
            <>
              <textarea
                className="textarea"
                value={currentText}
                onChange={updateText}
              />

              <div className="field is-grouped is-grouped-centered mt-2 is-flex-wrap-wrap">
                <label
                  className="label has-background-light p-2"
                  style={{ marginBottom: 0 }}
                >
                  Text Color
                </label>
                <div className="control p-2 has-background-light">
                  <input
                    type="color"
                    value={currentTextColor}
                    onChange={updateTextColor}
                  />
                </div>
                <label
                  className="label p-2 has-background-light"
                  style={{ marginBottom: 0 }}
                >
                  Background Color
                </label>
                <div className="control p-2 has-background-light">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={updateColor}
                  />
                </div>
              </div>
            </>
          ) : (
            <p>{text}</p>
          )}
        </div>
      </div>

      <div className="card-footer level p-2">
        <div className="level-left" />
        <div className="level-right">
          {edit ? (
            <>
              <p className="level-item">
                <button
                  className="button is-success"
                  onClick={handleUpdateSticky}
                  onKeyPress={handleUpdateSticky}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faSave} />
                  </span>
                </button>
              </p>
              <p className="level-item">
                <button
                  className="button is-warning has-text-centered"
                  onClick={cancelEdit}
                  onKeyPress={cancelEdit}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faBan} />
                  </span>
                </button>
              </p>
            </>
          ) : (
            <p className="level-item">
              <button
                className="button is-dark has-text-centered"
                onClick={editSticky}
                onKeyPress={editSticky}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </button>
            </p>
          )}
          <p className="level-item">
            <button
              className="button is-danger is-outlined has-text-centered"
              onClick={openModal}
              onKeyPress={openModal}
            >
              <span className="icon is-small">
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </button>
          </p>
        </div>
      </div>
      <ConfirmModal
        confirm={confirm}
        closeModal={closeModal}
        deleteWidget={deleteSticky}
      />
    </div>
  );
}

Sticky.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
  canDelete: PropTypes.bool,
};

Sticky.defaultProps = {
  text: "add text here...",
  color: "white",
  canDelete: false,
};
