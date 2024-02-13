// const onChange = async (checked, userId) => {
//     console.log("userId", userId);
//     try {
//       const token = Cookies.get("apiToken");
//       const response = await fetch(
//         `https://mksm.blownclouds.com/api/all/user?userId=${userId}&isActives=${checked ? 'active' : 'inactive'}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const updatedUsers = inActiveUser.map(user => {
//           if (user.id === userId) {
//             return { ...user, isActives: checked ? "1" : "0" }; // Update the active/inactive status
//           }
//           return user;
//         });
//         setInActiveUser(updatedUsers);
//         setSelectedUserId(userId);
//         message.success(`User set to ${checked ? 'active' : 'inactive'} successfully`);
//       } else {
//         message.error("Failed to update user status");
//       }
//     } catch (error) {
//       console.error("Error updating user status: ", error);
//       message.error("An error occurred while updating user status");
//     }
// };











// <h1 className="text-white font-bold   flex justify-center  min-h-screen">
// <Form
//   className="absolute top-[50%] left-[81%] transform -translate-x-1/2 -translate-y-1/2"
//   name="basic"
//   labelCol={{
//     span: 8,
//   }}
//   wrapperCol={{
//     span: 16,
//   }}
//   style={{
//     maxWidth: 445,
//   }}
//   initialValues={{
//     remember: true,
//   }}
//   onFinish={onFinish}
//   onFinishFailed={onFinishFailed}
//   autoComplete="off"
// >
//   <h1 className="w-[100%] ml-[-75px] text-white text-[30px] flex justify-center text-center">
//     Login
//   </h1>
//   <Form.Item
//     className="w-[450px]"
//     name="email"
//     rules={[
//       {
//         required: true,
//         message: (
//           <span style={{ color: "white" }}>
//             Please input your email!
//           </span>
//         ),
//       },
//     ]}
//   >
//     <Input
//       placeholder="Email address"
//       className="rounded-l-[20px] rounded-r-[20px]"
//     />
//   </Form.Item>

//   <Form.Item
//     className="w-[450px] "
//     name="password"
//     rules={[
//       {
//         required: true,
//         message: (
//           <span style={{ color: "white" }}>
//             Please input your password!
//           </span>
//         ),
//       },
//     ]}
//   >
//     <Input.Password
//       placeholder="Password"
//       className="rounded-l-[20px] rounded-r-[20px]"
//     />
//   </Form.Item>

//   <Form.Item
//     className="fex justify-start w-full mt-[-15px] tex"
//     name="rem ember"
//     valuePropName="checked"
//     // wrapperCol={{
//     //   offset: 8,
//     //   span: 16,
//     // }}
//   >
//     <Checkbox className="text-white">Remember me</Checkbox>
//   </Form.Item>

//   <Form.Item
//     wrapperCol={{
//       offset: 4,
//       span: 14,
//     }}
//   >
//     <Button
//       type="enter"
//       className="bg-[#F3585E] !text-white border-none rounded-l-[20px] rounded-r-[20px] w-[150px]"
//       htmlType="submit"
//       loading={loading}
//     >
//       Login
//     </Button>
//   </Form.Item>
// </Form>
// </h1>