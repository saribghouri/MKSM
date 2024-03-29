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
} from "antd";
import Link from "antd/es/typography/Link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  CustomerServiceOutlined,
  DownOutlined,
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";

import AllUsers from "../allUsers";
import ActiveUsers from "../activeUsers";
import InActiveUsers from "../inActiveUsers";
import AddPayment from "../addPayment";
import PaymentCard from "../paymentCard";

import ProfileView from "../profileView";
import UserSubscription from "../userSubscription";
import { useUser } from "../UserContext";
import Cards from "../cards";

const { Header, Sider } = Layout;

const App = () => {
  const router = useRouter();

  const [showUser, setShowUser] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [inActiveUser, setInactiveUser] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [paymentCard, setPaymentCard] = useState(false);
  const [card, setCard] = useState(false);

  const [userSubscription, setUserSubscription] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);

  const [userDetails, setUserDetails] = useState([]);
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  console.log("🚀 ~ imageUrl:", imageUrl);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { user } = useUser();
  console.log("user", user);
  const [forceRerender, setForceRerender] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(
    userDetails?.profileImage || null
  );
  console.log("🚀 ~ userProfileImage:", userProfileImage);
  console.log(userDetails);
  const handleForgetPassword = async (values) => {
    try {
      setLoadingUpdateProfile(true);
      const token = Cookies.get("apiToken");
      const response = await fetch(
        "https://mksm.blownclouds.com/api/forget/password",
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
    localStorage.setItem('dashboardStates', JSON.stringify({ showUser: true, paymentCard: false }));

    setUserSubscription(false);
    setActiveUser(false);
    setInactiveUser(false);
    setAddPayment(false);

    setProfileView(false);
    setCard(false);
    setProfileEdit(false);
    setProfileEdit(false);
    setPaymentCard(false);
  };
  const handleActiveUser = () => {
    setActiveUser(true);
    setShowUser(false);
    setUserSubscription(false);
    setInactiveUser(false);
    setAddPayment(false);
    setPaymentCard(false);
    setProfileView(false);
    setCard(false);
    setProfileEdit(false);
    localStorage.setItem('dashboardStates', JSON.stringify({ activeUser: true, showUser: false }));
  };
  const handleInactiveUser = () => {
    setActiveUser(false);
    setInactiveUser(true);
    setPaymentCard(false);
    setShowUser(false);
    setUserSubscription(false);
    setAddPayment(false);
    localStorage.setItem('dashboardStates', JSON.stringify({ inActiveUser: true, showUser: false }));

    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handleAddPayment = () => {
    setAddPayment(true);
    setActiveUser(false);
    setPaymentCard(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);
    localStorage.setItem('dashboardStates', JSON.stringify({ addPayment: true, showUser: false }));

    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handlePaymentCard = () => {
    setAddPayment(false);
    setPaymentCard(true);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);
    localStorage.setItem('dashboardStates', JSON.stringify({ paymentCard: true, showUser: false }));

    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };

  const handleSubscription = () => {
    setUserSubscription(true);
    localStorage.setItem('dashboardStates', JSON.stringify({ userSubscription: true, showUser: false }));

    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);

    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handleCard = () => {
    setCard(true);
    setUserSubscription(false);
    localStorage.setItem('dashboardStates', JSON.stringify({ card: true, showUser: false }));

    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);

    setProfileView(false);
    setProfileEdit(false);
  };

  const handleProfile = () => {
    setProfileView(true);
    localStorage.setItem('dashboardStates', JSON.stringify({ profileView: true, showUser: false }));

    setAddPayment(false);
    setCard(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);
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
        null,
        handleCard
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
            "All Users",
            "sub12",
            <Image src={""} alt="" />,
            null,
            handleShowDoctorData
          ),
          getItem(
            "Active Users",
            "sub13",
            <Image src={""} alt="" />,
            null,
            handleActiveUser
          ),

          getItem(
            "Inactive Users",
            "sub14",
            <Image src={""} alt="" />,
            null,
            handleInactiveUser
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
            "  Add Subscription",
            "sub15",
            <Image src={""} alt="" />,
            null,
            handleAddPayment
          ),

          getItem(
            "Fetch Subscription",
            "sub16",
            <Image src={""} alt="" />,
            null,
            handlePaymentCard
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
            "Users Subscription",
            "sub17",
            <Image src={""} alt="" />,
            null,
            handleSubscription
          ),
        ]
      ),
    ];
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("apiToken");
      const response = await fetch("https://mksm.blownclouds.com/api/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
        <a className="font !text-[#F24044] hover:none" onClick={handleProfile}>
          <UserOutlined /> Profile edit
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          className="font !text-[#F24044]"
          onClick={handleShowChangePasswordModal}
        >
          <UserOutlined /> Change Password
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          className="flex justify-center text-center rounded-l-[20px] pt-[5px] pb-[5px] rounded-r-[20px]  bg-[#F24044] !text-white"
          onClick={handleLogout}
        >
          <LogoutOutlined />
          Logout
        </a>
      ),
    },
  ];

  useEffect(() => {
    const isUserLoggedIn = Cookies.get("apiToken");

    if (!isUserLoggedIn) {
      router.push("/");
    }
  }, [router]);



  useEffect(() => {
   
    const savedStates = localStorage.getItem('dashboardStates');
    if (savedStates) {
      const states = JSON.parse(savedStates);
      setShowUser(states.showUser || false);
      setActiveUser(states.activeUser || false);
      setUserSubscription(states.userSubscription || false);
      setShowUser(states.showUser || false);
      setAddPayment(states.addPayment || false);
      setPaymentCard(states.paymentCard || false);
      setCard(states.card || false);
      setProfileView(states.profileView || false);
      // Continue setting the rest of your states...
    }
  }, []);
  



  
  return (
    <div
      className="!bg-[#fff] flex"
      style={{
        minHeight: "100vh",
        width: "auto",
        
      }}
    >
      <Sider
        className="!bg-[#F24044] min-w-[900px]"
        collapsible
        width="300px"
             collapsedWidth="110px"
        collapsed={collapsed}
        onCollapse={handleCollapse}
      >
        <div className="p-[20px] text-[22px]">
          <h1 className="text-white text-center">
            <Image
              width={800}
              height={800}
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

      <Layout className="!bg-[#fff]">
        <Header
          className="!bg-[#fff] "
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center justify-between">
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
              <Modal
                className="change-password-modal relative"
                height={379}
                open={showChangePasswordModal}
                onCancel={handleCloseChangePasswordModal}
                footer={null}
              >
                      <img className=" absolute" src="/assets/images/GroupCircle.png" alt="Modal Image" />
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
                    className=" ml-[45px] w-[100px] "
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                
                    <a onClick={(e) => e.preventDefault()}>
                      <div className="text-[#ffffff] font-semibold flex  overflow-ellipsis justify-between">
                        {/* {userDetails?.userName} */}
                        <p  className=" overflow-ellipsis">{userDetails.userName}</p>
                        <DownOutlined  className="" />
                      </div>
                    </a>
                  </Dropdown>
                </div>
                <img
                  alt=""
                  className="w-[50px] h-[50px] rounded-[50%] ml-[-20px] mt-[-2px]  absolute"
                  // src={userDetails?.profileImage || null}
                  src={userDetails.profileImage}
                />
              </div>
            </div>
          </div>
        </Header>
        <div>
          
          {showUser && <AllUsers />}
          {activeUser && <ActiveUsers />}
          {inActiveUser && <InActiveUsers />}
          {addPayment && <AddPayment handlePaymentCard={handlePaymentCard} />}
          {paymentCard && <PaymentCard />}
          {userSubscription && <UserSubscription />}
          {profileView && <ProfileView />}
          {card && <Cards />}
          {!showUser &&
            !activeUser &&
            !inActiveUser &&
            !addPayment &&
            !paymentCard &&
            !userSubscription &&
            !profileView &&
            !card &&
            userDetails.userRole == 1 && <Cards />}
        </div>
        {/* <div className="">
          {showUser && <AllUsers />}
          {activeUser && <ActiveUsers />}
          {inActiveUser && <InActiveUsers />}
          {addPayment && <AddPayment />}
          {paymentCard && <PaymentCard />}
          {userSubscription && <UserSubscription />}
          {profileView && <ProfileView  />}
          {card && <Cards />}
   
        </div> */}
      </Layout>
    </div>
  );
};
export default App;
