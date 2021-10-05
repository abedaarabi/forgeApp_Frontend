import React from "react";

export const RenderList = ({ lists }: any) => {
  const [loading, setLoading] = React.useState(false);
  console.log("lists", lists);

  return (
    <select>
      {lists.map((list: string) => (
        <option value={list}>{list}</option>
      ))}
    </select>
  );
};
