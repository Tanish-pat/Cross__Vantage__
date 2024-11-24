import React from 'react';
import Grid2 from '@mui/material/Grid';
import { Title, Subtitle } from './JointStyles.js';

const Header = () => (
    <Grid2 item xs={12}>
        <Title>Web Builder</Title>
        <Subtitle>Drag and drop to create your webpage</Subtitle>
    </Grid2>
);

export default Header;
