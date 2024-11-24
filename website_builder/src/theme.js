// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Purple accent
            dark: '#9c4dcc',
            light: '#cf94da',
        },
        background: {
            default: '#121212', // Dark background
            paper: '#1d1d29', // Dark with slight purple tint
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
});

export default theme;
