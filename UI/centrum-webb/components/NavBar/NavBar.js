import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, InputBase, Avatar } from "@mui/material";
import {
  CalendarMonthOutlined,
  GroupsOutlined,
  NotificationsOutlined,
  Search,
} from "@mui/icons-material";
import CustomButton from "../Button/Button";
import styles from "./NavBar.module.css";
import { Box } from "@mui/system";
import useWindowSize from "../../redundant_functions/WindowSize";
import { NextLinkComposed } from "../Link/Link";
import { store } from "../../redux/store";
import { getLoggedInUser } from "../../api_calls/user";
import { userAdd } from "../../redux/actions/user";
import {connect} from "react-redux";

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function NavBar(props) {
  const size = useWindowSize();
  useEffect(() => {
    getLoggedInUser().then((res) => {
      if (res.user) {
        props.set_user(res.user);
      }
    });
  });
  if (size.width > 851) {
    return (
      <AppBar position="fixed" sx={{ alignItems: "center" }}>
        <Toolbar
          sx={{ maxWidth: 1024, width: "100%", padding: "0 !important" }}
        >
          <Box display="flex" flexGrow={1}>
            <CustomButton
              component={NextLinkComposed}
              to={{
                pathname: "/",
              }}
            >
              <Typography className={`${styles.white_color}`} variant="h6">
                Sportcentrum.
              </Typography>
            </CustomButton>
          </Box>
          <Box display="flex" flexGrow={1}>
            <SearchBar>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Sök..."
                inputProps={{ "aria-label": "search" }}
              />
            </SearchBar>
          </Box>
          <Box
            display="flex"
            sx={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <CustomButton buttontype="icon" size="large" color="inherit">
              <GroupsOutlined fontSize="medium" />
            </CustomButton>
            <CustomButton buttontype="icon" size="large" color="inherit">
              <CalendarMonthOutlined fontSize="medium" />
            </CustomButton>
            <CustomButton buttontype="icon" size="large" color="inherit">
              <NotificationsOutlined fontSize="medium" />
            </CustomButton>
            {props.user ? (
              <CustomButton
                buttontype="icon"
                component={NextLinkComposed}
                to={{
                  pathname: "/profile",
                }}
              >
                <Avatar
                  sx={{ bgcolor: "#c97d5c" }}
                  alt={`${props.user.firstname} ${
                    props.user.lastname
                  }`}
                  src="/broken-image.jpg"
                />
              </CustomButton>
            ) : (
              <CustomButton
                sx={{ height: "40px" }}
                darkmode
                size="medium"
                color="inherit"
                component={NextLinkComposed}
                to={{
                  pathname: "/signin",
                }}
              >
                Logga in
              </CustomButton>
            )}
          </Box>
        </Toolbar>
        {props.children}
      </AppBar>
    );
  } else {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <CustomButton
              component={NextLinkComposed}
              to={{
                pathname: "/",
              }}
            >
              <Typography className={`${styles.white_color}`} variant="h6">
                Sportcentrum.
              </Typography>
            </CustomButton>
          </Box>
          <Box display="flex" sx={{ justifyContent: "space-around" }}>
            <CustomButton buttontype="icon" size="large" color="inherit">
              <NotificationsOutlined fontSize="medium" />
            </CustomButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.userReducers.user };
}

function mapDispatchToProps(dispatch) {
  return {
    set_user: (user) => dispatch(userAdd(user)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
