import React from "react";
import PropTypes from "prop-types";
import AddSticky from "./StickyNotes/AddSticky";
import AddNews from "./News/AddNews";
import AddStock from "./Stock/AddStock";
import AddWeather from "./Weather/AddWeather";
export default function AddWidgetModal({
  open,
  closeModal,
  widgetCount,
  x,
  y,
  updateList,
  widgetType,
}) {
  return (
    <div className={`modal confirm-modal ${open ? "is-active" : ""}`}>
      <div className="modal-background" />
      <div className="modal-content">
        {{
          Sticky: (
            <AddSticky
              closeModal={closeModal}
              widgetCount={widgetCount}
              x={x}
              y={y}
              updateList={updateList}
            />
          ),
          News: (
            <AddNews
              closeModal={closeModal}
              widgetCount={widgetCount}
              x={x}
              y={y}
              updateList={updateList}
            />
          ),
          Stock: (
            <AddStock
              closeModal={closeModal}
              widgetCount={widgetCount}
              x={x}
              y={y}
              updateList={updateList}
            />
          ),
          Weather: (
            <AddWeather
              closeModal={closeModal}
              widgetCount={widgetCount}
              x={x}
              y={y}
              updateList={updateList}
            />
          ),
        }[widgetType] || (
          // default
          <AddSticky
            closeModal={closeModal}
            widgetCount={widgetCount}
            x={x}
            y={y}
            updateList={updateList}
          />
        )}
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      />
    </div>
  );
}
AddWidgetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  widgetType: PropTypes.string.isRequired,
};
