//REACT
import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArchiveIcon from '@material-ui/icons/Archive';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';

import { UserContext } from '../UserContext';
import { AuthContext } from '../AuthContext';
import {PostContext} from '../PostContext';
import axios from 'axios';
//MUI COMPONENTS
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    Typography,
    ListItemText,
    ListItemIcon,
    makeStyles,
} from '@material-ui/core';
//MUI ICONS
import {Menu as MenuIcon, List as ListIcon, Label as LabelIcon} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    menuIcon: {
        marginRight: theme.spacing(2),
    },
    list:     {
        width: '250px',
    },
    link:     {
        textDecoration: 'none',
        color:          'grey'
    },
    brand:     {
        textDecoration: 'none',
        color:          '#FFF'
    },
}));

const Sidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { post, setPost } = useContext(PostContext);
  const [classData, setClassData] = useState({
    className: ''
  })
  // console.log(user);
    //styles
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleChange = (event) => {
    //   setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [openIt, setOpen] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleCreateModal = ()=> {
    //
    setOpen(false);
  }

    //state
    const [drawerOpen, setDrawerOpen] = useState(false);

    //functions
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    const handleSubmit = async(e) => {
      e.preventDefault();
      //axios request to the backend
      const url = 'https://e-kaksha.herokuapp.com/home/createClass';
      axios.post(url, {name : classData.className, ownerId : user.email, ownerName : user.firstName})
        .then((res) => {
          let ok = res.data.Success;
          let classId = res.data.classId;
          console.log(ok);
          if (ok) {
            //append a new card to the list of cards
            console.log("class created with id : " + classId + ".");
            setPost({arr : [...post.arr, {ownerName : user.firstName, name : classData.className, id : classId}]});
          }
          else {
            console.log("class not created.");
          }
        })
        .catch(err => console.log(err));
    }
    const handleLogout = async(e)=>{
      e.preventDefault();
      setUser(null);
      setAuth(false);
      setPost({arr : []});
    }
    const drawerItems = [
        {
            text: 'To Do',
            icon: <ListIcon/>,
            link: '/list',
        },
        {
            text: 'Favourite Classes',
            icon: <LabelIcon/>,
            link: '/tag-list',
        },
        {
            text: 'Settings',
            icon: <SettingsIcon/>,
            link: '/tag-list',
        },
        {
            text: 'Archived Classes',
            icon: <ArchiveIcon/>,
            link: '/tag-list',
        },
        {
            text: 'Calender',
            icon: <CalendarTodayIcon/>,
            link: '/tag-list',
        },
    ];

    const navMenu_color = { color: "grey" }
    const navBrand_color = { color: "#2B2B2B" }
    // color inherit

    return (
        <div>
            <AppBar position="fixed" color="white">
            <Toolbar>
                <IconButton onClick={toggleDrawer} style={navMenu_color} className={classes.menuIcon} edge="start"><MenuIcon/></IconButton>
                <Link className={classes.brand} to="/dashboard"> 
                    <Typography style={navBrand_color} variant="h6"> E - Classroom </Typography>
                </Link>
                <Box flexGrow={1}/>
                
                <div>

              {/* PLUS ICON TO ADD NEW CLASS */}

               {/* <div> */}
               <IconButton
                aria-label="Add new Classroom"
                // aria-controls="menu-appbar"
                // aria-haspopup="true"
                // onClick={handleMenu}
                color="grey"
                onClick={handleClickOpenModal}
              >
                <AddIcon />
              </IconButton>

              <Dialog fullWidth open={openIt} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> Create Classroom </DialogTitle>
        {/* join a class if student */}
          <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit} >
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Classroom Name"
            type="email"
            onChange={(e) => setClassData({ ...classData, className: e.target.value })}
            fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateModal} color="primary" type="submit">
            Create
          </Button> 
          {/* join if student */}
        </DialogActions>
            </form>
      </Dialog>
               {/* </div> */}

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="grey"
              >

                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}><span style={{color: 'red'}} >Log Out</span></MenuItem>
              </Menu>
            </div>

            </Toolbar>
            <Drawer anchor="left" variant="temporary" onClose={toggleDrawer} open={drawerOpen}>
                <List className={classes.list}>
                    {drawerItems.map(prop => (
                        <Link className={classes.link} to={prop.link} key={prop.text}>
                            <ListItem onClick={toggleDrawer} button>
                                <ListItemIcon>{prop.icon}</ListItemIcon>
                                <ListItemText>{prop.text}</ListItemText>
                            </ListItem>
                            <Divider light />
                        </Link>
                    ))}
                </List>
            </Drawer>
            
        </AppBar>
        
        </div>

    );
};

export default Sidebar;