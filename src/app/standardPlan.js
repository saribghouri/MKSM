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


const StandardPlan = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);

  const showModal = () => {
    setIsModalVisibles(true);
  };

  const handleOk = () => {

    setIsModalVisibles(false);
  };

  const handleCancel = () => {
    setIsModalVisibles(false);
  };


  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "3",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  const columns = [
    { title: "Sr", dataIndex: "serialNumber", key: "serialNumber" }, // New column
    { title: "Name", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "emailAddress", key: "emailAddress" },
    { title: "Phone No:", dataIndex: "Phone No", key: "Phone" },
    {
      title: "Status",
      dataIndex: "isActives",
      key: "isActives",
      render: (_, record) => (
        <>
          {record.isActives === "1" ? (
            
            <Switch defaultChecked onChange={onChange} />
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
    
      <Table
        columns={columns}
  
        dataSource={dataSource}
      />
      <Modal
        open={isModalVisible}
        title="Edit Doctor"
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="custom-modal"
      >
        <EditUserForm doctor={selectedDoctor} onSave={handleSave} />
      </Modal>
 
      <Modal
        width={300}
        open={isViewModalVisible}
        title="View Doctor"
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        className="custom-modal text-center mb-[20px]"
      >
        {selectedDoctor && (
          <div className="w-full justify-center flex flex-col items-center">
            {selectedDoctor.profileImage && (
              <img
                className="flex justify-center  w-[100px] h-[100px] object-cover items-center rounded-[50%]"
                src={selectedDoctor.profileImage}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  marginBottom: 10,
                }}
                alt="Profile"
              />
            )}

            <div className="flex flex-col gap-[20px] mt-[20px]">
              <p className="flex justify-between items-center">
                <span className="font-bold mr-[110px] font">Name:</span>
                <p> {selectedDoctor.userName}</p>
              </p>

              <p className="flex justify-between items-center">
                <span className="font-bold mr-[50px] ">Email:</span>
                <p> {selectedDoctor.emailAddress}</p>
              </p>

              <p className="flex justify-between items-center">
                <span className="font-bold mr-[80px] ">Experience:</span>
                <p>{selectedDoctor.noOfExperience}</p>
              </p>

              <p className="flex justify-between items-center">
                <span className="font-bold mr-[60px] ">Specialization:</span>
                <p>{selectedDoctor.specialization}</p>
              </p>

              <p className="flex justify-between items-center">
                <span className="font-bold mr-[60px] ">age:</span>
                <p>{selectedDoctor.age}</p>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-bold mr-[60px] ">affiliationNo:</span>
                <p>{selectedDoctor.affiliationNo} </p>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-bold mr-[60px] ">Categories:</span>
                <p>{selectedDoctor.doctorCategoryName} </p>
              </p>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        style={{
          width: "534px",
          height: " 369px",
        }}
      
        open={isModalVisibles}
        onOk={handleOk}
        footer= {null}
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
        <p className="text-black text-[16px]">Are you sure you want to delete this user?</p>
        <Button className="bg-[#F24044] !text-white rounded-l-[20px] w-[150px] rounded-r-[20px] h-[40px]" onClick={() => {}}>Delete</Button>
        <Button className="!text-[#F24044] rounded-l-[20px] rounded-r-[20px] w-[150px] h-[40px]" onClick={() => {handleCancel}}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

const EditUserForm = ({ doctor, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(doctor);
  }, [doctor, form]);

  return (
    <Form form={form} layout="vertical" onFinish={(values) => onSave(values)}>
      <label className="mb-[5px] font-semi-bold text-[#868585] font ">
        UserName
      </label>
      <Form.Item name="userName" rules={[{ required: true }]}>
        <Input className="border" placeholder="userName" />
      </Form.Item>
      <label className="mb-[5px] font-semi-bold text-[#868585] font">
        AffiliationNo
      </label>
      <Form.Item name="affiliationNo" rules={[{ required: true }]}>
        <Input className="border" placeholder="affiliationNo" />
      </Form.Item>
      <label className="mb-[5px] font-semi-bold text-[#868585] font">
        Experience
      </label>
      <Form.Item name="noOfExperience" rules={[{ required: true }]}>
        <Input className="border" placeholder="noOfExperience" />
      </Form.Item>
      <label className="mb-[5px] font-semi-bold text-[#868585] font">
        Specialization
      </label>
      <Form.Item name="specialization" rules={[{ required: true }]}>
        <Input className="border" placeholder="specialization" />
      </Form.Item>
      <label className="mb-[5px] font-semi-bold text-[#868585] font">Age</label>
      <Form.Item name="age" rules={[{ required: true }]}>
        <Input className="border" placeholder="age" />
      </Form.Item>
      <label className="mb-[5px] font-semi-bold text-[#868585] font">
        Gender
      </label>
      <Form.Item name="gender" rules={[{ required: true }]}>
        <Input className="border" placeholder="gender" />
      </Form.Item>

      <Form.Item>   
        <Button
          className="bg-[#2361dd] !text-white text-center"
          htmlType="submit"
          // loading={loadingUpdateProfile}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StandardPlan;
