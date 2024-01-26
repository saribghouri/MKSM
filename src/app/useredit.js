import { Button, Card, DatePicker, Divider, Form, Input, Select } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeftOutlined, EditFilled, EditOutlined, LeftCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ProfileEdit from "./profileEdit";
import TextArea from "antd/es/input/TextArea";

const UserEdit = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <ProfileEdit onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
            <h1 className="Doctors">View Users</h1>
          </div>

          <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

          <div className="flex  flex-col   pl-[10px] pr-[10px] ml-[16px] mr-[16px]  mt-[20px] mb-[100px]">
            <Card className="w-[100%] ">
              {/* <h1 className="text-[22px] font-[400] ml-[50px] text-[#F3585E] mb-[20px]">
                Edit Details
              </h1> */}
              <div className="flex flex-row gap-6  flex-wrap">
                <div className=" flex justify-between w-full">
                <ArrowLeftOutlined 
            className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
            onClick={() => handleView(record)}
          />
             
                </div>
               <div className="flex gap-8 ml-[50px]">
               
                 <div className="flex flex-col w-full">
                    <img
                      alt=""
                      className="w-[227px] h-[227px] rounded-[50%] top-[-100px]"
                      // src={userDetails?.profileImage || null}
                      src="assets/images/download.jfif"
                    />
                  </div>
                <Form
                  className="flex gap-[50px]"
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                 
                  <div className="flex flex-col gap-2">
                    <label className="text-[#727272]">Name</label>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input
                        className="rounded-r-[20px] rounded-l-[20px] w-[300px]"
                        placeholder="Name"
                      />
                    </Form.Item>

                    <label className="text-[#727272]">Gender</label>

                    <Form.Item
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please input your gender!",
                        },
                      ]}
                    >
                      <Input
                        className="rounded-r-[20px] rounded-l-[20px] w-[300px] "
                        placeholder="Gender"
                      />
                    </Form.Item>

                    <label className="text-[#727272]">Date of Birth</label>
                    <Form.Item
                      name="birth"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Date of Birth!",
                        },
                      ]}
                    >
                        <DatePicker  className="rounded-r-[20px] rounded-l-[20px] w-[300px]" onChange={onChange} />
                     
                    </Form.Item>

                    <label className="text-[#727272]">Company</label>

                    <Form.Item
                      name="company"
                      rules={[
                        {
                          required: true,
                          message: "Please input your company!",
                        },
                      ]}
                    >
                      <Input
                        className="rounded-r-[20px] rounded-l-[20px] w-[300px]"
                        placeholder="Company"
                      />
                    </Form.Item>
                    <label className="text-[#727272]">Collage</label>
                    <Form.Item
                      name="Collage"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Collage!",
                        },
                      ]}
                    >
                      <Input
                        className="rounded-r-[20px] rounded-l-[20px] w-[300px]"
                        placeholder="Collage"
                      />
                    </Form.Item>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#727272]">Email</label>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input
                        className="rounded-r-[20px] rounded-l-[20px] w-[300px]"
                        placeholder="Email"
                      />
                    </Form.Item>

                    <label className="text-[#727272]">Phone</label>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone No!",
                        },
                      ]}
                    >
                      <Input
                        className="rounded-r-[20px] rounded-l-[20px] w-[300px]"
                        placeholder="Phone No"
                      />
                    </Form.Item>

                    <label className="text-[#727272]">Location</label>
                    <Form.Item
                      name="location"
                      rules={[
                        {
                          required: true,
                          message: "Please select a location!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="location"
                        className=" rounded-r-[20px] rounded-l-[20px] w-[300px]"
                      >
                        <Select.Option type="admin" value={1}>
                          Admin
                        </Select.Option>

                        <Select.Option type="Doctor" value={3}>
                          Doctor
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <label className="text-[#727272]">Job</label>
                    <Form.Item
                      name="job"
                      rules={[
                        {
                          required: true,
                          message: "Please select a user type!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="job"
                        className=" rounded-r-[20px] rounded-l-[20px] w-[300px]"
                      >
                        <Select.Option type="admin" value={1}>
                          Admin
                        </Select.Option>

                        <Select.Option type="Doctor" value={3}>
                          Doctor
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <label className="text-[#727272]">About</label>
                    <Form.Item
                      name="about"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Date of About!",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder=" About"
                        className="rounded-r-[20px] rounded-l-[20px] !w-[300px]"
                        rows={4}
                      />
                    </Form.Item>
                  </div>
                </Form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEdit;
