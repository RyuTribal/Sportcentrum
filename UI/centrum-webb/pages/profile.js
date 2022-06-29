import React, { Component } from "react";
import { withRouter } from "next/router";
import { login } from "../api_calls/user";

class User extends Component {
    constructor() {
      super();
      this.state = {
        isLogged: false,
      };
    }
    componentDidMount = async () => {
        if (window.opener) {
            window.opener.focus();
        }
        window.close();
    };
    render() {
      return (0);
    }
  }

export default withRouter(User);