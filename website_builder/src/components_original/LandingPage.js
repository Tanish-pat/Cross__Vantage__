// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Root, ContentContainer, Title, Subtitle, StyledButton, DescriptionText } from './JointStyles.js';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Root>
            <ContentContainer>
                <Title>Welcome to Our Website Builder</Title>
                <Subtitle>Your gateway to seamless solutions</Subtitle>
                <DescriptionText>
                    Access personalized features, track your progress, and join our community.
                    We're here to make your experience as intuitive and enjoyable as possible.
                </DescriptionText>
                {/* <StyledButton
                    variant="contained"
                    onClick={() => navigate('/login')}
                >
                    Login
                </StyledButton>
                <StyledButton
                    variant="contained"
                    onClick={() => navigate('/register')}
                    style={{ marginLeft: '10px' }}
                >
                    Register
                </StyledButton> */}
                <StyledButton
                    variant="contained"
                    onClick={() => navigate('/webpage')}
                    style={{ marginLeft: '10px' }}
                >
                    Start Building
                </StyledButton>
            </ContentContainer>
        </Root>
    );
};

export default LandingPage;