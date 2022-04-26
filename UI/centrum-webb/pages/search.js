import React, { Component } from "react";
import { withRouter } from "next/router";
import { Box } from "@mui/system";
import con_styles from "../styles/containers.module.css";

class Home extends Component {
  render() {
    return <Box className={con_styles.content_container}>Search</Box>;
  }
}

export default withRouter(Home);
