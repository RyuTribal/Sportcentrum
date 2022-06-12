import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styles from "./SignInForm.module.css";
import { NextLinkComposed } from "../Link/Link";

function SignInForm(props) {
  return (
    <Box className={styles.container}>
      <Box>
        <Typography className={styles.header} variant="h5" component="h1">
          {props.title}
        </Typography>
      </Box>
      <Box
        className={`${styles.formContainerBorder} ${styles.formContainerCenter}`}
      >
        {props.children}
      </Box>
      <Box className={styles.formLink}>
        {props.linkProps.desc}
        <NextLinkComposed className={styles.linkBase} to={props.linkProps.to}>
          {props.linkProps.label}
        </NextLinkComposed>
      </Box>
    </Box>
  );
}

export default SignInForm;
