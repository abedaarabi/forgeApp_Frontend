import { ItemDetails } from "../interfaces/ItemDetails";

export const publishItems = async (id: string, arrayOfItems: ItemDetails[]) => {
  try {
    const response = await fetch(
      `http://localhost:9090/projects/${id}/publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arrayOfItems), // body data type must match "Content-Type" header
      }
    );
    const data = await response.json();
    console.log("111111", data);
  } catch (error) {
    console.log(error);
  }
};
