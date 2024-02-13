"use client";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
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
import UserSubView from "./userSubView";
import axios from "axios";
const UserSubscription = () => {
  const [userSubs, setUserSubs] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
            onClick={() => {
              setSelectedUser(record);
              setIsEditing(true);
            }}
            className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
          />
        </div>
      ),
    },
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const token = Cookies.get("apiToken");
  //       const response = await fetch(
  //         "https://mksm.blownclouds.com/api/users/subscription",
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

  //         if (Array.isArray(responseData?.all_subscription_users?.data)) {
  //           setUserSubs(responseData.all_subscription_users.data);
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
    setLoading(true);
    try {
      const token = Cookies.get("apiToken");
      const response = await axios.get(
        `https://mksm.blownclouds.com/api/users/subscription?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(response?.data?.all_subscription_users?.data || []);
      setCurrentPage(page);
      setTotalPages(Math.ceil(response?.all_subscription_users?.data / response.data.per_page));
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const dataSource = (items || []).map((userSubs, index) => ({
    key: (index + 1).toString(), 
    name: userSubs.userName,
    subscriptionDetails: userSubs.subscriptionDetails,
    email: userSubs.userEmail,
    subscriptionPrice: userSubs.subscriptionPrice,
    about: userSubs.about,
    collage: userSubs.collage,
    company: userSubs.company,
    dob: userSubs.dateOfBrith,
    job: userSubs.job,
    location: userSubs.location,
    profileImage: userSubs.profileImage,
    gender: userSubs.gender,
    contact: userSubs.contact,
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
      {isEditing ? (
        <UserSubView
          user={selectedUser}
          onCancel={() => setSelectedUser(null)}
        />
      ) : (
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

          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            pagination={false}
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
              disabled={currentPage === totalPages}
            >
              <ArrowRightOutlined
                className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
                type="link"
              />
            </button>
          </div>

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
      )}
    </div>
  );
};

export default UserSubscription;
