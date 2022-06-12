import React from "react";
import { Button, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import styles from "./Button.module.css";

export default function CustomButton(props) {
  switch (props.buttontype) {
    case "loading":
      return (
        <LoadingButton
          className={`${styles.commonButton} ${
            props.darkmode ? styles.reverse : ""
          }`}
          {...props}
        >
          {props.children}
        </LoadingButton>
      );
    case "icon":
      return (
        <IconButton
          className={`${styles.commonButton} ${
            props.darkmode ? styles.reverse : ""
          }`}
          {...props}
        >
          {props.children}
        </IconButton>
      );
    default:
      return (
        <Button
          onClick={props.onClick}
          className={`${styles.commonButton} ${
            props.darkmode ? styles.reverse : ""
          }`}
          variant={props.variant}
          disableElevation
          {...props}
        >
          {props.children}
        </Button>
      );
  }
}
