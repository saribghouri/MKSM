"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./UserContext";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";





export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

useEffect(() => {

  const fetchData = async () => {
  
    setTimeout(() => {
      setLoading(false); 
    }, 3000);
  };

  fetchData();
}, []); 

  return (
    <UserProvider>
      <html className="bg-[#ffffff]" lang="en">
      <body className='over-all-body'>
        {loading ? (
          <Spin
          className="flex justify-center w-[100%] h-[750px] items-center"
          indicator={<LoadingOutlined style={{ fontSize: 45, color: "#d83333" }} spin />}
        />
        ) : (
          <main>{children}</main>
        )}
      </body>
      </html>
    </UserProvider>
  );
}