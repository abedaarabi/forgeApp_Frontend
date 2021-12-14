import { ItemDetails } from "../interfaces/ItemDetails";

export const publishItems = async (id: string, arrayOfItems: ItemDetails[]) => {
  const BASE_ENDPOINT = process.env.REACT_APP_PROXY || "http://localhost:9090/";
  try {
    const response = await fetch(`${BASE_ENDPOINT}projects/${id}/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arrayOfItems), // body data type must match "Content-Type" header
    });
    const data = await response.json();
    console.log("111111", data);
  } catch (error) {
    console.log(error);
  }
};
