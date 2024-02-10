"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const cardData = [
  {
    backgroundImage: "/assets/images/Group.png",
    backgroundColor: "#ffffff",
    textBackgroundColor: "#e1edff",
    textColor: "#fcfffc",
    textName: "Basic",
    count: 615,
    label: "User Receipt",
  },
  {
    backgroundImage: "/assets/images/red.png",
    backgroundColor: "#e1edff",
    textBackgroundColor: "#ffffff",
    textColor: "#fcfffc",
    textName: "Standard", 
    count: 615,
    label: "User Receipt",
  },
  {
    backgroundImage: "/assets/images/gray.png",
    backgroundColor: "none",
    textBackgroundColor: "#ffffff",

    textColor: "#fcfffc",
    textName: "Premium",
    count: 615,
    label: "User Receipt",
  },
];

const Cards = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("cardData", cardData);

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
    <div className="flex flex-wrap justify-center  w-[100%]  mt-[20px]">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="max-w-xs overflow-hidden  m-2 w-[30%] rounded-[20px]"
          style={{
            width: "62%",
            height: "234px",
            backgroundImage: `url('/assets/images/Group.png')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="ml-[30px] mt-[25px]">
            <p
              className={`text-${card.textColor} text-white pgh font-bold text-[24px]`}
            >
              {card.type}
            </p>
            <p
              className={`text-${card.textColor} flex text-white  text-[24px] font-bold text-30`}
            >
              {card.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
