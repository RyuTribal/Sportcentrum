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
import con_styles from "../styles/containers.module.css"
import font_styles from "../styles/fonts.module.css"

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
      <Box className={con_styles.content_container}>
        <Grid container spacing={2}>
          {this.state.rss_feed.map((rss) => (
            <Grid sx={{display: 'flex'}} item xs={12} sm={6} md={4} >
              <Card className={con_styles.card_grid}>
                <CardActionArea href={rss.link} target="_blank">
                  <CardMedia
                    component="img"
                    height="200"
                    image={rss.enclosure.url}
                    alt="article image"
                  />
                  <CardContent>
                    <Typography variant="h6">{rss.title}</Typography>
                    <Box sx={{marginTop:1}} className={`${con_styles.flexed} ${con_styles.direction_row} ${con_styles.center_vertical}`}>
                      <Typography className={`${con_styles.two_grid}`} variant="caption">Aftonbladet</Typography>
                      <Typography className={`${con_styles.two_grid} ${font_styles.right}`} variant="caption">
                        {formatDate(rss.isoDate, "sv-SE")}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default withRouter(Home);
