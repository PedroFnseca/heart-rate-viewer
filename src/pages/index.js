import { useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dashboard from "@/components/Dashboard";
import Reports from "@/components/Reports";
import GeneralConfig from "@/components/GeneralConfig";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
        setSelectedTab("configuracoes_gerais");
        break;
      default:
        setSelectedTab("dashboard");
        break;
    }
  };

  return (
    <main className="min-h-screen p-2">
      <Box className="w-full">
        <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
          <Tab label="Dashboard" className="text-white" {...a11yProps(0)} />
          <Tab label="Relatório" className="text-white" {...a11yProps(1)} />
          <Tab label="Configurações gerais" className="text-white" {...a11yProps(2)} />
        </Tabs>
        <div className="p-8">
          {selected_tab === "dashboard" && <Dashboard />}
          {selected_tab === "relatorio" && <Reports />}
          {selected_tab === "configuracoes_gerais" && <GeneralConfig />}
        </div>
      </Box>
    </main>
  )
}