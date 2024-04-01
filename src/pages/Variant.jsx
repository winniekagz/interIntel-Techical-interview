import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { variantOptions } from "../data/Data";
import { setManagementDetails } from "../features/variant/variantSlice";
import ExpandableTable from "./ExpandableTable";
import { addIcon, deleteIcon } from "../assets";
import { ReactSVG } from "react-svg";
import { PlusOutlined } from "@ant-design/icons";

function Variant() {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const formRefs = useRef({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data1, setdata1] = useState({});
  const [variantCount, setVariantCount] = useState(1);
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

  console.log("itemsArray", itemsArray); 


    const [combinations, setCombinations] = useState([]);
function generateCombinations(data, index, combination) {
  if (index === data.length) {
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



useEffect(()=>{
generateCombinations(itemsArray, 0, "");
},[])
  return (
    <div className="bg-light-blue-bg">
      <div className="flex flex-col justify-center py-12 items-center">
        <>
          {itemsArray?.length > 0 &&
            itemsArray?.map((item, index) => (
              <div className="flex items-center " key={index + 1}>
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
                className="w-3/4 bg-white rounded-md !mt-10 "
                form={formRefs.current[index]}
              >
                <div className="flex flex-col gap-y-5">
                  <div className="card p-10">
                    <Form.Item
                      name={`usrType${index}`}
                      label={`Option Name`}
                      rules={[
                        {
                          required: true,
                          message: "Please select Option",
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
                      label={`Option Name`}
                      name={`variantName${index}`}
                      className="!ml-10"
                      rules={[
                        {
                          required: true,
                          message: "Please add option name",
                        },
                      ]}
                    >
                      <div className="flex gap-x-5 items-center">
                        <Input className="rounded-[4px] h-[52px] w-full border border-black" />

                        <button
                          type="button"
                          className=" px-3 py-1 rounded"
                          onClick={() => handleRemoveParent(index)}
                        >
                          <ReactSVG src={deleteIcon} />
                        </button>
                      </div>
                    </Form.Item>

                    {[...Array(childCount[index] || 0)].map((_, childIndex) => (
                      <Form.Item
                        key={childIndex}
                        name={`variantName${index}${childIndex}`}
                        label={`Option Name`}
                        className="!ml-10"
                        rules={[
                          {
                            required: true,
                            message: "Please add option name",
                          },
                        ]}
                      >
                        <div className="flex gap-x-5 items-center">
                          <Input className="rounded-[4px] h-[52px] w-full border border-black" />
                          <button
                            type="button"
                            className=" px-3 py-1 rounded"
                            onClick={() => handleRemoveParent(index)}
                          >
                            <ReactSVG src={deleteIcon} />
                          </button>
                        </div>
                      </Form.Item>
                    ))}

                    <div className="flex justify-end">
                      <Button
                        className="bg-light-blue-bg hover:bg-blue !text-dark-blue border !border-dark-blue w-[200px] py-2 mr-14
                      flex items-center"
                        onClick={() => handleChildCount(index)}
                        icon={<PlusOutlined />}
                      >
                        Add Option Variant
                      </Button>
                    </div>

                    <div className="py-10 flex justify-start ml-10">
                      <button
                        type="submit"
                        key="submit"
                        className=" bg-dark-blue hover:bg-blue px-2 py-2 text-white justify-start w-[150px]"
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
              Add Option
            </Button>
          </div>
        </>
        {combinations?.length > 1 ? (
          <ExpandableTable combinations={combinations} />
        ) : (
          <div className="">
            <h1>No variants yet</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Variant;
