import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import { Table, Tag, Space } from "antd";

import "./SearchBar.css";
export type ElementProperties = {
  name: string;
  dbId: number;
  version_id: number;
  externalId: string;
  TypeName: string;
  objectId: string;
  Workset: string;
  Type_Sorting: string;
  CCSTypeID: string;
  CCSTypeID_Type: string;
  CCSClassCode_Type: string;
  BIM7AATypeName: string;
  BIM7AATypeDescription: string;
  BIM7AATypeID: string;
  BIM7AATypeNumber: string;
  BIM7AATypeCode: string;
  BIM7AATypeComments: string;
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "TypeName",
    dataIndex: "TypeName",
    key: "TypeName",
  },
  {
    title: "dbId",
    dataIndex: "dbId",
    key: "dbId",
  },
  {
    title: "CCSClassCode_Type",
    dataIndex: "CCSClassCode_Type",
    key: "CCSClassCode_Type",
  },
  {
    title: "BIM7AATypeName",
    dataIndex: "BIM7AATypeName",
    key: "BIM7AATypeName",
  },
];
export function DataTable() {
  const f = useParams();
  console.log(f);

  const { id, derivativesId }: { id: string; derivativesId: string } =
    useParams();
  const [elementData, setElementData] = React.useState(
    [] as ElementProperties[]
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const modelDerivative = async () => {
    try {
      const ENDPOINT = `http://localhost:3050/projects/${id}/items/${derivativesId}`;
      const response = await fetch(ENDPOINT);
      setIsLoading(true);
      const data = await response.json();
      setIsLoading(false);
      setElementData(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    modelDerivative();
  }, []);
  console.log(elementData);

  return (
    <div>
      {isLoading ? (
        <h1>loading ...</h1>
      ) : (
        <div style={{ height: 600 }}>
          <Table dataSource={elementData} columns={columns} />;
          {/* <table>
            <tr>
              <th>Name</th>
              <th>Type Name</th>
              <th>dbId</th>
            </tr>
          </table> */}
          {/* {elementData.map((elt) => {
            return (
              <div>
                <tr>
                  <td>{elt.name}</td>
                  <td>{elt.TypeName}</td>
                  <td>{elt.dbId}</td>
                </tr>
              </div>
            );
          })} */}
        </div>
      )}
    </div>
  );
}
