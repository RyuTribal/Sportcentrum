import React, { useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TabPanel from "./TabPanel";
import useWindowSize from "../../redundant_functions/WindowSize";

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function CustomTabs(props) {
  const [currTab, setTab] = React.useState(0);
  const size = useWindowSize();
  const handleChange = (event, value) => {
    setTab(value);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currTab}
          onChange={handleChange}
          aria-label="user-tabs"
          centered
          variant={size <= 851 && "fullWidth"}
          {...props}
        >
          {props.tabs &&
            props.tabs.map((tab, i) => (
              <Tab key={i} label={tab.label} {...a11yProps(i)} />
            ))}
        </Tabs>
      </Box>
      {props.children.map((child, i) => (
        <TabPanel key={i} value={currTab} index={i}>{child}</TabPanel>
      ))}
    </Box>
  );
}
