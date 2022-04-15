import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
  
// Create a theme instance.
const theme = createTheme({
    overrides:{
        MuiTab:{
            root:{
                fontColor: "#f44336"
            }
        }
    },
    palette: {
        primary: {
            main: '#c64d2c',
        },
        secondary:{
            main: "#f6f2ef"
        },
        error: {
            main: '#f44336',
        },
    },
});
  
export default theme;