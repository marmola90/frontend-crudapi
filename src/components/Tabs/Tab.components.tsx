import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { TabPanel } from ".";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: string;
  // id: number;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "#fafafa",
  "&.Mui-selected": {
    color: "#1976ce",
    borderRadius: 5,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

interface Props {
  elements: {
    elemento: JSX.Element;
    label: string;
    id: number;
  }[];
}
const TabComponents = ({ elements }: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "rgb(14 14 14 / 87%)",
        boxShadow: "1px 0px 6px 1px #242424de",
        height: "550px",
        borderRadius: 5,
      }}
    >
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
      >
        {elements.map((item) => (
          <StyledTab label={item.label} key={item.id} />
        ))}
      </StyledTabs>

      <Box sx={{ p: 3 }} />
      {elements.map((item) => {
        return (
          <TabPanel value={value} index={item.id} key={item.id}>
            {item.elemento}
          </TabPanel>
        );
      })}
    </Box>
  );
};
export default TabComponents;
