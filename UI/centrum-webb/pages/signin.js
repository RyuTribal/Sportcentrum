import React, { Component } from "react";
import Router, { withRouter } from "next/router";
import SignInForm from "../components/SignInForm/SignInForm";
import CustomInput from "../components/Input/Input";
import { NextLinkComposed } from "../components/Link/Link";
import CustomButton from "../components/Button/Button";
import styles from "../components/SignInForm/SignInForm.module.css";
import { Box, Typography } from "@mui/material";
import { loginUser } from "../api_calls/user";
import { userAdd } from "../redux/actions/user";
import {store} from "../redux/store";

const fields = [
  {
    id: "email",
    type: "email",
    label: "Email",
  },
  {
    id: "password",
    type: "password",
    label: "Lösenord",
  },
];

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailError: null,
      password: "",
      passwordError: null,
      loading: false,
      uni_error: "",
    };
  }

  componentDidMount = async () =>{
    if(store.getState().userReducers.user){
      Router.push("/");
    }
  }

  onChange = async (id, value) => {
    this.setState({ [id]: value });
  };

  isLoginValid = () => {
    return this.state.password.length > 0 && this.state.email.length > 0;
  };

  handleLogin = async () => {
    if (this.isLoginValid()) {
      this.setState({ loading: true, uni_error: "" });
      let callback = await loginUser(this.state.email, this.state.password);
      switch (callback.code) {
        case 206:
          this.setState({ uni_error: "Kontot är ej verifierat" });
          break;
        case 204:
          this.setState({ uni_error: "Lösenordet eller addressen är fel" });
          break;
        case 200:
          let user = callback.user;
          user.sessionId = callback.sessionId;
          store.dispatch(userAdd(user));
          Router.push("/");
          break;
        default:
          break;
      }
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <Box className="content_container">
        <SignInForm
          title="Logga in"
          linkProps={{
            desc: "Har inget konto?",
            label: "Skapa ett här!",
            to: "/registration",
          }}
        >
          <Typography className={styles.passCheck} sx={{ textAlign: "center" }}>
            {this.state.uni_error}
          </Typography>
          {fields.map((field, i) => (
            <CustomInput
              key={i}
              id={field.id}
              type={field.type}
              label={field.label}
              error={this.state[`${field.id}Error`] || this.state.uni_error.length > 0 ? true : false}
              required
              value={this.state[field.id]}
              checkForEnter={(code) => {
                if (code === "Enter") {
                  this.handleLogin();
                }
              }}
              onChange={(value) => this.onChange(field.id, value)}
            />
          ))}
          <NextLinkComposed
            className={`${styles.linkBase} ${styles.forgotPassword}`}
            to="resetpassword"
          >
            Glömt lösenordet?
          </NextLinkComposed>

          <CustomButton
            onClick={this.handleLogin}
            buttontype="loading"
            sx={{ width: "100%" }}
            loading={this.state.loading}
            disabled={!this.isLoginValid()}
          >
            Logga in
          </CustomButton>
        </SignInForm>
      </Box>
    );
  }
}

export default withRouter(SignIn);
