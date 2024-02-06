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
import UserProfile from "./userProfile";
const ActiveUsers = () => {
  const [activeUser, setActiveUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  console.log(selectedUserId);
  const userId = activeUser.id;
  console.log(activeUser);
  const columns = [
    { title: "Sr", dataIndex: "key", key: "serialNumber" },
   
    { title: "Name", dataIndex: "name", key: "userName" },
    { title: "Email", dataIndex: "address", key: "emailAddress" },
    { title: "Phone No:", dataIndex: "contact", key: "Phone" },
    {
      title: "Status",
      dataIndex: "isActives",
      key: "isActives",
      render: (_, record) => (
        <Switch
          defaultChecked={record.isActives !== selectedUserId}
          onChange={(checked) => onChange(checked, record.id)}
        />
      ),
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
            onClick={() => {
              setSelectedUser(record);
              setIsEditing(true);
            }}
          />
        </div>
      ),
    },
  ];

  // const onChange = (checked) => {
  //   console.log(`switch to ${checked}`);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mksm.blownclouds.com/api/active/users",
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

          if (Array.isArray(responseData?.active_users?.data)) {
            setActiveUser(responseData.active_users.data);
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

  const dataSource = (activeUser || []).map((user, index) => ({
    key: index.toString(),

    name: user.userName,
    contact: user.contact,
    address: user.emailAddress,
    about: user.about,
    dob: user.dob,
    company: user.company,
    gender: user.gender,
    collage: user.collage,
    location: user.location,
    job: user.job,
    id: user.id ,
    profileImage: user.profileImage ,
  }));
  const filteredData = dataSource.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doctor.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const onChange = async (checked, userId) => {
    console.log("userId", userId);
    if (!checked) {
      try {
        const token = Cookies.get("apiToken");
        const response = await fetch(
          `https://mksm.blownclouds.com/api/all/user?userId=${userId}&isActives=inactive`,
          {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // Remove the user from the list
          const updatedUsers = activeUser.filter((user) => user.id !== userId);
          setActiveUser(updatedUsers);

          // Save the selected user id to the state
          setSelectedUserId(userId);
          message.success("User set to inactive successfully");
          console.log("Failed to reject pharmacy. Status:", updatedUsers);
        } else {
          // Handle errors
          message.error("Failed to update user status");
        }
      } catch (error) {
        console.error("Error updating user status: ", error);
        message.error("An error occurred while updating user status");
      }
    }
  };
  return (
    <div>
      {isEditing ? (
        <UserProfile
          user={selectedUser}
          onCancel={() => setSelectedUser(null)}
        />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
            <h1 className="Doctors text-[22px] font-sans">Active Users</h1>
            <Input
              className="w-[300px] rounded-[40px]"
              placeholder="Search"
              suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default ActiveUsers;
