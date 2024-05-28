// src/components/Login.jsx


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { useNavigate } from 'react-router-dom';
import useStyles from '../styless/Login';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function LoginForm() {
    const [currentUser, setCurrentUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    const navigate = useNavigate();

    function submitLogin(e) {
        e.preventDefault();
        client.post(
            "/users/login/",
            {
                email: email,
                password: password
            }
        ).then(function(res) {
            setCurrentUser(res.data.user);  // Set current user data
            localStorage.setItem('currentUser', JSON.stringify(res.data.user));  // Store user email in localStorage
        });
    }

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setCurrentUser(storedUser);
            setTimeout(() => {
                navigate('/'); // Перенаправление на страницу main через 2 секунды
            }, 1000);
        }
    }, []);

    if (currentUser) {
        return (
            <div>
                <div className="center">
                    <h2>You're logged in!</h2>
                    <p>Email: {currentUser.email}</p>
                </div>
            </div>
        );
    }
  return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={e => submitLogin(e)}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password1"
                label="Password"
                name="password1"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          {/* Copyright */}
        </Box>
      </Container>
  );
}

export default LoginForm;
