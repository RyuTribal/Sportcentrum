import React from "react";
import styles from "./Input.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, IconButton, InputAdornment } from "@mui/material";

function renderPasswordVisibility(toggle, togglePassword) {
  return (
    <InputAdornment style={{ background: "transparent" }} position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => togglePassword()}
      >
        {!toggle ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}

function CustomInput(props) {
  const [toggle, setToggle] = React.useState(false);
  return (
    <TextField
      id={props.id}
      className={styles.input}
      label={props.label}
      type={props.type === "password" && toggle ? "text" : props.type}
      multiline={props.type === "textarea"}
      rows={6}
      fullWidth={true}
      variant={props.variant ? props.variant : "outlined"}
      /*onKeyDown={(e) => {
        try {
          props.checkForEnter(e.keyCode);
        } catch {}
      }}*/
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      /*onBlur={() => {
        try {
          props.onBlur();
        } catch {}
      }}*/
      error={props.error}
      helperText={props.error ? props.errorText : ""}
      InputProps={{
        style: { fontSize: 15 },
        endAdornment:
          props.type === "password"
            ? renderPasswordVisibility(toggle, () => setToggle(!toggle))
            : "",
      }}
      InputLabelProps={{
        style: { fontSize: 15 },
        required: props.required,
      }}
    />
  );
}

export default CustomInput;
