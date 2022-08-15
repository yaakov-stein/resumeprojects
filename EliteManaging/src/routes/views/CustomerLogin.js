import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import CustomerUserPool from "../../utils/CustomerUserPool";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "@mui/material/Alert";


const theme = createTheme();

export default function SignInCustomer({customerAuth}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const customer = new CognitoUser({
            Username: email,
            Pool: CustomerUserPool
        });
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        customer.authenticateUser(authDetails, {
            onSuccess: data => {
                console.log("YOU LOGGED IN:", data);
                customerAuth(customer)
                localStorage.setItem('customer', JSON.stringify(customer))
                localStorage.setItem('userId', email);
                navigate("/CustomerProfile")
            },

            onFailure: err => {
                console.error("onFailure:", err);
                setErrorMessage('Incorrect username or password');
            },

            newPasswordRequired: data => {
                console.log("newPasswordRequired:", data);
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" style={{marginBottom : '25.5em'}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'mediumseagreen' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Customer Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{backgroundColor : 'mediumseagreen'}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to='/CustomerSignup'>Dont have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}