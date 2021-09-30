import zIndex from "@material-ui/core/styles/zIndex";
import React from "react";

export const ItemsSelected = ({
  allurn,
  shouldIncrement,
  changeShouldIncrement,

  func,
}: any) => {
  return (
    <>
      <div className="main-div-btn">
        {allurn.map((item: any, index: number) => (
          <div key={item.urn} className="btn">
            <p className="file-name-onViewer" style={{ zIndex: 1 }}>{item.fileName}</p>
            <span style={{ zIndex: 1 }}>
              <button className="show-hide-button"
                style={
                  shouldIncrement[index]
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "crimson" }
                }
                onClick={async () => {
                  func(item, index);
                  changeShouldIncrement(!shouldIncrement);
                }}
              >
                {shouldIncrement[index] ? "Show" : "Hide"}
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
