"use client";

import Card from "antd/es/card/Card";

import Image from "next/image";

const Cards = () => {
  return (
    <div className="flex flex-wrap  w-[100%] mx-auto justify-center mt-[20px]">
      <Card
        className="card object-contain bg-none "
        style={{
          width: "30%",
          height: "234px",
          backgroundImage: `url('/assets/images/Group.png')`,
          backgroundSize: "contain", 
          backgroundRepeat: "no-repeat",
          backgroundColor: "none",
        }}
      >
        <p className="text-[#ffffff] pgh font-bold text-[24px] mt-[23px] ml-[20px]"> Basic</p>
        <p className="text-[#ffffff]  flex  mr-10 font-bold text-[24px] ml-[20px]">
          {/* {inActiveDoctors} */}
          122
        </p>
        <p className="mt-[60px] flex justify-end w-[90%] text-white text-[14px] font-[500]">User Receipt</p>

      </Card>
      <Card
        className="card object-contain bg-none"
        style={{
          width: "30%",
          height: "234px",
          backgroundImage: `url('/assets/images/red.png')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="text-[#ffffff] pgh font-bold text-[24px] mt-[23px] ml-[20px]">Standard</p>
        <p className="text-[#ffffff]  flex  mr-10 font-bold text-[24px] ml-[20px]">
          {/* {inActiveDoctors} */}
          144
        </p>
        <p className="mt-[60px] flex justify-end w-[90%] text-white text-[14px] font-[500]">User Receipt</p>
      </Card>
      <Card
        className=" card object-contain bg-none "
        style={{
          width: "30%",
          height: "234px",
          backgroundImage: `url('/assets/images/gray.png')`,
          backgroundSize: "contain", // Adjust this based on your requirements
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="text-[#ffffff] pgh font-bold text-[24px] mt-[23px] ml-[20px]">Premium</p>
        <p className="text-[#ffffff]  flex  mr-10 font-bold text-[24px] ml-[20px]">
          {/* {inActiveDoctors} */}
          154
        </p>
        <p className="mt-[60px] flex justify-end w-[90%] text-white text-[14px] font-[500]">User Receipt</p>

      </Card>
    </div>
  );
};

export default Cards;
