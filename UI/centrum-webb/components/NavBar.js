import React from "react";
import { login } from "../api_calls/user";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import {
  CalendarMonth,
  CalendarMonthOutlined,
  DarkMode,
  Groups,
  GroupsOutlined,
  Login,
  NotificationsOutlined,
  PersonOutline,
  Search,
  Settings,
  TuneOutlined,
} from "@mui/icons-material";
import Button from "./Button";
import font_styles from "../styles/fonts.module.css";
import { Box } from "@mui/system";
import useWindowSize from "../redundant_functions/WindowSize";
import { NextLinkComposed } from "./Link";

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

export default function NavBar(props) {
  const size = useWindowSize();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (size.width > 851) {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Button
              component={NextLinkComposed}
              to={{
                pathname: "/",
              }}
            >
              <Typography className={`${font_styles.white_color}`} variant="h6">
                Sportcentrum.
              </Typography>
            </Button>
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
            <Button buttontype="icon" size="large" color="inherit">
              <GroupsOutlined fontSize="medium" />
            </Button>
            <Button buttontype="icon" size="large" color="inherit">
              <CalendarMonthOutlined fontSize="medium" />
            </Button>
            <Button buttontype="icon" size="large" color="inherit">
              <NotificationsOutlined fontSize="medium" />
            </Button>
            <Button
              sx={{ height: "40px" }}
              darkMode
              size="medium"
              color="inherit"
              onClick={login}
            >
              Logga in
            </Button>
            {/*<Button buttontype="icon" size="large" color="inherit">
              <Avatar />
            </Button>*/}
          </Box>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Button
              component={NextLinkComposed}
              to={{
                pathname: "/",
              }}
            >
              <Typography className={`${font_styles.white_color}`} variant="h6">
                Sportcentrum.
              </Typography>
            </Button>
          </Box>
          <Box display="flex" sx={{ justifyContent: "space-around" }}>
            <Button buttontype="icon" size="large" color="inherit">
              <NotificationsOutlined fontSize="medium" />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}
