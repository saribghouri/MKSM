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
        <p className="text-[#ffffff] pgh font-bold text-22">InActive Doctors</p>
        <p className="text-[#ffffff]  flex justify-end mr-10 font-bold text-30">
          {/* {inActiveDoctors} */}
        </p>
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
        <p className="text-[#ffffff] pgh font-bold text-22">InActive Doctors</p>
        <p className="text-[#ffffff]  flex justify-end mr-10 font-bold text-30">
          {/* {inActiveDoctors} */}
        </p>
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
        <p className="text-[#ffffff] pgh font-bold text-22">InActive Doctors</p>
        <p className="text-[#ffffff]  flex justify-end mr-10 font-bold text-30">
          {/* {inActiveDoctors} */}
        </p>
      </Card>
    </div>
  );
};

export default Cards;
