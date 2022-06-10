import React from "react";

const Popup = ({
  show,
  setShow,
  chart,
  setChart,
  removeData,
  removeDataByCategory,
  categories,
  idx,
}) => {
  return (
    <>
      <div className="popup_box">
        <div className="poup_form">
          <h3>Are sure you want to clear the data</h3>
          <div className="but_box">
            <button
              onClick={() => {
                show ? removeData() : removeDataByCategory(categories[idx]);
              }}
              className="confirm"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                if (chart) {
                  setChart(false);
                }
                if (show) {
                  setShow(false);
                }
              }}
              className="cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
