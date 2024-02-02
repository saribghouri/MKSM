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
import UserProfile from "./userProfile";
import Cookies from "js-cookie";

const UserEdit = ({ user }) => {
  console.log("user", user);
  const [userData, setUserData] = useState([]);
  const onFinish = async (values) => {
    try {
      // setLoadingUpdateProfile(true);
      const token = Cookies.get("apiToken");
      const userId = user.id;
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("contact", values.contact);
      formData.append("dob", values.dob);
      formData.append("gender", values.gender);
      formData.append("about", values.about);
      formData.append("company", values.company);
      formData.append("collage", values.collage);
      formData.append("location", values.location);
      formData.append("job", values.job);
      if (values.upload && values.upload.length > 0) {
        formData.append("profileImage", values.upload[0].originFileObj);
      }

      const response = await fetch(
        `https://mksm.blownclouds.com/api/users/edituser/${userId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        // setLoadingUpdateProfile(false);

        console.log("🚀 ~ data:", data);
        const updatedUserDetails = {
          ...userData,
          userName: values.userName,
          affiliationNo: values.affiliationNo,
          profileImage: imageUrl,
        };
        setUserData((p) => ({ ...p, ...updatedUserDetails }));
        // setUserProfileImage(data.profileImage || userData.profileImage);

        message.success("Profile updated successfully");
        setShowProfileEditModal(false);
        setForceRerender((prev) => !prev);

        // handleChange({
        //   file: {
        //     status: "done",
        //     originFileObj: values.upload[0].originFileObj,
        //   },
        // });
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error during profile edit:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  console.log("isEditing", isEditing);
  const [showAllUsers, setShowAllUsers] = useState(false);
  return (
    <div>
      {showAllUsers ? (
        <UserProfile />
      ) : isEditing ? (
        <UserEdit onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
            <h1 className=" text-[22px] mb-[-10px]">View Users</h1>
          </div>

          <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

          <div className="flex  flex-col pl-[10px] pr-[10px] ml-[16px] mr-[16px]  mt-[20px] mb-[100px]">
            <Card className="w-[100%] ">
              {/* <h1 className="text-[22px] font-[400] ml-[50px] text-[#F3585E] mb-[20px]">
                Edit Details
              </h1> */}
              <div className="flex flex-row gap-6  flex-wrap">
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
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-[#727272]">Name</label>
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

                      <label className="text-[#727272]">Date of Birth</label>
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
                          placeholder="Name"
                        />
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

                      <label className="text-[#727272]">Phone</label>
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
                            message: "Please input your job!",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-r-[20px] rounded-l-[20px] w-[300px]"
                          placeholder="Phone No"
                        />
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
                  <Button
                    className="bg-[#F24044] border-none w-[100px]  rounded-r-[20px] rounded-l-[20px] !text-white"
                    onClick={() => setShowAllUsers(true)}
                    htmlType="submit"
                    
                  >
                    update
                  </Button>
                  </Form>
                </div>
                <div className="flex justify-end w-[90%]">
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
