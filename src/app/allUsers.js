"use client";
import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Modal, Switch, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import UserProfile from "./userProfile";
import Cookies from "js-cookie";
import { useUser } from "./UserContext";
const AllUsers = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const { userData } = useUser();
  console.log("UserData",userData)
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
        // Refresh the user list or perform any necessary actions after deletion
        // For example, you can refetch the data by calling the fetchData function
        // fetchData();
        // handleCancel(); // Close the modal after successful deletion
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
      message.error("Error deleting user");
    }
  };

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
        <>
          {record.isActives === "1" ? (
            // <Switch defaultChecked onChange={onChange} />
            <p></p>
          ) : (
            <Switch defaultChecked onChange={onChange} />
          )}
        </>
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mksm.blownclouds.com/api/all/user",
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

          if (Array.isArray(responseData?.all_users?.data)) {
            setDoctors(responseData.all_users.data);
            userData(responseData.all_users.data)
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

  const dataSource = (doctors || []).map((doctor, index) => ({
    key: index.toString(),
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
    id: doctor.id ,
    
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
                onClick={handleDelete}
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

export default AllUsers;
