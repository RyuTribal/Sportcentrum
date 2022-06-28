import React, { Component } from "react";
import { Container, Typography, Box, Checkbox } from "@mui/material";
import { CircleOutlined, Circle } from "@mui/icons-material";
import theme from "../material-ui-themes/theme";
import Button from "../components/Button/Button";
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
    let sports_arr = [];
    Object.keys(this.state.sports).map((sport, i) => {
      if (this.state.sports[sport] === true || this.state.allPicked === true) {
        sports_arr.push(sport.toLowerCase());
      }
    });
    localStorage.setItem("sports", JSON.stringify(sports_arr));
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
            className={`flexed center_horizontal direction_column center_vertical zero_margin`}
          >
            <Container
              className={`flexed direction_column center_vertical zero_margin`}
              maxWidth="md"
            >
              <Container
                className={`flexed direction_column center_vertical zero_margin`}
                sx={{ padding: "20px 0" }}
              >
                <Typography
                  variant="h5"
                  className={`bold-text centered-text primary_color`}
                >
                  Välj sport
                </Typography>
                <Typography
                  variant="caption"
                  className={`centered-text primary_color`}
                >
                  Vilken sport interesserar dig?
                </Typography>
              </Container>
              <Container
                className={`flexed direction_column center_vertical zero_margin`}
                sx={{
                  borderBottom: "0.5px solid rgba(56,56,56,0.3)",
                  borderTop: "0.5px solid rgba(56,56,56,0.3)",
                  padding: "0 !important",
                }}
              >
                <Box
                  className={`flexed center_vertical zero_margin`}
                  sx={{ padding: "10px 20px", width: "100%" }}
                >
                  <Typography
                    variant="body1"
                    className={`primary_color bold-text`}
                    sx={{ flex: "0 0 50%", textAlign: "left" }}
                  >
                    Välj alla
                  </Typography>
                  <Box
                    className={`flexed zero_margin`}
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
                    key={i}
                    className={`flexed center_vertical zero_margin`}
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
                      className={`flexed zero_margin`}
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
                className={`flexed direction_column center_vertical zero_margin`}
                sx={{ padding: "20px 0", gap: "10px" }}
              >
                <Button onClick={this.handleSave} variant="contained">
                  Fortsätt
                </Button>
                <Button onClick={this.handleSkip} variant="outlined">
                  Hoppa över
                </Button>
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
            className={`flexed direction_column center_vertical zero_margin`}
          >
            <Container className="four_grid"></Container>
            <Container
              className={`flexed center_horizontal direction_column center_vertical four_grid`}
            >
              <Typography className="white_color" variant="h6">
                Välkommen till
              </Typography>
              <Typography
                className={`white_color bold-text`}
                variant="h3"
              >
                Sportcentrum.
              </Typography>
            </Container>
            <Container
              className={`flexed center_horizontal direction_column center_vertical four_grid`}
            >
              <Typography
                className={`white_color bold-text centered-text`}
                variant="h6"
              >
                All sport på en och samma plattform!
              </Typography>
              <Typography
                className={`white_color centered-text`}
                variant="subtitle1"
              >
                Sportcentrum är en oberoende samlingsplats för alla
                sportnyheter.
              </Typography>
            </Container>
            <Container
              className={`flexed center_horizontal direction_column center_vertical four_grid`}
            >
              <Container
                className={`flexed center_horizontal direction_column center_vertical two_grid`}
              >
                <Button
                  variant="contained"
                  darkmode={true}
                  onClick={() => {
                    this.props.router.query.page = 1;
                    this.props.router.push(this.props.router);
                    this.forceUpdate();
                  }}
                >Kom igång!</Button>
              </Container>
              <Container
                className={`flexed center_horizontal direction_column center_vertical two_grid`}
              >
                <Typography
                  className={`white_color center`}
                  variant="caption"
                >
                  Sportcentrum är en del av
                </Typography>
                <Typography
                  className={`white_color centered-text bold-text`}
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
