import React, { Component } from "react";
import { withRouter } from "next/router";
import SignInForm from "../components/SignInForm/SignInForm";
import CustomInput from "../components/Input/Input";
import { NextLinkComposed } from "../components/Link/Link";
import CustomButton from "../components/Button/Button";
import styles from "../components/SignInForm/SignInForm.module.css";

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
      password: "",
    };
  }

  onChange = async (id, value) => {
    this.setState({ [id]: value });
  };

  handleLogin = async () => {
    
  };
  render() {
    return (
      <SignInForm
        title="Logga in"
        linkProps={{
          desc: "Har inget konto?",
          label: "Skapa ett här!",
          to: "/registration",
        }}
      >
        {fields.map((field, i) => (
          <CustomInput
            key={i}
            id={field.id}
            type={field.type}
            label={field.label}
            /*error={
            this.state[`${field.id}Error`] ||
            this.shouldMarkError(field.id, [
              { id: field.id, value: this.state[field.id] },
            ])
          }
          errorText={
            this.state.uniError ? "" : this.state[`${field.id}ErrorMessage`]
          }*/
            required
            value={this.state[field.id]}
            /*checkForEnter={(code) => {
            if (code === 13) {
              this.handleLogin("cognito");
            }
          }}*/
            onChange={(value) => this.onChange(field.id, value)}
            //onBlur={() => this.onBlur(field.id)}
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
        >
          Logga in
        </CustomButton>
      </SignInForm>
    );
  }
}

export default withRouter(SignIn);
