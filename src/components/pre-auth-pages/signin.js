import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux'
import { signUp, signIn } from '../../actions/users'
import { UserContext } from '../../UserContext';
import { AuthContext } from '../../AuthContext';
import {PostContext} from '../../PostContext';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        DE-Zine
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { post, setPost } = useContext(PostContext);
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    //axios request to the backend
    const url = 'https://e-kaksha.herokuapp.com/home/signin';
    axios.post(url, userData)
      .then((res) => {
        let ok = res.data.Authenticated;
        let userId = res.data.userId;
        let userName  = res.data.userName;
        let newArr = res.data.hist;
        console.log(userName);
        console.log(newArr);
        console.log(ok);
        if (ok) {
          setAuth(true);
          setUser({id : userId, email : userData.email,firstName : userName, password : userData.password});
          setPost({arr : newArr});
          console.log("its ok");
          console.log(newArr);
        }
        else {
          setAuth(false);
          setUser(null);
          setPost({arr : []});
          console.log("its not ok");
        }
        
      })
      .catch(err => console.log(err));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {auth ? (<Redirect to="/dashboard" />) : (console.log("..."))}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setUserData({ ...userData ,email: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setUserData({ ...userData ,password: e.target.value })}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}