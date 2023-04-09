import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Image from "next/image"

import Login from "@/components/auth/Login";
import NewUser from "@/components/auth/NewUser";

import { a11yProps } from "@/utils/a11yProps";

export default function Auth() {
  const [selectedTab, setSelectedTab] = useState("login");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4">
      <Image src="/logo.svg" alt="Logo" width={200} height={200} className="mb-4"/>
    <Box sx={{ minWidth: 400 }}>
      <Box
        sx={{
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 4,
          boxShadow: "md",
          backgroundColor: "#fff",
        }}
      >
        {selectedTab === "login" && <Login onSignupClick={() => setSelectedTab("newUser")} />}
        {selectedTab === "newUser" && <NewUser onLoginClick={() => setSelectedTab("login")} />}
      </Box>
      <Tabs value={selectedTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" centered>
        <Tab label="Login" value="login" {...a11yProps(0)} sx={{ color: "white" }}/>
        {/* <Tab label="Novo usuário" value="newUser" {...a11yProps(1)} sx={{ color: "white" }} /> */}
      </Tabs>
    </Box>
  </main>
);
}