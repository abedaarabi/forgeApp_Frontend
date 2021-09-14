import { Button } from "antd/lib/radio";
import React from "react";
import "./popUP.css";
type PopUp = {
  tricker: boolean;
  close(a: boolean): void;
  children?: JSX.Element[];
};

export const PopUp = ({
  tricker,
  close,
  children,
  setApopUp,
  publishItems,
  setCChecked,

  setO,
}: any) => {
  const time = () =>
    setTimeout(() => {
      setO(false);
      setCChecked({});
    }, 10 * 1000);

  React.useEffect(() => {
    const t = time();
    return () => {
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {tricker ? (
        <div className=" modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setApopUp(false);
              }}
            >
              X
            </button>
          </div>

          <div className="title">
            <h1>Publish Items</h1>
          </div>

          <div className="body">
            <p>Are you sure you want to Publish! </p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setApopUp(false);
                publishItems();

                setO(true);
              }}
            >
              Agree
            </button>

            <button
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
    </>
  );
};
