import useWindowSize from "../redundant_functions/WindowSize";
import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  CalendarMonthOutlined,
  GroupsOutlined,
  HomeOutlined,
  PersonOutline,
  SearchOutlined,
} from "@mui/icons-material";

export default function BottomNavBar(props) {
  const paths = ["/", "/search", "/groups", "/calendar", "/profile"];
  const size = useWindowSize();
  if (size.width <= 851) {
    return (
      <Paper
        sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels position="sticky">
          <BottomNavigationAction
            label="Hem"
            icon={<HomeOutlined fontSize="medium" />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            label="Sök"
            icon={<SearchOutlined fontSize="medium" />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            label="Grupper"
            icon={<GroupsOutlined fontSize="medium" />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            label="Kalender"
            icon={<CalendarMonthOutlined fontSize="medium" />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            label="Profil"
            icon={<PersonOutline fontSize="medium" />}
          ></BottomNavigationAction>
        </BottomNavigation>
      </Paper>
    );
  }
}
