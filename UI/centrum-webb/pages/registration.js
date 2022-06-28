import React, { Component } from "react";
import { withRouter } from "next/router";
import SignInForm from "../components/SignInForm/SignInForm";
import CustomInput from "../components/Input/Input";
import { NextLinkComposed } from "../components/Link/Link";
import CustomButton from "../components/Button/Button";
import styles from "../components/SignInForm/SignInForm.module.css";
import { Box, Typography } from "@mui/material";
import isEmailValid from "../redundant_functions/ValidEmail";
import { registerUser } from "../api_calls/user";

const fields = [
  {
    id: "email",
    type: "email",
    label: "Email",
  },
  {
    id: "name",
    type: "text",
    label: "Namn",
  },
  {
    id: "password",
    type: "password",
    label: "Lösenord",
  },
  {
    id: "confirm",
    type: "password",
    label: "Bekräfta lösenord",
  },
];

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailError: null,
      password: "",
      passwordError: null,
      name: "",
      nameError: null,
      confirm: "",
      cornfirmError: null,
      regComplete: false,
      loading: false,
    };
  }

  onChange = async (id, value) => {
    this.setState({ [id]: value });
    if (id == "name") {
      if (value.length < 1) {
        this.setState({ nameError: "Detta fält måste fyllas in" });
      } else if (this.state.nameError != null) {
        this.setState({ nameError: null });
      }
    } else if (id == "email") {
      if (value.length < 1) {
        this.setState({ emailError: "Detta fält måste fyllas in" });
      } else if (!isEmailValid(value)) {
        this.setState({ emailError: "Ett giltigt email måste fyllas in" });
      } else if (this.state.emailError != null) {
        this.setState({ emailError: null });
      }
    }
  };

  onBlur = async (id) => {
    if (id == "name") {
      if (this.state.name.length < 1) {
        this.setState({ nameError: "Detta fält måste fyllas in" });
      } else if (this.state.nameError != null) {
        this.setState({ nameError: null });
      }
    } else if (id == "email") {
      if (this.state.email.length < 1) {
        this.setState({ emailError: "Detta fält måste fyllas in" });
      } else if (!isEmailValid(this.state.email)) {
        this.setState({ emailError: "Ett giltigt email måste fyllas in" });
      } else if (this.state.emailError != null) {
        this.setState({ emailError: null });
      }
    }
  };

  isRegValid = () => {
    return (
      this.state.password == this.state.confirm &&
      this.state.password.length >= 8 &&
      this.state.email.length > 0 &&
      this.state.name.length > 0
    );
  };

  handleReg = async () => {
    if (this.isRegValid()) {
      this.setState({ loading: true });
      let callback = await registerUser(
        this.state.email,
        this.state.name,
        this.state.password
      );
      switch (callback.code) {
        case 204:
          this.setState({
            passwordError: "Lösenordet bör vara minst 8 tecken",
            loading: false,
          });
          break;
        case 206:
          this.setState({
            emailError: "Emailet är redan registrerat",
            loading: false,
          });
          break;
        case 200:
          this.setState({ regComplete: true, loading: false });
          break;
        default:
          break;
      }
    }
  };
  render() {
    return (
      <Box className="content_container">
        {this.state.regComplete ? (
          <Typography sx={{ maxWidth: 600 }}>
            Kontot är registrerat, ett email har skickats till det registrerade
            addressen. Vad god och följ instruktionerna där.
            <NextLinkComposed to="/signin">
              Klicka här för att logga in
            </NextLinkComposed>
          </Typography>
        ) : (
          <SignInForm
            title="Registrera"
            linkProps={{
              desc: "Har redan ett konto?",
              label: "Logga in här!",
              to: "/signin",
            }}
          >
            {fields.map((field, i) => (
              <CustomInput
                key={i}
                id={field.id}
                type={field.type}
                label={field.label}
                required
                value={this.state[field.id]}
                checkForEnter={(code) => {
                  if (code === "Enter") {
                    this.handleReg();
                  }
                }}
                onChange={(value) => this.onChange(field.id, value)}
                onBlur={() => this.onBlur(field.id)}
                error={this.state[`${field.id}Error`] ? true : false}
                errormessage={this.state[`${field.id}Error`]}
              />
            ))}
            <ul className={`${styles.passCheck}`}>
              <li
                className={`${
                  this.state.password.length >= 8 && styles.passCorrect
                }`}
              >
                Lösenordet måste vara minst 8 tecken lång
              </li>
              <li
                className={`${
                  this.state.password == this.state.confirm &&
                  this.state.confirm.length >= 8
                    ? styles.passCorrect
                    : ""
                }`}
              >
                Båda lösenords fälten måste stämma överens
              </li>
            </ul>
            <CustomButton
              onClick={this.handleReg}
              buttontype="loading"
              sx={{ width: "100%" }}
              disabled={this.isRegValid() ? false : true}
              loading={this.state.loading}
            >
              Registrera
            </CustomButton>
          </SignInForm>
        )}
      </Box>
    );
  }
}

export default withRouter(Registration);
