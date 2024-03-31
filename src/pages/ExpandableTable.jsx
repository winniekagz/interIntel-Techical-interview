import React from "react";
import { Table } from "antd";
 
function ExpandableTable({ combinations }) {
    console.log("combinations",combinations);
     const titles = Object.keys(combinations[0]);
     const dataSource = combinations.map((item, index) => ({
       key: index,
       name: item[titles[0]],
       description: Object.values(item),
     }));

     // Generate columns dynamically based on titles
     const columns = titles.map((title, index) => ({
       title: "title",
       dataIndex: title,
       key: index,
       render: (text) => <p style={{ margin: 0 }}>{text}</p>,
     }));

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={dataSource}
    />
  );
}

export default ExpandableTable
