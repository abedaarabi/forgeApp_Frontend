import React from "react";
import "./popUP.css";
type PopUp = {
  tricker: boolean;
  close(a: boolean): void;
  children?: JSX.Element[];
};

export const PopUp = ({
  tricker,

  children,
  setApopUp,
  publishItems,
  setCChecked,
  arrayOfItems,
  projectId,

  setO,
}: any) => {
  const time = () =>
    setTimeout(() => {
      setO(false);
      setCChecked({});
    }, 10 * 3000);

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="popup-main-div">
      {tricker ? (
        <div className=" modalContainer">
          <div className="title">
            <h1>Publish Items</h1>
          </div>

          <div className="body">
            <p>Are you sure you want to Publish! </p>
          </div>
          <div className="footer">
            <button
              className="item-button-agree"
              onClick={() => {
                setApopUp(false);
                publishItems(projectId, arrayOfItems);
                time();
                setO(true);
              }}
            >
              Agree
            </button>

            <button
              className="item-button-close"
              onClick={() => {
                setApopUp(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
          </div>
          {children}
        </div>
      ) : null}
    </div>
  );
};
