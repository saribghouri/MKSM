import { Button, Card, Divider } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ProfileEdit from "./profileEdit";
import { useUser } from "./UserContext";

const ProfileView = () => {
  const router = useRouter();
  const { user } = useUser();
  console.log("user", user);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <ProfileEdit onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div>
            <Image
              width={1000}
              height={100}
              className="w-full"
              src={"/assets/images/Rectangle.png"}
              srcSet={"/assets/images/Rectangle@2x.png 2x"}
              alt=""
            />
          </div>
          <div className="flex  flex-col relative  pl-[10px] pr-[10px] ml-[16px] mr-[16px]  mt-[20px] mb-[20px]">
            <img
              alt=""
              className="w-[130px] h-[130px] rounded-[50%] top-[-100px] absolute "
              // src={userDetails?.profileImage || null}
              src="assets/images/download.jfif"
            />
            <div className="flex justify-between ">
              <h1 className=" mt-[50px] ml-[10px] text-[#F24044] font-[700] text-[24px]">
          {user.user.userName}
              </h1>

              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="!text-[#ffffff] bg-[#F24044] text-center flex items-center !border-none rounded-r-[20px] rounded-l-[20px] "
              >
                Edit Profile <EditFilled />
              </Button>
            </div>
          </div>

          <Divider className="!w-[95%] text-[#F24044] flex justify-center mx-auto bg-[#F24044] min-w-0" />

          <div className="flex flex-col relative pl-[10px] pr-[10px] ml-[16px] mr-[16px] mt-[20px] mb-[100px]">
            <Card className="w-[100%] ">
              <h1 className="text-[22px] font-[400] ml-[50px] text-[#F3585E] mb-[20px]">
                Details
              </h1>
              <div className=" flex gap-6 ml-[50px]">
                <div className="flex flex-col gap-6 text-[#F3585E] w-[10%] ">
                  {" "}
                  <p className="text-[14px] font-[500]">Email :</p>
                  <p className="text-[14px] font-[500]">Phone :</p>
                  <p className="text-[14px] font-[500]">Gender :</p>
                  <p className="text-[14px] font-[500]">Birth Date :</p>
                  <p className="text-[14px] font-[500]">Company :</p>
                  <p className="text-[14px] font-[500]">Collage :</p>
                  <p className="text-[14px] font-[500]">Location :</p>
                  <p className="text-[14px] font-[500]">About :</p>
                </div>
                <div className="flex flex-col gap-6">
                  {" "}
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                {  user.user.emailAddress}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                { user.user.contact}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">{user.user.gender}</p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                  {user.user.dob}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                  {user.user.company}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                  {user.user.collage}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                  {user.user.location}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                  {user.user.about}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
