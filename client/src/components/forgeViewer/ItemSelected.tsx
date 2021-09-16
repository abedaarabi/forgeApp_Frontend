import React from "react";

export const ItemsSelected = ({
  allurn,
  shouldIncrement,
  changeShouldIncrement,

  func,
}: any) => {
  return (
    <>
      {allurn.map((item: any, index: number) => (
        <div key={item.urn} className="btn">
          <p style={{ color: "blue", marginTop: "15px", fontWeight: "bold" }}>
            {item.fileName}
          </p>
          <div>
            <span>
              <button
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
        </div>
      ))}
    </>
  );
};
