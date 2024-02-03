"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Input,
  Table,
  Modal,
  Form,
  Button,
  message,
  Popconfirm,
  Divider,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const AddPayment = () => {
  const [doctors, setDoctors] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("categorieName", values.name);


      const token = Cookies.get("apiToken");

      const response = await fetch(
        "https://mksm.blownclouds.com/api/all/subscription",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      if (response.ok) {
        message.success("category added successfully");
        setCategory(true);
        setDoctors(await response.json());
        setLoading(false);
        handleShowCategories();
      } else {
        message.error("category not added");
        setDoctors(await response.json());
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during category registration:", error);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
        <h1 className="text-[22px] font-sans">Add Payment</h1>
      </div>
      <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

      <div className="flex min-h-screen flex-col items-center justify-between p-24 ">
        <div className=" w-[662px] h-[472px]  rounded-[10px]">
          <Form
            form={form}
            name="changePasswordForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div
              className="flex gap-0 flex-col  rounded-[10px] w-[100%] h-[540px] justify-center items-center"
              style={{
                backgroundImage: 'url("/assets/images/cardbg.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p className="text-[22px] text-[#ffffff] Poppins font-[500] mb-[10px]">
                Add payment
              </p>
              <Form.Item
                className="mt-[10px]"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please enter userName",
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Name"
                />
              </Form.Item>
              <Form.Item
                className="mt-[10px]"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please enter userName",
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Enter price"
                />
              </Form.Item>

              <Form.Item
                className="mt-[10px]"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please enter userName",
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Enter Month"
                />
              </Form.Item>
              <Form.Item>
                <TextArea
                  placeholder="Enter Subscription"
                  className="!w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  rows={4}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="bg-[#F3585E] !border-none w-[150px] !text-white rounded-r-[20px] rounded-l-[20px]"
                  htmlType="submit"
                >
                  Update
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;
