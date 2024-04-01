import React from "react";
import { Table } from "antd";
import HeaderText from "../components/typography/HeaderText";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  }, 
  
];
 
const generateKey = (index, size) => `${size}-${index}`;

function ExpandableTable({ combinations }) {
  const groupedData = {};  
  combinations?.forEach((item, index) => {
    const size = item.split(" - ")[0];
    if (!groupedData[size]) {
      groupedData[size] = [];
    }
    groupedData[size].push({
      key: generateKey(index, size),
      name: item,
      description: `Description for ${item}`,
    });
  });

  const expandedRowRender = (record) => (
    <p style={{ margin: 0 }}>{record.description}</p>
  );

  const rowExpandable = (record) => record.children; 

  const expandedData = Object.keys(groupedData).map((size) => ({
    key: size,
    name: size,
    children: groupedData[size],
  }));

  

  return (
    <div className="w-3/4 mt-10">  
      <HeaderText text="Table Variants" />
      <Table
        columns={columns}
        expandable={{ expandedRowRender, rowExpandable }}
        dataSource={expandedData}
      />
    </div>
  );
}

export default ExpandableTable
