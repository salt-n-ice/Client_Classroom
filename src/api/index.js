import axios from 'axios'
import { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import {AuthContext} from '../AuthContext'

const url = 'https://e-kaksha.herokuapp.com/home'

export const signUp = (newUser) => axios.post(url+"/signup",newUser).then((res) => {
    
    const {user, setUser} = useContext(UserContext);
    const {auth, setAuth} = useContext(AuthContext);
    let ok = res.data.Authenticated;
    console.log(ok);
    if(ok){
        setAuth(true);
        console.log(user.email);
    }
    else{
        console.log("here");
        setUser(null);
    }
})
.catch(err => console.log(err))
export const signIn = (User) => axios.post(url+"/signin",User)
export const Dashboard = () => axios.get(url)

// effect, state context and store