"use client";
import React, { useState } from "react";

import Cookies from "js-cookie";
import Image from "next/image";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  console.log("user", user);
  const [loading, setLoading] = useState(false);
  const { login } = useUser();

  const onFinish = async (values) => {
    try {
      const token = Cookies.get("apiToken");
      setLoading(true);

      const response = await fetch(
        "https://mksm.blownclouds.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            emailAddress: values.email,
            password: values.password,
            userRole: 2,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Cookies.set("apiToken", data.access_token);
        login(data);
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("API request failed:", errorData);
        message.error("Failed to login. Invalid Credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="flex min-h-screen flex-col justify-center items-center  "
      style={{
        backgroundImage: `url("/assets/images/loginBg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-[22px]">
        <h1 className="text-white text-center">
          <Image
            width={237}
            height={227}
            alt=""
            className=""
            quality={50}
            src="/assets/images/clearlogo.png"
          />
        </h1>
      </div>
      <Form
        className=" flex justify-center flex-col item !w-[30%] "
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className="w-[100%] mb-[20px]  text-white text-[40px] flex justify-center text-center">
          Login
        </h1>
        <Form.Item
          className=""
          name="email"
          rules={[
            {
              required: true,
              message: (
                <span style={{ color: "white" }}>Please input your email!</span>
              ),
            },
          ]}
        >
          <Input
            placeholder="Email address"
            className="rounded-l-[20px] rounded-r-[20px] "
          />
        </Form.Item>

        <Form.Item
          className=" "
          name="password"
          rules={[
            {
              required: true,
              message: (
                <span style={{ color: "white" }}>
                  Please input your password!
                </span>
              ),
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
          name="rem ember"
          valuePropName="checked"
          // wrapperCol={{
          //   offset: 8,
          //   span: 16,
          // }}
        >
          <Checkbox className="text-white">Remember me</Checkbox>
        </Form.Item>

        <Form.Item className="w-[100%] flex justify-center">
          <Button
            type="enter"
            className="bg-[#3A893A] !text-white border-none flex justify-center rounded-l-[20px] rounded-r-[20px] w-[150px]"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;
