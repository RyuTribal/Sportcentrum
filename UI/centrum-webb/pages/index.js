import React, { Component } from "react";
import { withRouter } from "next/router";
import { getRssFeed } from "../api_calls/rss";
import { formatDate } from "../redundant_functions/format_date";
import {
  CardActionArea,
  Card,
  Typography,
  Box,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      rss_feed: [],
    };
  }
  componentDidMount = async () => {
    if (!localStorage.getItem("hasPicked")) {
      this.props.router.push({
        pathname: "/splash",
      });
    } else {
      let sports = JSON.parse(localStorage.getItem("sports"));
      let feed = await getRssFeed(sports);
      this.setState({ rss_feed: feed });
    }
  };
  render() {
    return (
      <Grid container spacing={2}>
        {this.state.rss_feed.map((rss, i) => (
          <Grid key={i} sx={{ display: "flex" }} item xs={12} sm={6} md={4}>
            <Card sx={{ width: "100%" }}>
              <CardActionArea
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                href={rss.link}
                target="_blank"
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={rss.image}
                  alt="article image"
                />
                <CardContent sx={{ alignSelf: "flex-start" }}>
                  <Typography variant="h6">{rss.title}</Typography>
                </CardContent>
                <CardContent sx={{ width: "100%", marginTop: "auto" }}>
                  <Box
                    sx={{ width: "100%" }}
                    className={`flexed direction_row center_vertical`}
                  >
                    <Typography
                      className={`two_grid`}
                      variant="caption"
                    >
                      Aftonbladet
                    </Typography>
                    <Typography
                      className={`two_grid right-aligned-text`}
                      variant="caption"
                    >
                      {formatDate(rss.isoDate, "sv-SE")}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withRouter(Home);
