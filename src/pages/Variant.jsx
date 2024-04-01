import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { variantOptions } from "../data/Data";
import { setManagementDetails } from "../features/variant/variantSlice";
import ExpandableTable from "./ExpandableTable";

function Variant() {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const formRefs = useRef({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data1, setdata1] = useState({});
  const [variantCount, setVariantCount] = useState(0);
  const [childCount, setChildCount] = useState({});
  const [varArray, setVarArray] = useState([]);
  const [showChild, setShowChild] = useState({});
  const [showForm, setShowForm] = useState(true);
  const { managementDetails } = useSelector((state) => state.variants);

  const [itemsArray, setItemsArray] = useState(managementDetails);

  const handleAddParent = () => {
    setVariantCount((prevCount) => prevCount + 1);
    setShowChild((prevState) => ({ ...prevState, [variantCount]: false }));
  };

  const handleRemoveParent = () => {
    setVariantCount((prevCount) => prevCount - 1);
    setVarArray((prevState) => prevState.slice(0, -1));
  };

  const handleChildCount = (index) => {
    setChildCount((prevState) => ({
      ...prevState,
      [index]: (prevState[index] || 0) + 1,
    }));
    setShowChild((prevState) => ({ ...prevState, [index]: true }));
  };

  const handleRemoveChildCount = (index) => {
    setChildCount((prevState) => ({
      ...prevState,
      [index]: (prevState[index] || 0) - 1,
    }));
  };

  const handleRemoveParentFinish = (index) => {
    console.log("removing index", index);
    setVariantCount((prevCount) => prevCount - 1);
    setVarArray((prevState) => {
      const updatedVarArray = [...prevState];
      updatedVarArray.splice(index, 1);
      return updatedVarArray;
    });
  };

  const onFinish = async (values, index) => {
    console.log("Submitting form for index", index, "with values:", values);

    const existingIndex = managementDetails.findIndex((entry) => {
      return Object.values(entry).some((entryValue) =>
        Object.values(values).some((value) => value === entryValue)
      );
    });

    if (existingIndex !== -1) {
      const updatedManagementDetails = [...managementDetails];
      updatedManagementDetails[existingIndex] = { ...values };
      await dispatch(setManagementDetails(updatedManagementDetails));
    } else {
      await dispatch(setManagementDetails([...managementDetails, values]));
    }

    setShowForm(false);
    handleRemoveParentFinish(index);
    generateCombinations(itemsArray, 0, "");
  };
  const [editingValue, setEditingValue] = useState("");
  const handleEdit = (value) => {
    console.log("edit reached", value);
  };

  useEffect(() => {
    const newChildCount = { ...childCount };
    const newShowChild = { ...showChild };

    newChildCount[variantCount] = 0;
    newShowChild[variantCount] = false;

    setChildCount(newChildCount);
    setShowChild(newShowChild);
  }, [variantCount]);

  useEffect(() => {
    setItemsArray(managementDetails);
  }, [managementDetails]);

  console.log("itemsArray", itemsArray); // Initialize an array to store combinations
  // Function to generate combinations
  // const data = [
  //   {
  //     usrType0: "Size",
  //     variantName0: "size 1",
  //     variantName00: "size 2",
  //     variantName01: "size 3",
  //   },
  //   {
  //     usrType0: "Color",
  //     variantName0: "color 1",
  //     variantName00: "color 2",
  //     variantName01: "color 3",
  //   },
  //   {
  //     usrType0: "Material",
  //     variantName0: "material 1",
  //     variantName00: "material 2",
  //     variantName01: "material 3",
  //   },
  //   {
  //     usrType0: "Style",
  //     variantName0: "style 1",
  //     variantName00: "style 2",
  //     variantName01: "style 3",
  //   },
  // ];

    const [combinations, setCombinations] = useState([]);
function generateCombinations(data, index, combination) {
  if (index === data.length) {
    //console.log("combination", combination.trim());
      setCombinations((prevCombinations) => [
        ...prevCombinations,
        combination.trim(),
      ]);
    return;
  }

  const item = data[index];
  for (let key in item) {
    if (key.startsWith("variantName")) {
      generateCombinations(data, index + 1, combination + " - " + item[key]);
    }
  }
}

// Start with an empty combination
//generateCombinations(data, 0, "");


useEffect(()=>{
generateCombinations(itemsArray, 0, "");
},[])
  return (
    <div>
      <>
        <div>
          <h1>All Possible Combinations:</h1>
          <ul>
            {combinations.map((combination, index) => (
              <li key={index}>{combination}</li>
            ))}
          </ul>
        </div>
        {itemsArray?.length > 0 &&
          itemsArray?.map((item, index) => (
            <div className="flex items-center" key={index + 1}>
              <div className="justify start mr-10">1</div>

              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center ">
                  <span>
                    {
                      item[
                        Object?.keys(item).find((key) =>
                          key.startsWith("usrType")
                        )
                      ]
                    }
                  </span>

                  <Button
                    className="flex justify-end"
                    onClick={() =>
                      handleEdit(
                        item[
                          Object?.keys(item).find((key) =>
                            key.startsWith("variantName")
                          )
                        ]
                      )
                    }
                  >
                    edit
                  </Button>
                </div>
                <div className="flex items-center mt-5 gap-x-5">
                  {Object.keys(item)
                    .filter((key) => key.startsWith("variantName"))
                    .map((key, childIndex) => (
                      <span
                        key={childIndex}
                        className="rounded-[30px] h-[30px] w-[100px] flex items-center justify-center bg-[#808080]"
                      >
                        {item[key]}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        <>
          {[...Array(variantCount)].map((_, index) => (
            <Form
              key={index}
              layout="vertical"
              onFinish={(values) => onFinish(values, index)}
              className="lg:w-[539px] w-full "
              form={formRefs.current[index]}
            >
              <div className="flex flex-col gap-y-5">
                <div className="card mt-10">
                  <Form.Item
                    name={`usrType${index}`}
                    label={`Type ${index + 1}`}
                    rules={[
                      {
                        required: true,
                        message: "Please add user type",
                      },
                    ]}
                  >
                    <Select
                      className="activity-select-tag activity-select-icon"
                      allowClear
                      style={{
                        width: "100%",
                        height: "44px",
                      }}
                      placeholder="Please select user type"
                      options={variantOptions}
                      onChange={(value) => {
                        setdata1((prevData) => ({
                          ...prevData,
                          objectName: value,
                        }));
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={`Variant ${index + 1}`}
                    name={`variantName${index}`}
                    rules={[
                      {
                        required: true,
                        message: "Please add variant",
                      },
                    ]}
                  >
                    <div className="flex gap-x-5 items-center">
                      <Input className="rounded-[4px] h-[52px] w-full border border-black" />
                      <Button
                        className="text-red-500"
                        onClick={() => handleRemoveParent(index)}
                      >
                        delete
                      </Button>
                    </div>
                  </Form.Item>

                  {[...Array(childCount[index] || 0)].map((_, childIndex) => (
                    <Form.Item
                      key={childIndex}
                      name={`variantName${index}${childIndex}`}
                      label={`Variant ${index + 1}.${childIndex + 1}`}
                      rules={[
                        {
                          required: true,
                          message: "Please add variant",
                        },
                      ]}
                    >
                      <div className="flex gap-x-5 items-center">
                        <Input className="rounded-[4px] h-[52px] w-full border border-black" />
                        <Button
                          className="text-red-500"
                          onClick={() => handleRemoveChildCount(index)}
                        >
                          delete
                        </Button>
                      </div>
                    </Form.Item>
                  ))}
                  <div className="flex flex-col gap-y-5">
                    <Button
                      className="text-red-500"
                      onClick={() => handleChildCount(index)}
                    >
                      Add Child
                    </Button>
                    <button
                      type="submit"
                      key="submit"
                      className="!bg-darkBlue px-2 py-2 text-white justify-start"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          ))}
        </>
        <div className="flex flex-col">
          <Button
            className="!bg-red-500 !text-white flex mt-5"
            onClick={handleAddParent}
          >
            Add Variant
          </Button>
        </div>
      </>
      <ExpandableTable combinations={combinations} /> 
    </div>
  );
}

export default Variant;
