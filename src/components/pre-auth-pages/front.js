import React, {useContext} from 'react'
import Button from '@material-ui/core/Button';
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useHistory} from 'react-router-dom';
import useStyles from './styles';
import { UserContext } from '../../UserContext';
import { AuthContext } from '../../AuthContext';
import {PostContext} from '../../PostContext';

export const Front = () => {
    const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { post, setPost } = useContext(PostContext);

    const history = useHistory();
    const handleRedirectSignin = () => {
        history.push('/signin');
            setUser(null);
            setAuth(false);
            setPost({arr: []});
    }
    const handleRedirectSignup = () => {
        history.push('/signup');
        setUser(null);
        setAuth(false);
        setPost({arr: []});
    }
    const classes = useStyles();
    
    return (
        <div className={classes.bodyDiv}>
            <div className={classes.pageContainer}>
                <div>
                <div className={classes.logoFont}>
                <FontAwesomeIcon color="#81ecec" size='10x' icon={faSchool} />
                </div>
                <div>
                    <h1 className={classes.headingFont}> E - Classroom </h1>
                </div>
                <div className={classes.buttonContainer}>
                <Button variant="contained" className={classes.buttonStyles} color="secondary" onClick={handleRedirectSignin}> Sign In </Button>
                <Button variant="contained" className={classes.buttonStyles} color="primary" onClick={handleRedirectSignup}> Sign Up </Button>
                
                {/* <Button variant="contained" className={classes.buttonStyles} color="light" href="/dashboard"> Dashboard </Button> */}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Front