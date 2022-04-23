import React, { Component } from "react";
import { Container, Typography, Box, Checkbox } from "@mui/material";
import { CircleOutlined, Circle } from "@mui/icons-material";
import theme from "../material-ui-themes/theme";
import styles from "../styles/containers.module.css";
import fontstyles from "../styles/fonts.module.css";
import Button from "../components/Button";
import { withRouter } from "next/router";

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      allPicked: false,
      sports: {
        Fotboll: false,
        Hockey: false,
        Bandy: false,
        Innebandy: false,
        Tennis: false,
        Badminton: false,
        Golf: false,
        Padel: false,
      },
    };
  }
  componentDidMount = async () => {
    if (localStorage.getItem("hasPicked")) {
      this.props.router.push({
        pathname: "/",
      });
    }
  };

  handleSave = async () => {
    localStorage.setItem("hasPicked", true);
    localStorage.setItem("sports", this.state.sports);
    this.props.router.push({
      pathname: "/",
    });
  };

  handleSkip = async () => {
    localStorage.setItem("hasPicked", true);
    this.props.router.push({
      pathname: "/",
    });
  };
  render() {
    switch (this.props.router.query.page) {
      case "1":
        return (
          <Box
            sx={{
              height: "100%",
            }}
            className={`${styles.flexed} ${styles.center_horizontal} ${styles.direction_column} ${styles.center_vertical} ${styles.zero_margin}`}
          >
            <Container
              className={`${styles.flexed} ${styles.direction_column} ${styles.center_vertical} ${styles.zero_margin}`}
              maxWidth="md"
            >
              <Container
                className={`${styles.flexed} ${styles.direction_column} ${styles.center_vertical} ${styles.zero_margin}`}
                sx={{ padding: "20px 0" }}
              >
                <Typography
                  variant="h5"
                  className={`${fontstyles.bold} ${fontstyles.center} ${fontstyles.primary_color}`}
                >
                  Välj sport
                </Typography>
                <Typography
                  variant="caption"
                  className={`${fontstyles.center} ${fontstyles.primary_color}`}
                >
                  Vilken sport interesserar dig?
                </Typography>
              </Container>
              <Container
                className={`${styles.flexed} ${styles.direction_column} ${styles.center_vertical} ${styles.zero_margin}`}
                sx={{
                  borderBottom: "0.5px solid rgba(56,56,56,0.3)",
                  borderTop: "0.5px solid rgba(56,56,56,0.3)",
                  padding: "0 !important",
                }}
              >
                <Box
                  className={`${styles.flexed} ${styles.center_vertical} ${styles.zero_margin}`}
                  sx={{ padding: "10px 20px", width: "100%" }}
                >
                  <Typography
                    variant="body1"
                    className={`${fontstyles.primary_color} ${fontstyles.bold}`}
                    sx={{ flex: "0 0 50%", textAlign: "left" }}
                  >
                    Välj alla
                  </Typography>
                  <Box
                    className={`${styles.flexed} ${styles.zero_margin}`}
                    sx={{ flex: "0 0 50%", justifyContent: "end" }}
                  >
                    <Checkbox
                      icon={<CircleOutlined />}
                      checkedIcon={<Circle />}
                      sx={{ marginLeft: "0 auto" }}
                      checked={this.state.allPicked}
                      onClick={() => {
                        this.setState({ allPicked: !this.state.allPicked });
                      }}
                    />
                  </Box>
                </Box>
                {Object.keys(this.state.sports).map((sport, i) => (
                  <Box
                    className={`${styles.flexed} ${styles.center_vertical} ${styles.zero_margin}`}
                    sx={{
                      padding: "10px 20px",
                      width: "100%",
                      borderTop: "0.5px solid rgba(56,56,56,0.3)",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ flex: "0 0 50%", textAlign: "left" }}
                    >
                      {sport}
                    </Typography>
                    <Box
                      className={`${styles.flexed} ${styles.zero_margin}`}
                      sx={{ flex: "0 0 50%", justifyContent: "end" }}
                    >
                      <Checkbox
                        icon={<CircleOutlined />}
                        checkedIcon={<Circle />}
                        sx={{ marginLeft: "0 auto" }}
                        checked={
                          this.state.allPicked || this.state.sports[sport]
                        }
                        onClick={() => {
                          let sports = this.state.sports;
                          sports[sport] = !sports[sport];
                          this.setState({ sports: sports });
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Container>
              <Container
                className={`${styles.flexed} ${styles.direction_column} ${styles.center_vertical} ${styles.zero_margin}`}
                sx={{ padding: "20px 0", gap: "10px" }}
              >
                <Button
                  onClick={this.handleSave}
                  variant="contained"
                  text="Fortsätt"
                />
                <Button
                  onClick={this.handleSkip}
                  variant="outlined"
                  text="Hoppa över"
                />
              </Container>
            </Container>
          </Box>
        );

      /*
       *************Splash page****************
       */
      default:
        return (
          <Box
            sx={{
              background: theme.palette.primary.main,
              height: "100%",
              gridAutoFlow: "column",
            }}
            className={`${styles.flexed} ${styles.direction_column} ${styles.center_vertical} ${styles.zero_margin}`}
          >
            <Container className={styles.four_grid}></Container>
            <Container
              className={`${styles.flexed} ${styles.center_horizontal} ${styles.direction_column} ${styles.center_vertical} ${styles.four_grid}`}
            >
              <Typography className={fontstyles.white_color} variant="h6">
                Välkommen till
              </Typography>
              <Typography
                className={`${fontstyles.white_color} ${fontstyles.bold}`}
                variant="h3"
              >
                Sportcentrum.
              </Typography>
            </Container>
            <Container
              className={`${styles.flexed} ${styles.center_horizontal} ${styles.direction_column} ${styles.center_vertical} ${styles.four_grid}`}
            >
              <Typography
                className={`${fontstyles.white_color} ${fontstyles.bold} ${fontstyles.center}`}
                variant="h6"
              >
                All sport på en och samma plattform!
              </Typography>
              <Typography
                className={`${fontstyles.white_color} ${fontstyles.center}`}
                variant="subtitle1"
              >
                Sportcentrum är en oberoende samlingsplats för alla
                sportnyheter.
              </Typography>
            </Container>
            <Container
              className={`${styles.flexed} ${styles.center_horizontal} ${styles.direction_column} ${styles.center_vertical} ${styles.four_grid}`}
            >
              <Container
                className={`${styles.flexed} ${styles.center_horizontal} ${styles.direction_column} ${styles.center_vertical} ${styles.two_grid}`}
              >
                <Button
                  variant="contained"
                  darkMode={true}
                  text="Kom igång!"
                  onClick={() => {
                    this.props.router.query.page = 1;
                    this.props.router.push(this.props.router);
                    this.forceUpdate();
                  }}
                />
              </Container>
              <Container
                className={`${styles.flexed} ${styles.center_horizontal} ${styles.direction_column} ${styles.center_vertical} ${styles.two_grid}`}
              >
                <Typography
                  className={`${fontstyles.white_color} ${fontstyles.center}`}
                  variant="caption"
                >
                  Sportcentrum är en del av
                </Typography>
                <Typography
                  className={`${fontstyles.white_color} ${fontstyles.center} ${fontstyles.bold}`}
                  variant="caption"
                >
                  EIOP
                </Typography>
              </Container>
            </Container>
          </Box>
        );
    }
  }
}

export default withRouter(Splash);
