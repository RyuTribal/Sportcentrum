import * as React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../material-ui-themes/theme";
import createEmotionCache from "../material-ui-themes/createEmotionCache";
import NavBar from "../components/NavBar/NavBar";
import BottomNavBar from "../components/BottomNavBar/BottomNavBar";
import { Toolbar } from "@mui/material";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
import "../styles/general.css";


// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const { pathname } = router;

  //Place paths where header should be invisible here
  const noNav = ["/splash"];
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, 
                consistent, and simple baseline to
                build upon. */}

        <CssBaseline />
        <Provider store={store}>
          {noNav.includes(pathname) ? null : <NavBar />}
          {noNav.includes(pathname) ? null : <Toolbar />}

          <Component {...pageProps} />

          {noNav.includes(pathname) ? null : <Toolbar />}
          {noNav.includes(pathname) ? null : <BottomNavBar />}
        </Provider>
      </ThemeProvider>
      <style jsx global>{`
        html {
          height: 100%;
        }
        body {
          height: 100%;
        }

        #__next {
          height: 100%;
        }
      `}</style>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
