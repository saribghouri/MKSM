import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeftOutlined,
  EditFilled,
  EditOutlined,
  LeftCircleFilled,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ProfileEdit from "./profileEdit";
import TextArea from "antd/es/input/TextArea";
import UserProfile from "./userProfile";
import Cookies from "js-cookie";
import AllUsers from "./allUsers";
import dayjs from "dayjs";

const UserEdit = ({ user }) => {
  console.log("user", user);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [forceRerender, setForceRerender] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(
    userData.profileImage || "assets/images/download.jfif"
  );
  const onFinish = async (values) => {
    try {
      // setLoadingUpdateProfile(true);
      const token = Cookies.get("apiToken");
      const userId = user.id;
      const formData = new FormData();
      formData.append("userName", values.name);
      formData.append("contact", values.contact);
      formData.append("dob", dayjs(values.dob).format("D/M/YYYY"));
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
          name: values.name,
          affiliationNo: values.affiliationNo,
          profileImage: imageUrl,
        };
        setUserData((p) => ({ ...p, ...updatedUserDetails }));
        setUserProfileImage(data.profileImage || userData.profileImage);
        setShowAllUsers(true);
        message.success("Profile updated successfully");
        setShowProfileEditModal(false);
        setForceRerender((prev) => !prev);

        handleChange({
          file: {
            status: "done",
            originFileObj: values.upload[0].originFileObj,
          },
        });
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
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    return true;
  };

  const handleChange = (info) => {
    if (info.file) {
      getBase64(info.file.originFileObj || info.file, (url) => {
        setLoading(false);
        setImageUrl(url);
        setForceRerender((prev) => !prev);
        console.log("Image URL:", url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        className="w-[100%]"
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div>
      {showAllUsers ? (
        <AllUsers />
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
                <div className="relative">
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
                      dob: dayjs(user.dob, "D/M/YYYY"),
                      company: user.company,
                      collage: user.collage,
                      contact: user.contact,
                      about: user.about,
                      location: user.location,
                      job: user.job,
                      profileImage: user.profileImage,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <div className="  h-[50px] w-[100%] top-0 left-[50px] mr-[-20px] relative">
                      <Form.Item
                        className="h-[50px]  !w-[100%]"
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e.fileList}
                      >
                        <Upload
                          name="upload"
                          listType="picture-circle"
                          className="avatar-uploader userp"
                          showUploadList={false}
                          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {imageUrl && typeof imageUrl === "string" ? (
                            <img
                              alt=""
                              className="!w-[239px] !h-[239px] rounded-[50%]"
                              src={imageUrl}
                              // src="assets/images/download.jfif"
                            />
                          ) : user.profileImage ? (
                            <img
                              alt=""
                              className="!w-[239px] !h-[239px] rounded-[50%]"
                              // src="assets/images/download.jfif"
                              src={user.profileImage}
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </Form.Item>
                    </div>
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
                            // label="Appointment Time"
                            name="dob"
                            rules={[
                              {
                                required: true,
                                message: "Please select dob!",
                              },
                            ]}
                          >
                            <DatePicker
                              className="w-[300px] rounded-r-[20px] rounded-l-[20px] "
                              format="D/M/YYYY"
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
                      <div className="flex justify-end">
                        <Button
                          className="bg-[#F24044]   border-none w-[100px]  rounded-r-[20px] rounded-l-[20px] !text-white"
                          // onClick={() => setShowAllUsers(true)}
                          htmlType="submit"
                        >
                          update
                        </Button>
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

export default UserEdit;
