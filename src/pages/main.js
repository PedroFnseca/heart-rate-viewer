import { useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Image from "next/image"

import Dashboard from "@/components/Dashboard";
import Reports from "@/components/Reports";
import GeneralConfig from "@/components/GeneralConfig";

import { a11yProps } from "@/utils/a11yProps";

export default function Home() {
  const [value, setValue] = useState(0);
  const [selected_tab, setSelectedTab] = useState("dashboard");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setSelectedTab("dashboard");
        break;
      case 1:
        setSelectedTab("relatorio");
        break;
      case 2:
        setSelectedTab("configuracoes");
        break;
      default:
        setSelectedTab("dashboard");
        break;
    }
  };

  return (
    <main className="min-h-screen p-2">
      <Box sx={{ width: "100%", marginTop: "5px" }}>
        <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
          <Tab label="Dashboard" sx={{ color: "white" }} {...a11yProps(0)} />
          <Tab label="Relatório" sx={{ color: "white" }} {...a11yProps(1)} />
          <Tab label="Configurações" sx={{ color: "white" }} {...a11yProps(2)} />
        </Tabs>
        <div className="p-4">
          {selected_tab === "dashboard" && <Dashboard />}
          {selected_tab === "relatorio" && <Reports />}
          {selected_tab === "configuracoes" && <GeneralConfig />}
        </div>
      </Box>
    </main>
  )
}