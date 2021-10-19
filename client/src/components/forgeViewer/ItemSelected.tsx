import React from "react";

export const ItemsSelected = ({
  allurn,
  shouldIncrement,
  setShouldIncrement,

  func,
}: any) => {
  const [stylying, setStyling] = React.useState([]) as any[];
  // let color: any;
  return (
    <>
      <div className="main-div-btn">
        {allurn.map((item: any, index: number) => (
          <div key={item.urn} className="btn">
            <p className="file-name-onViewer" style={{ zIndex: 1 }}>
              {item.fileName}
            </p>
            <span style={{ zIndex: 1 }}>
              <button
                className="show-hide-button"
                style={
                  stylying[index]
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "crimson" }
                }
                onClick={() => {
                  func(item, index);
                  setShouldIncrement(shouldIncrement);
                  const newArray = [...shouldIncrement];
                  setStyling(newArray);
                }}
              >
                {stylying[index] ? "Show" : "Hide"}
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
