import React, { Component } from "react";
import {
  Box,
  Button,
  LoadingButton,
  IconButton,
} from "@mui/material";
import theme from "../material-ui-themes/theme"
import styles from "../styles/buttons.module.css"

export default function CustomButton(props){
    switch(props.buttonType){
        case "loading":
            return <LoadingButton></LoadingButton>;
        case "icon":
            return <IconButton></IconButton>;
        default:
            return <Button onClick={props.onClick} className={props.darkMode ? styles.reverse : ""} variant={props.variant} disableElevation>
            {props.text}
          </Button>
    }
};
