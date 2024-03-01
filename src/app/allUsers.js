"use client";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input, Modal, Switch, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import UserProfile from "./userProfile";
import Cookies from "js-cookie";
import { useUser } from "./UserContext";

import axios from "axios";
const AllUsers = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allUserData, setAllUserData] = useState(1);
  const [totalPages, setTotalPages] = useState(true);
  const [afterPages, setAfterPages] = useState(true);
  console.log(totalPages);
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useUser();
  console.log("UserData", items);
  const showModal = () => {
    setIsModalVisibles(true);
  };

  const handleOk = () => {
    setIsModalVisibles(false);
  };

  const handleCancel = () => {
    setIsModalVisibles(false);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  // const fetchData = async () => {
  //   try {
  //     setLoading(true);

  //     const token = Cookies.get("apiToken");
  //     const response = await fetch(
  //       "https://mksm.blownclouds.com/api/all/user",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log("Doctors fetched successfully:", responseData);

  //       if (Array.isArray(responseData?.all_users?.data)) {
  //         setDoctors(responseData.all_users.data);
  //         userData(responseData.all_users.data);
  //       } else {
  //         console.error("API response does not contain an array for 'doctor'");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  //   useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const token = Cookies.get("apiToken");
  //       const response = await fetch(
  //         "https://mksm.blownclouds.com/api/all/user",
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

  //         if (Array.isArray(responseData?.all_users?.data)) {
  //           setDoctors(responseData.all_users.data);
  //           userData(responseData.all_users.data)
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

  const handleDelete = async () => {
    try {
      const token = Cookies.get("apiToken");
      const userIdToDelete = selectedUser.id;

      const response = await fetch(
        `https://mksm.blownclouds.com/api/delete-user/${userIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("User deleted successfully");
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor.id !== selectedUser.id)
        );
        handleCancel();
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
      message.error("Error deleting user");
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
      setCurrentPage(page);
      setAllUserData(response.data.all_users)
      setTotalPages(
        Math.ceil(response.data.all_users.total / response.data.per_page)
      );
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const columns = [
    { title: "Sr", dataIndex: "key", key: "serialNumber" },
    { title: "Name", dataIndex: "name", key: "userName" },
    { title: "Email", dataIndex: "address", key: "emailAddress" },
    { title: "Phone No:", dataIndex: "contact", key: "Phone" },
    {
      title: "Status",
      dataIndex: "isActives",
      key: "isActives",
      render: (isActives, record) => (
        <Switch
          checked={isActives === "1"}
          onChange={(checked) => handleChangeStatus(record, checked)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, record) => (
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
    key: (index + 1).toString(),
    name: doctor.userName,
    contact: doctor.contact,
    address: doctor.emailAddress,
    about: doctor.about,
    dob: doctor.dob,
    company: doctor.company,
    gender: doctor.gender,
    collage: doctor.collage,
    location: doctor.location,
    job: doctor.job,
    id: doctor.id,
    profileImage: doctor.profileImage,
    isActives: doctor.isActives,
  }));
  const filteredData = dataSource.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doctor.address.toLowerCase().includes(searchText.toLowerCase())
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
            {items ? (
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={allUserData.next_page_url === null}
              >
                <ArrowRightOutlined
                  className="text-[#ffffff] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
                  type="link"
                />
              </button>
            ) : null}
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
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                className="!text-[#F24044] rounded-l-[20px] rounded-r-[20px] w-[150px] h-[40px]"
                onClick={() => {
                  handleCancel();
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

export default AllUsers;
