import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Checkbox,
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

const ProfileEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [userData, setUserData] = useState([]);
  console.log("userData", userData.profileImage);
  const [form] = Form.useForm();
  const [forceRerender, setForceRerender] = useState(false);

  const [userProfileImage, setUserProfileImage] = useState(
    userData.profileImage || null
  );
  console.log("userProfileImage", userProfileImage);
  console.log("userData", userData);
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
          <div>
            <Image
              width={1000}
              height={100}
              className="w-full"
              src={"/assets/images/Rectangle.png"}
              srcSet={"/assets/images/Rectangle@2x.png 2x"}
              alt=""
            />
          </div>
          <div className="flex  flex-col relative  pl-[10px] pr-[10px] ml-[16px] mr-[16px]  mt-[20px] mb-[20px]">
            <div className="flex justify-between ">
              <h1 className=" mt-[50px] ml-[10px] text-[#F24044] font-[700] text-[24px]">
                Ghouri Sarib
              </h1>
            </div>
          </div>

          <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />
          <div className="flex  flex-col   pl-[10px] pr-[10px] ml-[16px] mr-[16px]  mt-[20px] mb-[100px]">
            <Card className="w-[100%] ">
              <h1 className="text-[22px] font-[400] ml-[50px] text-[#F3585E] mb-[20px]">
                Edit Details
              </h1>
              <div className=" flex flex-row gap-6 ml-[50px] flex-wrap">
                <Form
                  form={form}
                  initialValues={{
                    userName: userData.userName,
                    contact: userData.contact,
                    dob: userData.dob,
                    about: userData.about,
                    location: userData.location,
                    gender: userData.gender,
                    company: userData.company,
                    job: userData.job,
                    collage: userData.collage,
                    profileImage: userData.profileImage,
                  }}
                  className="flex gap-6"
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  // initialValues={{
                  //   remember: true,
                  // }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <div className="flex bottom-[280px] relative">
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
                  <div className="flex flex-col gap-2">
                    <label className="text-[#7f7e7e]">Name</label>
                    <Form.Item
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
                  <div className="flex flex-col gap-2">
                    <label className="text-[#7f7e7e]">Phone</label>
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
                        className="rounded-r-[20px] rounded-l-[20px] w-[276px]"
                        placeholder="Phone No"
                      />
                    </Form.Item>
                    <label className="text-[#7f7e7e]">Collage</label>
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
                        className="rounded-r-[20px] rounded-l-[20px] w-[276px]"
                        placeholder="Collage"
                      />
                    </Form.Item>
                    <label className="text-[#7f7e7e]">Location</label>
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
                        className=" rounded-r-[20px] rounded-l-[20px] w-[276px]"
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
                  <div className="flex flex-col gap-2">
                    <label className="text-[#7f7e7e]">Date of Birth</label>
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
                        className="rounded-r-[20px] rounded-l-[20px] w-[276px]"
                        placeholder=" Date of Birth"
                      />
                    </Form.Item>
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
                        className=" rounded-r-[20px] rounded-l-[20px] w-[276px]"
                      >
                        <Select.Option type="admin" value={1}>
                          Admin
                        </Select.Option>

                        <Select.Option type="Doctor" value={3}>
                          Doctor
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <label className="text-[#7f7e7e]">About</label>
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
                        className="rounded-r-[20px] rounded-l-[20px] !w-[276px]"
                        rows={4}
                      />
                    </Form.Item>
                  </div>

                  <div className="bg-[#F24044]  flex relative">
                    <Button
                        htmlType="submit"
                      onClick={() => {
                        // setIsEditing(true);
                      }}
                      className=" !text-[#ffffff] block bottom-[450px] right-0 absolute bg-[#F24044] text-center  items-center !border-none rounded-r-[20px] rounded-l-[20px] "
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
