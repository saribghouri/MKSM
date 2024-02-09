"use client";

import Card from "antd/es/card/Card";

import Image from "next/image";
const cardData = [
  {
    backgroundImage: "/assets/images/Group.png",
    backgroundColor: "#ffffff",
    textBackgroundColor: "#e1edff",
    textColor: "#fcfffc",
    count: 615,
    label: "User Receipt",
  },
  {
    backgroundImage: "/assets/images/red.png",
    backgroundColor: "#e1edff",
    textBackgroundColor: "#ffffff",
    textColor: "#fcfffc",
    count: 615,
    label: "User Receipt",
  },
  {
    backgroundImage: "/assets/images/gray.png",
    backgroundColor: "none",
    textBackgroundColor: "#ffffff",
    textColor: "#fcfffc",
    count: 615,
    label: "User Receipt",
  },
];
const Cards = () => {
  return (
    <div className="flex flex-wrap  w-[100%]  mt-[20px]">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`bg-${card.backgroundColor} card`}
          style={{
            width: "32%",
            height: "234px",
            backgroundImage: `url('${card.backgroundImage}')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="ml-[30px] mt-[25px]">
            <p
              className={`text-${card.textColor} text-white pgh font-bold text-[24px]`}
            >
              Basic
            </p>
            <p
              className={`text-${card.textColor} flex text-white  text-[24px] font-bold text-30`}
            >
              {card.count}
            </p>
            {/* <p
              className={`text-${card.textBackgroundColor} text-white  flex font-bold text-30`}
            >
              {card.label}
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
