




"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
 import Image from "next/image";
 import { useRouter } from "next/navigation";
 import { Button, Checkbox, Form, Input, Select, message } from "antd";
// ... other imports

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
 
  const onFinish = async (values) => {
    try {
      setLoading(true);

      // Add the userRole directly here
      const userRoleValue = 2;

      const response = await fetch(
        "https://mksm.blownclouds.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress: values.email,
            password: values.password,
            userRole: userRoleValue, // use the hardcoded userRole value
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("API response:", data);
        const cookie = Cookies.set("apiToken", data.access_token);
        console.log(cookie);

        router.push("/dashboard");

       
      } else {
        const errorData = await response.json();
        console.error("API request failed:", errorData);
        message.error("Failed to login. Invalid Credentials");

      }
      // ... rest of the onFinish function
    } catch (error) {
      // ... error handling
    } finally {
      setLoading(false);
    }
  };
 
 
 
 
 
 
 
 
 
 
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // ... rest of your component

  return (
    <div className="flex justify-between">
      <div className="flex min-h-screen flex-col items-center">
        <div className=" bg-cover w-[100%]  absolute top-0 left-0" style={{}}>
          <div
            className=" min-h-screen w-[50%]    relative"
            style={{
              backgroundImage: `url("/assets/images/Rectangle.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <h1 className="text-white text-center flex justify-center items-center min-h-screen">
          <Image
            width={400}
            height={400}
            alt=""
            className="absolute top-[45%] left-1/4 transform -translate-x-1/2 -translate-y-1/2"
            src="/assets/images/logo.png"
          />
        </h1>
      </div>
      <div className="flex min-h-screen flex-col items-center  ">
        <div className=" bg-cover w-[50%]  absolute top-0 right-0" style={{}}>
          <div
            className=" min-h-screen w-[100%]    relative"
            style={{
              backgroundImage: `url("/assets/images/login.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <h1 className="text-white  flex justify-center  min-h-screen">
          <Form
            className="absolute top-[50%] left-[81%] transform -translate-x-1/2 -translate-y-1/2"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 445,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className="w-[450px]"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                placeholder="Email address"
                className="rounded-l-[20px] rounded-r-[20px]"
              />
            </Form.Item>

            <Form.Item
              className="w-[450px] "
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="rounded-l-[20px] rounded-r-[20px]"
              />
            </Form.Item>

            <Form.Item
              className="fex justify-start w-full mt-[-15px] tex"
              name="remember"
              valuePropName="checked"
              // wrapperCol={{
              //   offset: 8,
              //   span: 16,
              // }}
            >
              <Checkbox className="text-white">Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 14,
              }}
            >
              <Button
          
                className="bg-[#F3585E] !text-white border-none rounded-l-[20px] rounded-r-[20px] w-[150px]"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </h1>
      </div>
    </div>
  );
};

export default Page;