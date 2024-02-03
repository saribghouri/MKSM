"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Input,
  Table,
  Modal,
  Form,
  Button,
  message,
  Popconfirm,
  Divider,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
const UserSubscription = () => {
  const [userSubs, setUserSubs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(userSubs);
  const showModal = () => {
    setIsModalVisibles(true);
  };

  const handleOk = () => {
    setIsModalVisibles(false);
  };

  const handleCancel = () => {
    setIsModalVisibles(false);
  };

  const columns = [
    { title: "Sr", dataIndex: "key", key: "serialNumber" },
    { title: "Name", dataIndex: "name", key: "userName" },
    { title: "Email", dataIndex: "email", key: "emailAddress" },
    { title: "subscription", dataIndex: "subscriptionDetails", key: "Phone" },
    {
      title: "subscriptionPrice",
      dataIndex: "subscriptionPrice",
      key: "Phone",
    },

    {
      title: "Action",
      dataIndex: "id",

      key: "action",
      render: (id, record) => (
        <div>
          {/* <DeleteOutlined
            className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
            danger
            onClick={showModal}
          /> */}

          <EyeOutlined
            className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
            onClick={() => handleView(record)}
          />
        </div>
      ),
    },
  ];

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalVisible(true);
  };

  const handleSave = async (values) => {
    try {
      setLoading(true);
      const token = Cookies.get("apiToken");
      const userId = selectedDoctor.id;

      const response = await fetch(
        `https://mymedjournal.blownclouds.com/api/users/edituser/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor.id === selectedDoctor.id ? { ...doctor, ...values } : doctor
          )
        );
        message.success("User edited successfully");
        setLoading(false);
      } else {
        console.error("Failed to edit user");
        message.error("Failed to edit user");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = Cookies.get("apiToken");

      const response = await fetch(
        `https://mymedjournal.blownclouds.com/api/delete-user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        message.success("Doctor deleted successfully");
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor.id !== userId)
        );
      } else {
        console.error("Failed to delete user");
        message.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
    setIsViewModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mksm.blownclouds.com/api/users/subscription",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Doctors fetched successfully:", responseData);

          if (Array.isArray(responseData?.all_subscription_users?.data)) {
            setUserSubs(responseData.all_subscription_users.data);
          } else {
            console.error(
              "API response does not contain an array for 'doctor'"
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dataSource = (userSubs || []).map((userSubs, index) => ({
    key: index.toString(),
    name: userSubs.userName,
    subscriptionDetails: userSubs.subscriptionDetails,
    email: userSubs.userEmail,
    subscriptionPrice: userSubs.subscriptionPrice,
  }));
  const filteredData = dataSource.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doctor.subscriptionDetails
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
        <h1 className="Doctors text-[22px] font-sans">User Subscription</h1>
        <Input
          className="w-[300px] rounded-[40px]"
          placeholder="Search"
          suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

      <Table columns={columns} dataSource={filteredData} loading={loading} />

      <Modal
        style={{
          width: "534px",
          height: " 369px",
        }}
        open={isModalVisibles}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <div className=" gap-2 flex justify-center items-center flex-col h-[250px]">
          <DeleteOutlined
            className=" flex justify-center items-center text-[#ffffff] w-[85px] h-[85px] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[50px]"
            type="link"
            danger
            onClick={showModal}
          />

          <h1 className="font-bold text-[22px]">User Delete</h1>
          <p className="text-black text-[16px]">
            Are you sure you want to delete this user?
          </p>
          <Button
            className="bg-[#F24044] !text-white rounded-l-[20px] w-[150px] rounded-r-[20px] h-[40px]"
            onClick={() => {}}
          >
            Delete
          </Button>
          <Button
            className="!text-[#F24044] rounded-l-[20px] rounded-r-[20px] w-[150px] h-[40px]"
            onClick={() => {
              handleCancel;
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserSubscription;
