import React from "react";
import styles from "./Input.module.css";
import { Add, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";

function renderEndAdornment(toggle, togglePassword, props) {
  switch (props.type) {
    case "password":
      return (
        <InputAdornment style={{ background: "transparent" }} position="end">
          <IconButton
            tabIndex={-1}
            aria-label="toggle password visibility"
            onClick={() => togglePassword()}
          >
            {!toggle ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      );
      break;
    case "add":
      return (
        <InputAdornment style={{ background: "transparent" }} position="end">
          <IconButton tabIndex={-1} aria-label="add button" onClick={() => props.endAdornmentClick()}>
            <Add />
          </IconButton>
        </InputAdornment>
      );
  }
}

function CustomInput(props) {
  const [toggle, setToggle] = React.useState(false);
  return (
    <Box sx={{ width: "100%" }}>
      <Typography className={styles.error}>{props.errormessage}</Typography>
      <TextField
        id={props.id}
        className={styles.input}
        label={props.label}
        type={props.type === "password" && toggle ? "text" : props.type}
        multiline={props.type === "textarea"}
        rows={6}
        fullWidth={true}
        variant={props.variant ? props.variant : "outlined"}
        onKeyDown={(e) => {
          try {
            props.checkForEnter(e.code);
          } catch {}
        }}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onBlur={() => {
          try {
            props.onBlur();
          } catch {}
        }}
        error={props.error}
        helperText={props.error ? props.errorText : ""}
        InputProps={{
          style: { fontSize: 15 },
          endAdornment: renderEndAdornment(
            toggle,
            () => setToggle(!toggle),
            props
          ),
        }}
        InputLabelProps={{
          style: { fontSize: 15 },
          required: props.required,
        }}
      />
    </Box>
  );
}

export default CustomInput;
