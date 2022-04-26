import useWindowSize from "../redundant_functions/WindowSize";
import React, {useEffect} from "react";
import Link from "./Link";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  CalendarMonthOutlined,
  GroupsOutlined,
  HomeOutlined,
  PersonOutline,
  SearchOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";

/*
    Add path below that you want to appear in the bottom nav 
    of phones
*/

const paths = [
  { path: "/", label: "Hem", icon: <HomeOutlined fontSize="medium" /> },
  {
    path: "/search",
    label: "Sök",
    icon: <SearchOutlined fontSize="medium" />,
  },
  {
    path: "/groups",
    label: "Grupper",
    icon: <GroupsOutlined fontSize="medium" />,
  },
  {
    path: "/calendar",
    label: "Kalender",
    icon: <CalendarMonthOutlined fontSize="medium" />,
  },
  {
    path: "/profile",
    label: "Profil",
    icon: <PersonOutline fontSize="medium" />,
  },
];

export default function BottomNavBar(props) {
  const router = useRouter();
  const [value, setValue] = React.useState(router.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    handleChange(null, router.pathname);
  }, [router.asPath]);
  const size = useWindowSize();
  if (size.width <= 851) {
    return (
      <Paper
        sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={value} onChange={handleChange}>
          {paths.map((path, i) => (
            <BottomNavigationAction
              key={i}
              value={path.path}
              label={path.label}
              icon={path.icon}
              component={Link}
              href={path.path}
            ></BottomNavigationAction>
          ))}
        </BottomNavigation>
      </Paper>
    );
  }
}
