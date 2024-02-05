import { Button, Card, Divider, Form, Input, Select } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeftOutlined,
  EditFilled,
  EditOutlined,
  LeftCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ProfileEdit from "./profileEdit";
import TextArea from "antd/es/input/TextArea";
import UserEdit from "./useredit";
import AllUsers from "./allUsers";
import { useUser } from "./UserContext";

const UserProfile = ({ user, onCancel }) => {
  console.log(user);
  const onFinish = (values) => {
    console.log("Success:", user);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);
  
 

  const { userp } = useUser();
  console.log("userp",userp)
  return (
    <div>
      {showAllUsers ? (
        <AllUsers />
      ) : isEditing ? (
        <UserEdit user={user} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
            <h1 className=" text-[22px] font-sans mb-[-10px]">View Users</h1>
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
                    onClick={() => setShowAllUsers(true)}
                  />
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    className="!text-[#F24044]  text-center flex items-center  rounded-r-[20px] rounded-l-[20px] "
                  >
                    Edit <EditFilled />
                  </Button>
                </div>
                <div className="flex gap-8 ml-[50px]">
                  <div className="flex flex-col w-full">
                    <img
                      alt=""
                      className="w-[227px] h-[227px] rounded-[50%] top-[-100px]  "
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
                      // Set initial values from the user object
                      name: user.name,
                      gender: user.gender,
                      address: user.address,
                      dob: user.dob,
                      company: user.company,
                      collage: user.collage,
                      contact: user.contact,
                      about: user.about,
                      location: user.location,
                      job: user.job,
                      // ... (set other fields)
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    disabled={componentDisabled}
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-[#F24044]">Name</label>
                      <Form.Item
                        name="name"
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

                      <label className="text-[#F24044]">Gender</label>

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

                      <label className="text-[#F24044]">Date of Birth</label>
                      <Form.Item
                        name="dob"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Date of Birth!",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-r-[20px] rounded-l-[20px] w-[300px]"
                          placeholder=" Date of Birth"
                        />
                      </Form.Item>

                      <label className="text-[#F24044]">Company</label>

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
                      <label className="text-[#F24044]">Collage</label>
                      <Form.Item
                        name="collage"
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
                      <label className="text-[#F24044]">Email</label>
                      <Form.Item
                        name="address"
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

                      <label className="text-[#F24044]">Phone</label>
                      <Form.Item
                        name="contact"
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

                      <label className="text-[#F24044]">Location</label>
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
                      <label className="text-[#F24044]">Job</label>
                      <Form.Item
                        name="job"
                        rules={[
                          {
                            required: true,
                            message: "Please select a user type!",
                          },
                        ]}
                      >
                           <Input
                          className="rounded-r-[20px] rounded-l-[20px] w-[300px]"
                          placeholder="job"
                        />
                      </Form.Item>

                      <label className="text-[#F24044]">About</label>
                      <Form.Item
                        name="abouts"
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

export default UserProfile;
