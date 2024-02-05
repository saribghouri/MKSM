import { Button, Card, Divider, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const cardData = [
  {
    type: "Basic",
    amount: "$400",
    month: "Feb",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used READ MORE...",
  },
  {
    type: "Standard",
    amount: "$400",
    month: "Feb",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used READ MORE...",
  },
  {
    type: "Premium",
    amount: "$400",
    month: "Feb",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used READ MORE...",
  },
];

const PaymentCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  console.log(subscriptions)
  const userId = subscriptions?.id
  console.log(userId)
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const handleEditButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
  const handleDelete = async (subscriptionId) => {
    try {
      setLoading(true);
      const token = Cookies.get("apiToken");
      const response = await fetch(
        `https://mksm.blownclouds.com/api/all/subscription/${subscriptionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        // If the delete was successful, filter out the deleted subscription
        setSubscriptions(
          subscriptions.filter(
            (subscription) => subscription.id !== subscriptionId
          )
        );
        console.log(
          `Subscription with id ${subscriptionId} deleted successfully.`
        );
      } else {
        // Handle non-successful response (e.g., display an error message)
        console.error(
          `Failed to delete subscription with id ${subscriptionId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        `Error deleting subscription with id ${subscriptionId}: `,
        error
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
        <h1 className="text-[22px] mb-[-10px] font-sans">Add Payment</h1>
      </div>
      <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

      <div className="flex flex-wrap gap-5 justify-center mt-8">
        {" "}
        {subscriptions.map((subscription, index) => (
          // <Card
          //   key={index}
          //   className="w-[30%] rounded-xl overflow-hidden shadow-lg bg-cover bg-no-repeat"
          //   style={{
          //     backgroundImage: `url('/assets/images/cardbg.png')`,
          //   }}
          //   bodyStyle={{ padding: "1rem" }}
          // >
          //   <div className="text-center">
          //     <span className="text-lg text-white bg-red-200 bg-opacity-50 rounded-full px-3 py-1 mb-4 inline-block">
          //       {subscription.Name}
          //     </span>
          //   </div>
          //   <div className="flex justify-between items-center text-white text-xl mb-4">
          //     <span className="font-bold">{subscription.price}</span>
          //     <div className="bg-white mx-2 w-px h-8"></div>
          //     <span className="font-bold">{subscription.months}</span>
          //   </div>
          //   <p className="text-white text-sm">{subscription.details}</p>
          //   <div className="flex justify-center space-x-4 mt-4">
          //     <button
          //       className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full"
          //       onClick={() => handleEditButtonClick(subscription.id)}
          //     >
          //       Edit
          //     </button>
          //     <button className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full">
          //       Delete
          //     </button>
          //   </div>
          // </Card>
          <Card
            className="max-w-sm rounded overflow-hidden shadow-lg text-center m-2 w-[30%] rounded-[20px]"
            bordered={false}
            hoverable
            style={{
              backgroundImage: `url('/assets/images/cardbg.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center">
              <span className="text-lg text-white bg-red-200 bg-opacity-50 rounded-full px-3 py-1 mb-4 inline-block">
                {subscription.Name}
              </span>
            </div>
            <div className="flex justify-between items-center text-white text-xl mb-4">
              <span className="font-bold">{subscription.price}</span>
              <div className="bg-white mx-2 w-px h-8"></div>
              <span className="font-bold">{subscription.months}</span>
            </div>
            <p className="text-white text-sm">{subscription.details}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full"
          onClick={() => handleEditButtonClick(subscription.id)}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(subscription.id)}
                className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full"
          >
                Delete
              </Button>
            </div>
          </Card>
        ))}
        <Modal open={isModalVisible} onCancel={handleModalCancel} footer={null}>
          <Form
            form={form}
            name="changePasswordForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="flex gap-0 flex-col  rounded-[10px] w-[100%]  justify-center items-center">
              <p className="text-[22px] text-[#F3585E] Poppins font-[500] mb-[10px]">
                Add payment
              </p>
              <Form.Item
                className="mt-[10px]"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please enter userName",
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
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please enter userName",
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Enter price"
                />
              </Form.Item>

              <Form.Item
                className="mt-[10px]"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please enter userName",
                  },
                ]}
              >
                <Input
                  className="w-[320px]  rounded-r-[20px] rounded-l-[20px]"
                  placeholder="Enter Month"
                />
              </Form.Item>
              <Form.Item>
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
      </div>
    </div>
  );
};

export default PaymentCard;
