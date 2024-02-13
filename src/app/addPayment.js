"use client";
import { Input, Form, Button, message, Divider } from "antd";
import TextArea from "antd/es/input/TextArea";
import Cookies from "js-cookie";
import React, { useState } from "react";

const AddPayment = ({handlePaymentCard}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Name", values.name);
      formData.append("price", values.price);
      formData.append("months", values.months);
      formData.append("details", values.details);

      formData.forEach((value, key) => {
        console.log(key, value);
      });

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
        message.success("Payment added successfully");
        setLoading(false);
        handlePaymentCard()
      } else {
        const errorResponse = await response.json(); // To get more details from the server
        console.error("Error Response:", errorResponse);
        message.error("Failed to add payment");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during payment registration:", error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
        <h1 className="text-[22px] font-sans">Add Subscription</h1>
      </div>
      <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

      <div className="flex  flex-col items-center justify-between ">
        <div className=" w-[662px]   rounded-[10px]">
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
                Add Subscription
              </p>
              <Form.Item
                className="mt-[10px]"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
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
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please enter price",
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
                name="months"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of months",
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Enter Month"
                />
              </Form.Item>
              <Form.Item
                className="mt-[10px]"
                name="details"
                rules={[
                  {
                    required: true,
                    message: "Please enter userName",
                  },
                ]}
              >
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
                  Add Subscription
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