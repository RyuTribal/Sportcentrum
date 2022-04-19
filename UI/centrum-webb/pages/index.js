import React, { Component } from "react";
import { withRouter } from "next/router";


class Home extends Component {
  componentDidMount = async () => {
    if (!localStorage.getItem("hasPicked")) {
      this.props.router.push({
        pathname: "/splash",
      });
    }
  };
  render() {
    return <h1>We home</h1>;
  }
}

export default withRouter(Home);
