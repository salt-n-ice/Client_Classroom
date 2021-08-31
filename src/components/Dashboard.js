import React, { useState, useContext } from 'react'
// import { faSchool } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Toolbar from "@material-ui/core/Toolbar";
// import AppBar from "@material-ui/core/AppBar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import MenuIcon from "@material-ui/icons/Menu";
import Navbar from './navbar'
import Sidebar from './sidebar'
import ClassCard from './class_card'
import { UserContext } from '../UserContext'
import { AuthContext } from '../AuthContext'
import { PostContext } from '../PostContext'
import {Redirect} from 'react-router-dom'

export const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const {post, setPost} = useContext(PostContext);
  if(!auth){
    setUser(null);
    setPost({arr : []});
  }
  // console.log(user);
  //get all the classes linked to the current user.
  //use for loop to show them in the similar fashion as below.

  

    // const drawerItems = [
    //     {text: }
    // ]

    // anchor="left" variant="temporary" onClose={toggleDrawer} open={drawerOpen}
    const classes_style = {marginBottom: "80px"}

    return (
        <div>
      
        {/* <Navbar /> */}
        <div style={classes_style}>
            <Sidebar />
        </div>
        
        <div>
        {auth ? (console.log("...")) : (<Redirect to="/signin"/>)}
      {post.arr.map((c)=>(

        <ClassCard
              creatorName={c.ownerName}
              creatorPhoto="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTUxNzIxODgzNTg5NDIwMzAw/pewdiepie_gettyimages-501661286.jpg"
              name={c.name}
              id={c.id}
              style={{ margin: 15 }}
            />
      ))}
        </div>
      
        </div>
    )
}

export default Dashboard