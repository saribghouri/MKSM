import { Button, Card, Checkbox, Divider, Form, Input, Select, Upload } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import { EditFilled, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import ProfileView from "./profileView";
const ProfileEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const onFinish = (values) => {
    console.log("Success:", values);
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
          <Form.Item
  className="h-[50px] mb-[80px] w-[100%]"
  name="upload"
  valuePropName="fileList"
  getValueFromEvent={(e) => e.fileList}
  extra=" "
  rules={[
    {
      required: true,
      message: "Please upload your doctor image!",
    },
  ]}
>
  <Upload
    name="upload"
    listType="picture-circle"
    className="w-[130px] h-[130px] rounded-[50%] top-[-100px] absolute "
    showUploadList={false}
    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
    beforeUpload={beforeUpload}
    onChange={handleChange}
  >
    {/* Display default image */}
   
      <img
        alt=""
        className="w-[130px] h-[130px] rounded-[50%]  absolute "
        src="assets/images/defaultImage.jpg"
      />
  
   
    
  </Upload>
</Form.Item>
            <div className="flex justify-between ">
              <h1 className=" mt-[50px] ml-[10px] text-[#F24044] font-[700] text-[24px]">
                Ghouri Sarib
              </h1>

              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
                htmlType="submit"
                className=" !text-[#ffffff] bg-[#F24044] text-center flex items-center !border-none rounded-r-[20px] rounded-l-[20px] "
              >
                Save Changes <EditFilled />
              </Button>
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
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[#7f7e7e]">Name</label>
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
                      name="phone"
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
                      name="Collage"
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
                      name="birth"
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
