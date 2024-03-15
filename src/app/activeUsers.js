"use client";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Table, message, Divider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserProfile from "./userProfile";
import axios from "axios";
const ActiveUsers = () => {
  const [activeUser, setActiveUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [switchAnimationCompleted, setSwitchAnimationCompleted] = useState(
    true
  );
console.log(selectedUserId, "============sdbnesd=================")
  const columns = [
    { title: "Sr", dataIndex: "serialNumber", key: "serialNumber" },

    { title: "Name", dataIndex: "name", key: "userName" },
    { title: "Email", dataIndex: "address", key: "emailAddress" },
    { title: "Phone No:", dataIndex: "contact", key: "Phone" },
    {
      title: "Status",
      dataIndex: "isActives",
      key: "isActives",
      render: (_, record) => (
        <Switch
          checked={record.isActives === "1"}
          defaultChecked={record.isActives == selectedUserId}
          onChange={(checked) => onChange(checked, record.id)}
          // onAnimationEnd={() => setSwitchAnimationCompleted(true)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, record) => (
        <div>
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const token = Cookies.get("apiToken");
  //       const response = await fetch(
  //         "https://mksm.blownclouds.com/api/active/users",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         const responseData = await response.json();
  //         console.log("Doctors fetched successfully:", responseData);

  //         if (Array.isArray(responseData?.active_users?.data)) {
  //           setActiveUser(responseData.active_users.data);
  //         } else {
  //           console.error(
  //             "API response does not contain an array for 'doctor'"
  //           );
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const fetchItems = async (page) => {
    setIsLoading(true);
    try {
      const token = Cookies.get("apiToken");
      const response = await axios.get(
        `https://mksm.blownclouds.com/api/active/users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(response.data.active_users.data);
      setTotalPages(Math.ceil(response.data.total / response.data.per_page));
      setCurrentPage(page);
      setUserData(response.data.active_users)
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * userData.per_page + index + 1;
  };

  const dataSource = (items || []).map((user, index) => ({
    serialNumber: calculateSerialNumber(index),
    key: user.id,
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
    id: user.id,
    isActives:user.isActives,
    profileImage: user.profileImage,
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
          const updatedUsers = items.filter((user) => user.id !== userId);
          console.log(updatedUsers, "++++++++++++++", userId);
          setItems(updatedUsers);

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
            pagination={false}
            loading={isLoading}
          />
          <div className="flex justify-end mb-[50px] mt-[20px] mr-[10px]">
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeftOutlined
                className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
                type="link"
              />
            </button>
            <span className="count">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={userData.next_page_url === null}
            >
              <ArrowRightOutlined
                className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
                type="link"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveUsers;
