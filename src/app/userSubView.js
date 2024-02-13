import { Button, Card, DatePicker, Divider, Form, Input, Select } from "antd";
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
import UserSubscription from "./userSubscription";

const UserSubView = ({ user, onCancel, userData }) => {
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
  console.log("userp", userp);
  return (
    <div>
      {showAllUsers ? (
        <UserSubscription />
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
                </div>
                <div className="flex gap-8 ml-[50px]">
                  <div className="flex flex-col w-full">
                    <img
                      alt=""
                      className="w-[227px] h-[227px] rounded-[50%] top-[-100px]  "
                      src={user.profileImage || null}
                      // src="assets/images/download.jfif"
                    />
                  </div>
                  <Form
                    className="flex gap-[150px]  "
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 1280,
                    }}
                    initialValues={{
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
                      profileImage: user.profileImage,
                      subscriptionDetails: user.subscriptionDetails,
                      subscriptionPrice: user.subscriptionPrice,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    disabled={componentDisabled}
                  >
                    <div className="flex flex-col gap-2 ml-[40px]">
                      <div className="flex  gap-[80px]">
                        <div className="flex flex-col">
                          <label className="text-[#727272]">Name</label>
                          <Form.Item
                            className="!w-[250px] hello"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please input your username!",
                              },
                            ]}
                          >
                            <Input
                              className="rounded-r-[20px] rounded-l-[20px] w-[300px] "
                              placeholder="N ame"
                            />
                          </Form.Item>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[#727272]">Gender</label>
                          <Form.Item
                            className="!w-[250px]"
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
                        </div>
                      </div>
                      <div className=" flex gap-[80px] ">
                        <div className="flex flex-col">
                          <label className="text-[#727272]">
                            Date of Birth
                          </label>

                          <Form.Item
                            className="!w-[250px]"
                          
                            name="dob"
                            rules={[
                              {
                                required: true,
                                message: "Please input Date of Birth!",
                              },
                            ]}
                          >
                          <Input
                              className="rounded-r-[20px] rounded-l-[20px] w-[300px] "
                              placeholder="N ame"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[#727272]">Location</label>
                          <Form.Item
                            className="!w-[300px]"
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
                              className=" rounded-r-[20px] rounded-l-[20px] !w-[300px]"
                            >
                              <Select.Option type="admin" value={1}>
                                Admin
                              </Select.Option>

                              <Select.Option type="Doctor" value={3}>
                                Doctor
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>

                      <div className=" flex gap-[80px] ">
                        <div className="flex flex-col">
                          <label className="text-[#727272]">Company</label>
                          <Form.Item
                            className="!w-[250px]"
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
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[#727272]">Phone</label>
                          <Form.Item
                            className="!w-[250px]"
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
                        </div>
                      </div>

                      <div className=" flex  gap-[80px]">
                        <div className="flex flex-col">
                          <label className="text-[#727272]">Collage</label>
                          <Form.Item
                            className="!w-[250px]"
                            name="collage"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Collage!",
                              },
                            ]}
                          >
                            <Input
                              className="rounded-r-[20px] rounded-l-[20px] !w-[300px]"
                              placeholder="Collage"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[#727272]">Job</label>
                          <Form.Item
                            className="!w-[250px]"
                            name="job"
                            rules={[
                              {
                                required: true,
                                message: "Please input your job!",
                              },
                            ]}
                          >
                            <Input
                              className="rounded-r-[20px] rounded-l-[20px] !w-[300px]"
                              placeholder="Phone No"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      {/* //sbewbewbewb */}

                      <div className=" flex  gap-[80px]">
                        <div className="flex flex-col">
                          <label className="text-[#727272]">Details</label>
                          <Form.Item
                            className="!w-[250px]"
                            name="subscriptionDetails"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Details!",
                              },
                            ]}
                          >
                            <Input
                              className="rounded-r-[20px] rounded-l-[20px] !w-[300px]"
                              placeholder="Details"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[#727272]">Price</label>
                          <Form.Item
                            className="!w-[250px]"
                            name="subscriptionPrice"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Price!",
                              },
                            ]}
                          >
                            <Input
                              className="rounded-r-[20px] rounded-l-[20px] !w-[300px]"
                              placeholder="Price"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      {/* //sbewbewbewb */}
                      <label className="text-[#727272]">About</label>
                      <div className="flex gap-4 ">
                        <Form.Item
                          className=""
                          name="about"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Date of About!",
                            },
                          ]}
                        >
                          <TextArea
                            placeholder="About"
                            className="rounded-r-[20px] rounded-l-[20px] w-[630px]"
                          />
                        </Form.Item>
                      </div>
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

export default UserSubView;
