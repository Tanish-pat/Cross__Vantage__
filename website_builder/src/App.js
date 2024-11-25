import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import LandingPage from './components/LandingPage';
import WebBuilderPage from './components/WebBuilderPage';
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/webpage" element={<WebBuilderPage />} />
                </Routes>
            </Router>
        </ThemeProvider>

    );
}

export default App;
