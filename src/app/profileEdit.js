import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import Image from "next/image";
import { EditFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import ProfileView from "./profileView";
import { useUser } from "./UserContext";
import Cookies from "js-cookie";
import dayjs from "dayjs";

const ProfileEdit = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [userData, setUserData] = useState([]);
  console.log("userData", userData.profileImage);
  const [form] = Form.useForm();
  const [forceRerender, setForceRerender] = useState(false);
console.log("user",user)
  const [userProfileImage, setUserProfileImage] = useState(
    userData.profileImage || null
  );
  console.log("userProfileImage", userProfileImage);
  console.log("userData", userData);
  console.log(dayjs(user.dob,"D/M/YYYY"))
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mksm.blownclouds.com/api/user/details",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("🚀 ~ data:", data);

          // Update the imageUrl state based on the new data
          setImageUrl(data?.user_details[0]?.profileImage);

          setUserData(data["user_details"][0]);
          setForceRerender((prev) => !prev);
        } else {
          console.error(
            "Failed to fetch user details:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, []);

  const onFinish = async (values) => {
    try {
      // setLoadingUpdateProfile(true);
      const token = Cookies.get("apiToken");
      const userId = userData.id;
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("contact", values.contact);
      formData.append("dob",dayjs(values.dob).format("D/M/YYYY"));
      formData.append("gender", values.gender);
      formData.append("about", values.about);
      formData.append("company", values.company);
      formData.append("collage", values.collage);
      formData.append("location", values.location);
      formData.append("job", values.job);
      if (values.upload && values.upload.length > 0) {
        formData.append("profileImage", values.upload[0].originFileObj);
      }
console.log("values",dayjs(values.dob).format("D/M/YYY"))
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
        setIsEditing(true);
        console.log("🚀 ~ data:", data);
        const updatedUserDetails = {
          ...userData,
          userName: values.userName,
          affiliationNo: values.affiliationNo,
          profileImage: imageUrl,
        };
        setUserData((p) => ({ ...p, ...updatedUserDetails }));
        setUserProfileImage(data.profileImage || userData.profileImage);

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
      {isEditing ? (
        <ProfileView onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div className="flex  flex-col   pl-[10px] pr-[10px] ml-[16px] mr-[56px]  mt-[170px] mb-[20px]">
            <div className="flex justify-start ml-[18px]  ">
              <h1 className=" mt-[0px] mb-[20px] ml-[10px] text-[#F24044] font-[700] text-[24px]">
                {userData.userName}
              </h1>
            </div>
          </div>

          <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />
          <div className="flex  flex-col   pl-[10px] pr-[10px] ml-[16px] mr-[16px]  mt-[20px] mb-[100px]">
            <Card className="w-[100%] ">
              <h1 className="text-[22px] font-[400] ml-[50px] text-[#F3585E] mb-[20px]">
                Edit Details
              </h1>
              <div className=" flex flex-col gap-6 ml-[50px] flex-wrap">
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
                    userName: user.userName,
                    gender: user.gender,
                    emailAddress: user.emailAddress,
                    // dob: dayjs(user.dob,"DD/MM/YYYY"),
                    dob: dayjs(user.dob,"D/M/YYYY"),

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
                  <div className="flex bottom-[320px] relative">
                    <Form.Item
                      className="h-[50px]  w-[100%] top-0 left-[-50px]  absolute"
                      name="upload"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => e.fileList}
                    >
                      <Upload
                        name="upload"
                        listType="picture-circle"
                        className="avatar-uploader userAdmin"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                        {imageUrl && typeof imageUrl === "string" ? (
                          <img
                            alt=""
                            className="!w-[139px] !h-[139px] rounded-[50%]"
                            src={imageUrl}
                          />
                        ) : userData.profileImage ? (
                          <img
                            alt=""
                            className="w-[70px] h-[70px] rounded-[50%]"
                            src={userData.profileImage}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </Form.Item>
                  </div>
                  <div className=" flex flex-col">
                    <div className="flex  gap-2">
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">Name</label>
                        <Form.Item
                          className=""
                          name="userName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input
                            className="rounded-r-[20px] rounded-l-[20px] w-[276px]"
                            placeholder="Name"
                          />
                        </Form.Item>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">Gender</label>
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
                            className="rounded-r-[20px] rounded-l-[20px] w-[276px] "
                            placeholder="Gender"
                          />
                        </Form.Item>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">Company</label>
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
                            className="rounded-r-[20px] rounded-l-[20px] w-[276px]"
                            placeholder="Company"
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="flex  gap-2">
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">Phone</label>

                        <Form.Item
                          className="!w-[276px]"
                          name="contact"
                          rules={[
                            {
                              required: true,
                              message: "Please input your phone No!",
                            },
                          ]}
                        >
                          <Input
                            className="rounded-r-[20px] rounded-l-[20px] !w-[276px]"
                            placeholder="Phone No"
                          />
                        </Form.Item>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">Collage</label>
                        <Form.Item
                          className="w-[276px]"
                          name="collage"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Collage!",
                            },
                          ]}
                        >
                          <Input
                            className="rounded-r-[20px] rounded-l-[20px] w-[276px]"
                            placeholder="Collage"
                          />
                        </Form.Item>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">Location</label>
                        <Form.Item
                          className="!w-[206px]"
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
                            className=" rounded-r-[20px] rounded-l-[20px] !w-[276px]"
                          >
                            <Select.Option type="admin" value={1}>
                              Admin
                            </Select.Option>

                            <Select.Option type="Doctor" value={3}>
                              Doctor
                            </Select.Option>
                          </Select>
                          {/* <Input
                          className="rounded-r-[20px] rounded-l-[20px] w-[276px]"
                          placeholder="Collage"
                        /> */}
                        </Form.Item>
                      </div>
                    </div>
                    <div className="flex  gap-2">
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">Date of Birth</label>
                        <Form.Item className=""
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
                            className="!w-[276px] rounded-r-[20px] rounded-l-[20px] "
                            format="D/M/YYYY"

                           
                          />
                        </Form.Item>
                      
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">Job</label>
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
                            className=" rounded-r-[20px] rounded-l-[20px] !w-[276px]"
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
                    <div className="w-full">
                      <div className="flex flex-col">
                        <label className="text-[#7f7e7e]">About</label>
                        <Form.Item
                          className="!w-[840px]"
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
                            className="rounded-r-[20px] rounded-l-[20px] !w-[1000px]"
                            rows={4}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F24044] contents  relative">
                    <Button
                      htmlType="submit"
                      className=" !text-[#ffffff] block bottom-[490px] right-0 absolute bg-[#F24044] text-center  items-center !border-none rounded-r-[20px] rounded-l-[20px] "
                    >
                      Save Changes <EditFilled />
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
