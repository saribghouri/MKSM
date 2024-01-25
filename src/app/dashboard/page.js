"use client";
import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Input,
  Dropdown,
  Space,
  Modal,
  Form,
  message,
  Upload,
  Card,
} from "antd";
import Link from "antd/es/typography/Link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  DownOutlined,
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Cards from "../cards";

import AllUsers from "../allUsers";
import ActiveUsers from "../activeUsers";
import InActiveUsers from "../inActiveUsers";
import AddPayment from "../addPayment";
import PaymentCard from "../paymentCard";
import MediumPlan from "../mediumPlan";
import BasicPlan from "../basicPlan";
import StandardPlan from "../standardPlan";

const { Header, Sider } = Layout;

const App = () => {
  const router = useRouter();

  const [showUser, setShowUser] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [inActiveUser, setInactiveUser] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [paymentCard, setPaymentCard] = useState(false);
  const [mediumPlan, setMediumPlan] = useState(false);
  const [basicPlan, setBasicPlan] = useState(false);
  const [standardPlan, setStandardPlan] = useState(false);

  const [userDetails, setUserDetails] = useState([]);
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  console.log("🚀 ~ imageUrl:", imageUrl);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [forceRerender, setForceRerender] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(
    userDetails?.profileImage || null
  );
  console.log("🚀 ~ userProfileImage:", userProfileImage);
  console.log(userDetails);
  const handleShowProfileEditModal = () => {
    setShowProfileEditModal(true);
  };
  const handleForgetPassword = async (values) => {
    try {
      setLoadingUpdateProfile(true);
      const token = Cookies.get("apiToken");
      const response = await fetch(
        "https://mymedjournal.blownclouds.com/api/forget/password",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password_confirmation: values.confirmPassword,
            oldPassword: values.oldPassword,
            password: values.newPassword,
          }),
        }
      );

      if (response.ok) {
        message.success("Password reset link sent successfully");

        setShowChangePasswordModal(false);
      } else {
        message.error("Failed to send password reset link");
        console.log("Response:", response);
      }
    } catch (error) {
      console.error("Error during forget password:", error);
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mymedjournal.blownclouds.com/api/user/details",
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
          setImageUrl(data?.user_details[0]?.profileImage);
          setUserDetails(data.user_details[0]);
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

  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };
  const handleShowDoctorData = () => {
    setShowUser(true);
    setActiveUser(false);
    setInactiveUser(false);
    setAddPayment(false);
    setMediumPlan(false)
    setStandardPlan(false)
    setBasicPlan(false)

  };
  const handleActiveUser = () => {
    setActiveUser(true);
    setShowUser(false);
    setInactiveUser(false);
    setAddPayment(false);
    setBasicPlan(false)
    setStandardPlan(false)
    setMediumPlan(false)
  };
  const handleInactiveUser = () => {
    setActiveUser(false);
    setInactiveUser(true);
    setPaymentCard(false);
    setShowUser(false);
    setAddPayment(false);
    setMediumPlan(false)
    setStandardPlan(false)
    setBasicPlan(false)

  };
  const handleAddPayment = () => {
    setAddPayment(true);
    setActiveUser(false);
    setPaymentCard(false);
    setInactiveUser(false);
    setShowUser(false);
    setMediumPlan(false)
    setStandardPlan(false)
    setBasicPlan(false)

  };
  const handlePaymentCard = () => {
    setAddPayment(false);
    setPaymentCard(true);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
    setMediumPlan(false)
    setBasicPlan(false)
    setStandardPlan(false)

  };
  const handleMediumPlan = () => {
    setMediumPlan(true)
    setStandardPlan(false)
    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
    setBasicPlan(false)

  };
  const handlesetBasicPlan = () => {
    setBasicPlan(true)
    setStandardPlan(false)
    setMediumPlan(false)
    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
  };
  const handleStandardPlan = () => {
    setStandardPlan(true)
    setBasicPlan(false)
    setMediumPlan(false)
    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);

    setShowMenu(false);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function getItem(label, key, icon, children, onClick) {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    };
  }

  const generateMenuItems = () => {
    // if (userDetails.userRole === userDetails.userRole) {
    console.log("sabgqebew");
    return [
      getItem(
        "Dashboard",
        "1",
        <Image
          src={"assets/icon/bxs_dashboard.svg"}
          width={20}
          height={20}
          alt=""
        />,
        null
        // handleCards,
      ),

      getItem(
        "Authentication",
        "sub1",
        <Image
          src={"assets/icon/carbon_two-factor-authentication.svg"}
          width={20}
          height={20}
          alt=""
        />,
        [
          getItem(
            "",
            "sub41",
            <>
              <button onClick={handleShowDoctorData}>All Users</button>
            </>
          ),
          getItem(
            "",
            "sub42",
            <div onClick={handleActiveUser} className="w-[500px] h-[50px]">
              Active Users
            </div>
          ),
          getItem(
            "",
            "sub43",
            <div onClick={handleInactiveUser} className="w-[500px] h-[50px]">
              Inactive Users
            </div>
          ),
        ]
      ),
      getItem(
        "Subscription plans",
        "sub2",
        <Image
          src={"assets/icon/mdi_subscriptions.svg"}
          width={20}
          height={20}
          alt=""
        />,
        [
          getItem(
            "",
            "sub41",
            <>
              <button onClick={handleAddPayment}>Add payment</button>
            </>
          ),
          getItem(
            "",
            "sub42",
            <div onClick={handlePaymentCard} className="w-[500px] h-[50px]">
              Fetch Payment
            </div>
          ),
        ]
      ),

      getItem(
        " User Subscription ",
        "sub3",
        <Image
          src={"assets/icon/uiw_user-add.svg"}
          width={20}
          height={20}
          alt=""
        />,
        [
          getItem(
            "",
            "sub43",
            <div
              onClick={handlesetBasicPlan}
              className="w-[500px] h-[50px]"
            >
              Basic
            </div>
          ),
          getItem(
            "",
            "sub48",
            <div
              onClick={handleMediumPlan}
              className="w-[500px] h-[50px]"
            >
             Medium
            </div>
          ),
          getItem(
            "",
            "sub49",
            <div
              onClick={handleStandardPlan}
              className="w-[500px] h-[50px]"
            >
             Premium
            </div>
          ),
        ]
      ),
    ];
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("apiToken");
      const response = await fetch(
        "https://mymedjournal.blownclouds.com/api/logout",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        Cookies.remove("apiToken");

        router.push("/");

        message.success(
          "Logout successful. You have been successfully logged out."
        );
      } else {
        message.error("Logout failed. Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      message.error(
        "Logout failed. An error occurred during logout. Please try again."
      );
    }
  };

  const item = generateMenuItems();

  const items = [
    {
      key: "1",
      label: (
        <a className="font" onClick={handleShowProfileEditModal}>
          <UserOutlined /> Profile edit
        </a>
      ),
    },

    {
      key: "2",
      label: (
        <Link to="/account">
          <CustomerServiceOutlined />{" "}
          <a className="font !text-[#000]">Change Password</a>
        </Link>
      ),
      onClick: handleShowChangePasswordModal,
    },
    {
      key: "3",

      label: (
        <a className="font" onClick={handleLogout}>
          <LogoutOutlined />
          Logout
        </a>
      ),
    },
  ];
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

  const handleProfileEdit = async (values) => {
    try {
      setLoadingUpdateProfile(true);
      // const token = Cookies.get("apiToken");
      const userId = userDetails.id;
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("affiliationNo", values.affiliationNo);
      formData.append("noOfExperience", values.noOfExperience);
      formData.append("gender", values.gender);
      formData.append("specialization", values.specialization);
      formData.append("age", values.age);

      if (values.upload && values.upload.length > 0) {
        formData.append("profileImage", values.upload[0].originFileObj);
      }

      const response = await fetch(
        `https://mymedjournal.blownclouds.com/api/users/edituser/${userId}`,
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
        setLoadingUpdateProfile(false);

        console.log("🚀 ~ data:", data);
        const updatedUserDetails = {
          ...userDetails,
          userName: values.userName,
          affiliationNo: values.affiliationNo,
          profileImage: imageUrl,
        };
        setUserDetails((p) => ({ ...p, ...updatedUserDetails }));
        setUserProfileImage(data.profileImage || userDetails.profileImage);

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

  const handleLogoClick = () => {
    // Toggle the state to show/hide cards
    setShowCards(!showCards);
  };

  return (
    <Layout
      className=""
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        className="!bg-[#F24044] min-w-[900px]  "
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
      >
        <div className="p-[30px] text-[22px]" onClick={handleLogoClick}>
          <h1 className="text-white text-center">
            <Image
              width={1000}
              height={1000}
              alt=""
              className=""
              src="/assets/images/white_logo.png"
            />
          </h1>
        </div>

        <div className="demo-logo-vertical bg-[#fff]" />

        <Menu
          className=""
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={item}
        />
      </Sider>

      <Layout>
        <Header
          className="!bg-[#fff] "
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex items-center justify-between ">
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            <div>
              <Modal className="change-password-modal"
                height={379}
                open={showChangePasswordModal}
                onCancel={handleCloseChangePasswordModal}
                footer={null}
              >
                <Form
                  form={form}
                  name="changePasswordForm"
                  onFinish={handleForgetPassword}
                  onFinishFailed={onFinishFailed}
                >
                  <div className="flex gap-0 flex-col w-[100%] h-[300px] justify-center items-center">
                    <p className="text-[22px] text-[#F24044] Poppins font-[500] mb-[10px]">
                      Change Password
                    </p>
                    <Form.Item
                      name="oldPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your old password!",
                        },
                      ]}
                    >
                      <Input.Password
                        className="w-[300px]  rounded-r-[20px] rounded-l-[20px]"
                        placeholder="Old Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your new password!",
                        },
                      ]}
                    >
                      <Input.Password
                        className="w-[300px]   rounded-r-[20px] rounded-l-[20px]"
                        placeholder="New Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your new password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The two passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="w-[300px]  rounded-r-[20px] rounded-l-[20px]"
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="bg-[#F24044] !border-none w-[200px] !text-white rounded-r-[20px] rounded-l-[20px]"
                        htmlType="submit"
                        loading={loadingUpdateProfile}
                      >
                        Update Password
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
              <div className="flex justify-between relative">
                <div className="flex text-center items-center w-[180px] h-[45px] bg-[#F24044]">
                  <Dropdown
                    className=" ml-[45px]"
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className="text-[#fff] ml-[10px]">
                        {/* {userDetails?.userName} */}
                        <p>sarib ghouri</p>
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
                <img
                  alt=""
                  className="w-[50px] h-[50px] rounded-[50%] ml-[-20px] mt-[-2px]  absolute"
                  // src={userDetails?.profileImage || null}
                  src="assets/images/download.jfif"
                />
              </div>

              <Modal
                title="Edit Profile"
                open={showProfileEditModal}
                onCancel={() => setShowProfileEditModal(false)}
                footer={null}
              >
                <Form
                  form={form}
                  name="editProfileForm"
                  initialValues={{
                    userName: userDetails.userName,
                    affiliationNo: userDetails.affiliationNo,
                    specialization: userDetails.specialization,
                    gender: userDetails.gender,
                    noOfExperience: userDetails.noOfExperience,
                    age: userDetails.age,
                  }}
                  onFinish={handleProfileEdit}
                  onFinishFailed={onFinishFailed}
                >
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
                      listType="picture-card"
                      className="avatar-uploader w-[100%]"
                      showUploadList={false}
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl && typeof imageUrl === "string" ? (
                        <img
                          alt=""
                          className="w-[70px] h-[70px] rounded-[50%]"
                          src={imageUrl}
                        />
                      ) : userProfileImage ? (
                        <img
                          alt=""
                          className="w-[70px] h-[70px] rounded-[50%]"
                          src={userProfileImage}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                  <label className="mb-[10px] ml-[2px]">UserName</label>

                  <Form.Item
                    className="mt-[10px]"
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter userName",
                      },
                    ]}
                  >
                    <Input placeholder="User Name" />
                  </Form.Item>
                  <label className="mb-[10px]  ml-[2px]">Gender</label>
                  <Form.Item
                    className="mt-[10px]"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Please enter gender",
                      },
                    ]}
                  >
                    <Input placeholder="gender" />
                  </Form.Item>
                  <label className="mb-[10px]  ml-[2px]">Age</label>
                  <Form.Item
                    className="mt-[10px]"
                    name="age"
                    rules={[
                      {
                        required: true,
                        message: "Please enter gender",
                      },
                    ]}
                  >
                    <Input placeholder="gender" />
                  </Form.Item>
                  {userDetails.userRole === "3" && (
                    <>
                      <label className="mb-[10px]  ml-[2px]">
                        Specialization
                      </label>
                      <Form.Item
                        className="mt-[10px]"
                        name="specialization"
                        rules={[
                          {
                            required: true,
                            message: "Please enter specialization",
                          },
                        ]}
                      >
                        <Input placeholder="specialization" />
                      </Form.Item>
                      <label className="mb-[10px]  ml-[2px]">Experience</label>

                      <Form.Item
                        className="mt-[10px]"
                        name="noOfExperience"
                        rules={[
                          {
                            required: true,
                            message: "Please enter noOfExperience",
                          },
                        ]}
                      >
                        <Input placeholder="noOfExperience" />
                      </Form.Item>
                      <label className="mb-[10px]  ml-[2px]">
                        affiliationNo
                      </label>
                      <Form.Item
                        className="mt-[10px]"
                        name="affiliationNo"
                        rules={[
                          {
                            required: true,
                            message: "Please enter affiliationNo",
                          },
                        ]}
                      >
                        <Input placeholder="affiliationNo" />
                      </Form.Item>
                    </>
                  )}
                  {userDetails.userRole === "4" && (
                    <>
                      <label className="mb-[10px]  ml-[2px]">
                        affiliationNo
                      </label>
                      <Form.Item
                        className="mt-[10px]"
                        name="affiliationNo"
                        rules={[
                          {
                            required: true,
                            message: "Please enter affiliationNo",
                          },
                        ]}
                      >
                        <Input placeholder="affiliationNo" />
                      </Form.Item>
                      <label className="mb-[10px]  ml-[2px]">Age</label>
                      <Form.Item
                        className="mt-[10px]"
                        name="age"
                        rules={[
                          {
                            required: true,
                            message: "Please enter age",
                          },
                        ]}
                      >
                        <Input placeholder="age" />
                      </Form.Item>
                    </>
                  )}

                  <Form.Item>
                    <Button
                      className="bg-[#d31305] !text-white"
                      htmlType="submit"
                      loading={loadingUpdateProfile}
                    >
                      Update Profile
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </Header>
        {/* <Cards /> */}

        <div>
          {showUser && <AllUsers />}
          {activeUser && <ActiveUsers />}
          {inActiveUser && <InActiveUsers />}
          {addPayment && <AddPayment />}
          {paymentCard && <PaymentCard />}
          {mediumPlan && <MediumPlan />}
          {basicPlan && <BasicPlan />}
          {standardPlan && <StandardPlan />}
        </div>
      </Layout>
    </Layout>
  );
};
export default App;
