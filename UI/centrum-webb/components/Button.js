import React from "react";
import { Button, LoadingButton, IconButton } from "@mui/material";
import styles from "../styles/buttons.module.css";

export default function CustomButton(props) {
  switch (props.buttonType) {
    case "loading":
      return <LoadingButton {...props}>{props.children}</LoadingButton>;
    case "icon":
      return <IconButton {...props}>{props.children}</IconButton>;
    default:
      return (
        <Button
          onClick={props.onClick}
          className={props.darkMode ? styles.reverse : ""}
          variant={props.variant}
          disableElevation
          {...props}
        >
          {props.children}
        </Button>
      );
  }
}
