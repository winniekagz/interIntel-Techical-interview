import React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  
  
];
const data = [
  {
    key: 1,
    name: "John Brown", 
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Jim Green", 
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable", 
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black", 
    description:
      "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
  },
];
const generateKey = (index, size) => `${size}-${index}`;

function ExpandableTable({ combinations }) {
  const groupedData = {};

  
  combinations.forEach((item, index) => {
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
    <Table
      columns={columns}
      expandable={{ expandedRowRender, rowExpandable }}
      dataSource={expandedData}
    />
  );
}

export default ExpandableTable
