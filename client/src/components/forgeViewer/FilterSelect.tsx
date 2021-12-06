import React from "react";
import { readExcel } from "./helper/readExcelHelp";
import "./forgeViewer.css";
const FilterSelect = ({ getEventXlsxInput }: any) => {
  return (
    <div>
      <label>
        <input
          className="upload-xml"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          onChange={async (e: any) => {
            console.log(e.target.files);

            const file = e.target.files[0];

            const readFile = await readExcel(file);
            getEventXlsxInput(readFile);
          }}
        />
      </label>
    </div>
  );
};

export default FilterSelect;
