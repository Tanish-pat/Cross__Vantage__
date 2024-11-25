import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

export const Root = styled(Box)(({
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5vh',
    backgroundColor: '#121212',
    color: 'white',
    position: 'fixed',
}));

export const ContentContainer = styled(Container)(({ theme }) => ({
    textAlign: 'center',
    backgroundColor: 'rgba(29, 29, 41, 0.9)',
    padding: theme.spacing(5),
    width: '100%',
    maxWidth: 480,
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
}));

export const Title = styled(Typography)(({ theme }) => ({
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#bb86fc',
    marginBottom: theme.spacing(2),
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.2rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    color: '#a1a1b5',
    marginBottom: theme.spacing(3),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    padding: theme.spacing(1, 3),
    backgroundColor: '#7e57c2',
    color: 'white',
    '&:hover': {
        backgroundColor: '#5e35b1',
    },
}));

export const LoginContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    color: 'white',
    width: '100vw',
    height: "100vh",
    overflow: 'hidden',
    position: 'fixed',
});

export const RegisterContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    color: 'white',
    height: "100vh",
    width: '100vw',
    overflow: 'hidden',
    position: 'fixed',
});

export const FormContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '100%',
    padding: theme.spacing(4),
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(48, 48, 48, 0.9)',
    color: 'white',
}));

export const LogoutBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    top: theme.spacing(200),
    right: theme.spacing(200),
}));

export const ClerkUrlInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2),
    width: '100%',
    backgroundColor: 'rgba(48, 48, 48, 0.9)',
    borderRadius: theme.spacing(1),
}));

export const ClerkDashboardButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    padding: theme.spacing(1, 3),
    backgroundColor: '#7e57c2',
    color: 'white',
    '&:hover': {
        backgroundColor: '#5e35b1',
    },
}));

export const ClerkDashboardContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(48, 48, 48, 0.9)',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 600,
    boxShadow: theme.shadows[5],
    paddingBottom: theme.spacing(12),
    paddingTop: theme.spacing(12),
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(14),
}));

export const ClerkSidebar = styled(Box)(({ theme }) => ({
    width: 250,
    backgroundColor: '#1e1e1e',
    padding: theme.spacing(3),
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.4)',
}));

export const ClerkSidebarItem = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
        color: '#bb86fc',
    },
}));

export const UserSidebar = styled(Box)({
    width: 200,
    backgroundColor: '#333',
    color: '#fff',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
});

export const UserSidebarItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: '#444',
    borderRadius: 4,
    marginBottom: 8,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#555',
    },
});

export const UserDashboardContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    width: '100%',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

export const ChatBox = styled(Box)({
    height: '70vh',
    width: '70vw',
    overflowY: 'auto',
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    padding: '16px',
});

export const MessageContainer = styled(Box)(({ isUser }) => ({
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    margin: '8px 0',
    padding: '8px 12px',
    borderRadius: '8px',
    maxWidth: '100%',
    wordBreak: 'break-word',
    backgroundColor: isUser ? '#3f51b5' : '#555',
    color: 'white',
}));

export const MessageInput = styled(TextField)({
    backgroundColor: '#333',
    borderRadius: '4px',
    marginRight: '8px',
    '& .MuiInputBase-root': {
        color: 'white',
    },
});

export const SendButton = styled(Button)({
    minWidth: '40px',
    minHeight: '40px',
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: '#303f9f',
    },
});

export const TopRightButton = styled(Button)({
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
        backgroundColor: '#303f9f',
    },
});


export const SidebarRoot = styled(Box)(({ theme }) => ({
    width: '300px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    maxHeight: '80vh',
    overflowY: 'auto',
}));

export const SidebarTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

export const SidebarList = styled(List)(({ theme }) => ({
    width: '100%',
    padding: 0,
}));

export const SidebarListItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

export const SidebarTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': { backgroundColor: '#555', color: '#fff' },
    '& .MuiInputLabel-root': { color: '#aaa' },
}));

export const SidebarButton = styled(Button)(({ theme }) => ({
    alignSelf: 'flex-end',
}));

export const SidebarDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: '#555',
}));