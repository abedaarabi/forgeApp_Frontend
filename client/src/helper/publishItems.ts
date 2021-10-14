interface ItemDetails {
  publishStatus: string;
  versionId: string;
  fileName: string;
  projectName: string;
  projectId: string;
  versionType: string;
  derivativesId: string;
  createUserName: string;
  fileType: string;
  createTime: Date;
  lastModifiedTime: Date;
  lastModifiedUserName: string;
  storageSize: number;
  extension: string;
  originalItemUrn: string;
  projectGuid: string;
  downloadItem: string;
  name: string;
  role: string;
  guid: string;
  translateStatus: string;
  translateProgress: string;
}

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
