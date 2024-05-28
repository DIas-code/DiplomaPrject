import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
        width: '100%',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    detailItem: {
        marginBottom: theme.spacing(2),
    },
}));

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function Profile() {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setIsLoggedIn(true);
            setUserName(userData.name);
            setUserEmail(userData.email);
            setUserSurname(userData.surname);
            setUserPhone(userData.phone_number);
        }
    }, []);

    return (
        <Container className={classes.container} maxWidth="sm">
            <Avatar className={classes.avatar}>
                <PersonIcon />
            </Avatar>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <Paper className={classes.paper} elevation={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} className={classes.detailItem}>
                        <Typography variant="h6">Name: {userName}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.detailItem}>
                        <Typography variant="h6">Surname: {userSurname}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.detailItem}>
                        <Typography variant="h6">Email: {userEmail}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.detailItem}>
                        <Typography variant="h6">Phone Number: {userPhone}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Profile;
