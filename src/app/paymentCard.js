import { Button, Card, Divider, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const cardData = [
  {
    type: "Basic",
    amount: "$400",
    month: "Feb",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used READ MORE...",
  },
  {
    type: "Standard",
    amount: "$400",
    month: "Feb",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used READ MORE...",
  },
  {
    type: "Premium",
    amount: "$400",
    month: "Feb",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used READ MORE...",
  },
];

const PaymentCard = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const handleEditButtonClick = () => {
      
      setIsModalVisible(true);
    };
  
    const handleModalCancel = () => {

      setIsModalVisible(false);
    }
    
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex flex-wrap gap-[10px] w-[100%] mx-auto justify-center mt-[20px]">
      {cardData.map((card, index) => (
        <Card
  key={index}
  className="card object-contain"
  style={{
    width: "30%",
    backgroundSize: "cover",
    backgroundImage: `url('/assets/images/cardbg.png')`,
    backgroundRepeat: "no-repeat",
  }}
>
          <p className="text-[#ffffff] pgh text-center text-[26px]">{card.type}</p>
          <div className="flex justify-between w-[60%] mx-auto">
            <p className="text-[#ffffff] pgh font-bold text-[26px]">{card.amount}</p>
            <Divider className="bg-white h-[36px] w-[2%] mt-[10px] mb-[10px]" type="vertical" />
            <p className="text-[#ffffff] pgh font-bold text-[26px]">{card.month}</p>
          </div>
          <Divider className="bg-[#e6e3e3] mt-[8px] mb-[8px] h-[3px] w-[2%]" />
          <p className="text-[#ffffff]">{card.description}</p>
          <div className="flex justify-center gap-[20px]">
          <Button
              className="w-[109px] bg-[#F3585E] border-none !text-white rounded-r-[20px] rounded-l-[20px]"
              onClick={handleEditButtonClick} 
            >
              Edit
            </Button>
            <Button className="w-[109px] bg-[#F3585E] border-none !text-white rounded-r-[20px] rounded-l-[20px]">
              Delete
            </Button>
          </div>
        </Card>
      ))}
       <Modal
     
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
     
          <Form
            form={form}
            name="changePasswordForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div
              className="flex gap-0 flex-col  rounded-[10px] w-[100%]  justify-center items-center"
            
            >
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
  );
};

export default PaymentCard;
