import { ItemDetails } from "../../../server/src/interfaces/interface.item";

export const publishItems = async (id: string, arrayOfItems: ItemDetails[]) => {
  try {
    const response = await fetch(
      `http://localhost:3050/projects/${id}/publish`,
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
