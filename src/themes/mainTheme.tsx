import {createTheme} from "@mui/system";

export const mainTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#2e7d32',
        },
        secondary: {
            main: '#cbc16d',
            light: '#e0dfd9',
        },
        background: {
            default: '#97BC62',
            paper: '#2C5F2D',
        },
        info: {
            main: '#2196f3',
        },
    },
});