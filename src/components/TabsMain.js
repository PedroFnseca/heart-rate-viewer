import { useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Dashboard from "@/components/Dashboard";
import Reports from "@/components/Reports";
import GeneralConfig from "@/components/GeneralConfig";

import { a11yProps } from "@/utils/a11yProps";
import LogoutButton from "./LogoutButton";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Mapeamento entre o valor do Tab selecionado e o componente a ser exibido
  const tabContent = {
    0: <Dashboard />,
    1: <Reports />,
    2: <GeneralConfig />
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Box sx={{ width: "100%", marginTop: "5px" }}>
        <div className="flex justify-between">
          <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
            <Tab label="Dashboard" sx={{ color: "white" }} {...a11yProps(0)} />
            <Tab label="Relatório" sx={{ color: "white" }} {...a11yProps(1)} />
            <Tab label="Configurações" sx={{ color: "white" }} {...a11yProps(2)} />
          </Tabs>
          <div style={{ zIndex: 1 }} className="m-2">
            <LogoutButton />
          </div>
        </div>
        <div className="p-4">
          {tabContent[value]}
        </div>
      </Box>
    </div>
  )
}