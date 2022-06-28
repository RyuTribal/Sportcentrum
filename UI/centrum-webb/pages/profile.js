import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Avatar, Box, Chip, InputBase, Stack, Typography } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { store } from "../redux/store";
import { userAdd } from "../redux/actions/user";
import { connect } from "react-redux";
import styles from "../styles/profile.module.css";
import { Email } from "@mui/icons-material";
import CustomTabs from "../components/Tabs/Tabs";
import CustomInput from "../components/Input/Input";

const tabs = [
  {
    label: "Följer",
  },
  {
    label: "Sparat",
  },
  {
    label: "Inställningar",
  },
];

class Profile extends Component {
  constructor() {
    super();
    this.state = { isLoggedIn: false, tags: [], tagInput: "", tagError: null };
  }

  componentDidMount = () => {
    let sports = JSON.parse(localStorage.getItem("sports"));
    this.setState({ tags: sports });
  };

  handleDeleteTag = async (value) => {
    let newArr = this.state.tags.filter(function (tag) {
      return tag !== value;
    });
    this.setState({ tags: newArr });
    localStorage.setItem("sports", JSON.stringify(newArr));
  };

  addTag = async () => {
    if (this.state.tags.indexOf(this.state.tagInput.toLowerCase()) === -1) {
      let newArr = [...this.state.tags, this.state.tagInput.toLowerCase()];
      this.setState({ tags: newArr, tagInput: "" });
      localStorage.setItem("sports", JSON.stringify(newArr));
    } else {
      this.setState({ tagInput: "" });
    }
  };

  render() {
    let editableFields = [];
    if (this.props.user) {
      editableFields = [
        {
          cat: "Namn",
          val: `${this.props.user.firstname} ${this.props.user.lastname}`,
        },
        { cat: "Email", val: this.props.user.email },
      ];
    }
    return (
      <Box className="content_container">
        <Box className={styles.banner}>
          <Box className={styles.profileImgWrapper}>
            <Avatar
              sx={{ bgcolor: "#c97d5c", width: 100, height: 100, fontSize: 75 }}
              alt={
                this.props.user &&
                `${this.props.user.firstname} ${this.props.user.lastname}`
              }
              src="/broken-image.jpg"
            />
          </Box>
          <Box className={styles.profileDetailsWrapper}>
            <Typography
              component="span"
              sx={{ fontWeight: "bold" }}
              variant="h4"
            >
              {this.props.user &&
                `${this.props.user.firstname} ${this.props.user.lastname}`}
            </Typography>
            <Typography component="span" variant="body1">
              <Email sx={{ verticalAlign: "middle" }} />{" "}
              {` ${this.props.user && this.props.user.email}`}{" "}
            </Typography>
          </Box>
        </Box>
        <CustomTabs tabs={tabs}>
          <Box className={styles.tabPanel}>
            <Box className={styles.tagWrapper}>
              <Box className={styles.tagContainer} spacing={1}>
                {this.state.tags.map((sport, i) => (
                  <Chip
                    key={i}
                    label={sport}
                    variant="outlined"
                    onDelete={() => this.handleDeleteTag(sport)}
                  />
                ))}
              </Box>
              <CustomInput
                type="add"
                endAdornmentClick={this.addTag}
                label="Lägg till en tag"
                error={this.state.tagError}
                value={this.state.tagInput}
                checkForEnter={(code) => {
                  if (code === "Enter") {
                    this.addTag();
                  }
                }}
                onChange={(value) => this.setState({ tagInput: value })}
              />
            </Box>
          </Box>

          <Box className={styles.tabPanel}>Saved</Box>

          <Box className={styles.tabPanel}>
            <Box className={styles.infoWrapper}>
              {editableFields.map((field, i) => (
                <Box className={styles.infoBox}>
                  <Box className={styles.cat}>{field.cat}</Box>
                  <Box className={styles.val}>{field.val}</Box>
                  <Box className={styles.arrowIcon}>
                    <ArrowForwardIos sx={{ verticalAlign: "middle" }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </CustomTabs>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.userReducers.user };
}

function mapDispatchToProps(dispatch) {
  return {
    set_user: (user) => dispatch(userAdd(user)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
