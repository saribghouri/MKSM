import { Button, Card, Divider } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ProfileEdit from "./profileEdit";
import { useUser } from "./UserContext";
import Cookies from "js-cookie";
const ProfileView = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState([]);
  const [forceRerender, setForceRerender] = useState(false);

  console.log("userDetails", userDetails);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mksm.blownclouds.com/api/user/details",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("🚀 ~ data:", data);
          // setImageUrl(data?.user_details[0]?.profileImage);
          setUserDetails(data["user_details"][0]);
          setForceRerender((prev) => !prev);
        } else {
          console.error(
            "Failed to fetch user details:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, []);
  console.log("user", user);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <ProfileEdit user={userDetails} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
        
          <div className="flex  flex-col   pl-[10px] pr-[10px] ml-[16px] mr-[56px]  mt-[20px] mb-[20px]">
            <img
              alt=""
              className="w-[130px] h-[130px] rounded-[50%] top-[-100px]  "
              src={userDetails?.profileImage || null}
              // src="assets/images/download.jfif"
            />
            <div className="flex justify-between ">
              <h1 className=" mt-[50px] ml-[10px] text-[#F24044] font-[700] text-[24px]">
                {userDetails.userName}
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
                <div className="flex flex-col gap-6 text-[#F3585E] w-[20%] ">
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
                    {userDetails.emailAddress}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                    {userDetails.contact}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                    {userDetails.gender}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                    {userDetails.dob}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                    {userDetails.company}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                    {userDetails.collage}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                    {userDetails.location}
                  </p>
                  <p className="text-[15px] font-[500] text-[#a39d9d]">
                    {userDetails.about}
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
