import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from "react-router-dom";
import BussinessUserPool from "../../utils/BussinessUserPool";
import {useState} from "react";
import axios from "axios";

const theme = createTheme();

export default function SignUpBusiness() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [business, setBusiness] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    const generateJsonData = ()=> {
        return {
            "TableName": "BusinessUserDB",
            "Item": {
                "businessId": {
                    "S": email
                },
                "businessName": {
                    "S": business
                },
                "email": {
                    "S": email
                },
                "address": {
                    "S": address
                },
                "description": {
                    "S": description
                }
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        BussinessUserPool.signUp(email, password, [], null, (err, data) => {
            if (err){
                console.error(err);
            } else{
                alert('Thank you for registering. Check your email for a verification link then log back in')
            }
        });

        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/post', generateJsonData())
            .then(response => {
                console.log(response)
            })

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" style={{marginBottom : '14.5em'}}>
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
                        Business Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="business"
                                    label="Name of your business"
                                    type="input"
                                    id="business"
                                    value={business}
                                    onChange={event => setBusiness(event.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="address"
                                    label="Business Address"
                                    type="address"
                                    id="address"
                                    value={address}
                                    onChange={event => setAddress(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    name="description"
                                    label="Describe your business"
                                    type="input"
                                    id="description"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{backgroundColor : 'mediumseagreen'}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/BusinessLogin"> Already have an account? Sign In</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}