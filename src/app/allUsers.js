"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, Input, Modal, Switch, Table, message } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import UserProfile from "./userProfile";
import { useUser } from "./UserContext";

const AllUsers = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allUserData, setAllUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(selectedUser);
  const { userData } = useUser();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      if (!selectedUser) {
        console.error("No user selected for deletion");
        return;
      }
  
      const token = Cookies.get("apiToken");
      await axios.delete(
        `https://mksm.blownclouds.com/api/delete-user/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Filter out the deleted user from items
      setItems(items.filter((user) => user.id !== selectedUser.id));
      handleCancel();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const fetchItems = async (page) => {
    setIsLoading(true);
    try {
      const token = Cookies.get("apiToken");
      const response = await axios.get(
        `https://mksm.blownclouds.com/api/all/user?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(response.data.all_users.data);
      setAllUserData(response.data.all_users);
      setCurrentPage(page);
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
    return (currentPage - 1) * allUserData.per_page + index + 1;
  };

  const columns = [
    { title: "Sr", dataIndex: "serialNumber", key: "serialNumber" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No:", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive === "1"}
          // onChange={(checked) => handleChangeStatus(record, checked)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div>
          <DeleteOutlined
            className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
            danger
            onClick={() => {
              setSelectedUser(record);
              showModal();
            }}
          />

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

  const dataSource = (items || []).map((doctor, index) => ({
    key: doctor.id,
    serialNumber: calculateSerialNumber(index),
    name: doctor.userName,
    email: doctor.emailAddress,
    phone: doctor.contact,
    isActive: doctor.isActives,
    id: doctor.id,
  }));

  const filteredData = dataSource.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchText.toLowerCase())
  );

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
            <h1 className="Doctors text-[22px] font-sans">All Users</h1>
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
            loading={isLoading}
            pagination={false}
          />

          <div className="flex justify-end mb-[50px] mt-[20px] mr-[10px]">
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
              disabled={!allUserData.next_page_url}
            >
              <ArrowRightOutlined
                className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
                type="link"
              />
            </button>
          </div>
          <Modal
            style={{ width: "534px", height: " 369px" }}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <div className="gap-2 flex justify-center items-center flex-col h-[250px]">
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
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                className="!text-[#F24044] rounded-l-[20px] rounded-r-[20px] w-[150px] h-[40px]"
                onClick={handleCancel}
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

export default AllUsers;
