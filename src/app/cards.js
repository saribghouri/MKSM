"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Cards = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const cardData = [
  //   {
  //     backgroundImage: "/assets/images/Group.png",
  //     backgroundColor: "#ffffff",
  //     textBackgroundColor: "#e1edff",
  //     textColor: "#fcfffc",
  //     textName: "Basic",
  //     count: 615,
  //     label: "User Receipt",
  //   },
  //   {
  //     backgroundImage: "/assets/images/red.png",
  //     backgroundColor: "#e1edff",
  //     textBackgroundColor: "#ffffff",
  //     textColor: "#fcfffc",
  //     textName: "Standard",
  //     count: 615,
  //     label: "User Receipt",
  //   },
  //   {
  //     backgroundImage: "/assets/images/gray.png",
  //     backgroundColor: "none",
  //     textBackgroundColor: "#ffffff",

  //     textColor: "#fcfffc",
  //     textName: "Premium",
  //     count: 615,
  //     label: "User Receipt",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mksm.blownclouds.com/api/dashboard/cards",
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

          if (Array.isArray(responseData?.data)) {
            setCardData(responseData.data);
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

  return (
    <div className="flex flex-wrap  justify-center lg:justify-start w-[100%] mt-[20px]">
      {cardData.map((card, index) => {
        let backgroundImage;
        switch (card.type) {
          case "Standard":
            backgroundImage = "/assets/images/red.png";
            break;
          case "Premium":
            backgroundImage = "/assets/images/gray.png";
            break;
            case "Basic":
              backgroundImage = "/assets/images/Group.png";
          default:
          
            
        }
        return (
          <div
            key={index}
            className="w-[326px] 2xl:w-[425px] 2xl:mx-12 2xl:min-h-[230px] 2xl:max-h-full  overflow-hidden m-2  rounded-[20px]"
            style={{
              borderBottomRightRadius: "30px",
              borderBottomLeftRadius: "30px",
              height: "234px",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="ml-[50px] mt-[30px]">
              <p
                className={`text-${card.textColor} text-white pgh font-bold text-[24px] `}
              >
                {card.type}
              </p>
              <p
                className={`text-${card.textColor} flex text-white  text-[24px] font-bold text-30`}
              >
                {card.count}
              </p>
              <p
                className= "flex  Receipt  text-[24px] font-bold text-30 "
              >
                User Receipt
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
