import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const PaymentCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null); // Add state to track which subscription is being edited

  const handleEditButtonClick = (subscriptionId) => {
    setIsModalVisible(true);
    setEditingSubscriptionId(subscriptionId);
    const subscriptionToEdit = subscriptions.find(
      (sub) => sub.id === subscriptionId
    );
    form.setFieldsValue({
      Name: subscriptionToEdit.Name,
      price: subscriptionToEdit.price,
      months: subscriptionToEdit.months,
      details: subscriptionToEdit.details,
    });
  };
  const handleDelete = async (subscriptionId) => {
    setIsDeleteModalVisible(true);
    setEditingSubscriptionId(subscriptionId);
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false);
    setEditingSubscriptionId(null);
    form.resetFields();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mksm.blownclouds.com/api/all/subscription",
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

          if (Array.isArray(responseData?.all_subscription?.data)) {
            setSubscriptions(responseData.all_subscription.data);
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
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const token = Cookies.get("apiToken");
      const url = editingSubscriptionId
        ? `https://mksm.blownclouds.com/api/all/subscription/${editingSubscriptionId}`
        : "https://mksm.blownclouds.com/api/all/subscription";
      const method = editingSubscriptionId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Subscription saved successfully:", responseData);
        // Update the subscriptions state with the new values
        const updatedSubscriptions = subscriptions.map((subscription) =>
          subscription.id === editingSubscriptionId
            ? { ...subscription, ...values }
            : subscription
        );
        setSubscriptions(updatedSubscriptions);
        // Close the modal after saving
        handleModalCancel();
      } else {
        console.error("Failed to save subscription. Status:", response.status);
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onDeleteConfirmed = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("apiToken");
      const response = await fetch(
        `https://mksm.blownclouds.com/api/all/subscription/${editingSubscriptionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setSubscriptions(
          subscriptions.filter(
            (subscription) => subscription.id !== editingSubscriptionId
          )
        );
        handleModalCancel();
        console.log(
          `Subscription with id ${editingSubscriptionId} deleted successfully.`
        );
      } else {
        console.error(
          `Failed to delete subscription with id ${editingSubscriptionId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        `Error deleting subscription with id ${editingSubscriptionId}: `,
        error
      );
    } finally {
      setLoading(false);
      setIsModalVisible(false); // Close the modal after deletion
      setEditingSubscriptionId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
        <h1 className="text-[22px] mb-[-10px] font-sans">Add Payment</h1>
      </div>
      <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

      <div className=" flex relative flex-wrap W-[100%]  justify-center mt-8">
        {" "}
        {subscriptions.map((subscription, index) => (
          <Card
            key={index}
            className="max-w-xs overflow-hidden justify-center m-2 rounded-[20px] bg-[#F24044]"
            bordered={false}
          >
            <img
              className="absolute w-[40%]"
              src="/assets/images/Group 20 (1).png"
              alt="Modal Image"
            />

            <div className="text-center">
              <span className="text-white text-[24px] font-semibold mb-4 inline-block">
                {subscription.Name}
              </span>
            </div>
            <div className="flex justify-between w-[100%] mx-auto mb-[20px]">
              <div className="w-[100%] text-center">
                <p className="text-[#ffffff] font-bold text-[26px] break-words">
                  ${subscription.price}
                </p>
              </div>
              <div>
                <Divider
                  className="bg-white h-[36px] mt-[10px] mb-[10px]"
                  type="vertical"
                />
              </div>
              <div className="w-[100%] text-center">
                <p className="text-[#ffffff] font-bold text-[26px] break-words">
                  {subscription.months}
                </p>
              </div>
            </div>
            <Divider className="w-[100%] h-[3px] text-[#e3e1e1] flex justify-center mx-auto bg-[#dddbdb] min-w-2" />

            <div className="w-[100%]">
              <p className="text-white text-start">
                {subscription.details.length > 100
                  ? `${subscription.details.slice(0, 100)}...`
                  : subscription.details}
                  {/* {subscription.details} */}
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4 gap-6">
              <Button
                className="text-white w-[109px] bg-[#F3585E] border-none text-center items-center font-bold rounded-full"
                onClick={() => handleEditButtonClick(subscription.id)}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(subscription.id)}
                className="text-white bg-[#F3585E] w-[109px] border-none font-bold rounded-full"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
        <Modal
          className=" relative"
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <img
            className=" absolute"
            src="/assets/images/GroupCircle.png"
            alt="Modal Image"
          />
          <Form
            form={form}
            name="changePasswordForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              userName: subscriptions.userName,
              price: subscriptions.price,
              month: subscriptions.month,
              details: subscriptions.details,
            }}
          >
            <div className="flex gap-0 flex-col  rounded-[10px]   w-[100%]  items-center">
              <p className="text-[22px] text-[#F3585E] Poppins font-[500] mb-[10px]">
                Add payment
              </p>
              <Form.Item
                className="mt-[10px]"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                  {
                    pattern: /^[a-zA-Z][a-zA-Z0-9\s]*$/,
                    message: (
                      <p className="text-[#F3585E]">
                        Name should start with alphabet only
                      </p>
                    ),
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Name"
                />
              </Form.Item>
              <Form.Item
                className="mt-[10px]"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please enter price",
                  },
                  {
                    pattern: /^(?!0+(\.0+)?$)(\d+(\.\d{1,})?|\.\d{1,})$/,
                    message: (
                      <p className="text-[#F3585E]">
                        Please enter a valid amount
                      </p>
                    ),
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Enter price"
                  type="number"
                />
              </Form.Item>

              <Form.Item
                className="mt-[10px] "
                name="months"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of days",
                  },
                  {
                    pattern: /^(?=.*[1-9])\d+$/,
                    message: (
                      <p className="text-[#F3585E]">
                        Please enter a valid number for days
                      </p>
                    ),
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Enter Month"
                  type="number"
                />
              </Form.Item>
              <Form.Item
                className="mt-[10px]"
                name="details"
                rules={[
                  {
                    required: true,
                    message: "Please details",
                  },
                ]}
              >
                <TextArea
                  placeholder="Enter Subscription"
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  rows={4}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="bg-[#F3585E] !border-none w-[150px] !text-white rounded-r-[20px] rounded-l-[20px]"
                  htmlType="submit"
                >
                  save
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
        <Modal
          style={{
            width: "534px",
            height: " 369px",
          }}
          open={isDeleteModalVisible}
          footer={null}
          onCancel={handleModalCancel}
        >
          <div className=" gap-2 flex justify-center items-center flex-col h-[250px]">
            <DeleteOutlined
              className=" flex justify-center items-center text-[#ffffff] w-[85px] h-[85px] bg-[#F3585E] p-[5px] rounded-[50%] ml-[10px] text-[50px]"
              type="link"
              danger
            />

            <h1 className="font-bold text-[22px]">Subscription Delete</h1>
            <p className="text-black text-[16px]">
              Are you sure you want to delete this Subscription?
            </p>
            <Button
              className="bg-[#F24044] !text-white rounded-l-[20px] w-[150px] rounded-r-[20px] h-[40px]"
              onClick={onDeleteConfirmed}
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
    </div>
  );
};

export default PaymentCard;
