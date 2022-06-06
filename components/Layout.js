import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar, Toolbar, Typography, Container, Link, Badge, Button, Menu, MenuItem,
} from '@mui/material';
import classes from '../styles/Layout.module.css';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
// import Cookies from 'js-cookie';
import Image from 'next/image'

const Layout = (props) => {
  const router = useRouter();
  const { state, dispatch, userInfo } = useContext(Store);
  const { cart } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    // Cookies.remove('userInfo');
    // Cookies.remove('cartItems');
    router.push('/');
  };
  return (
    < div className={classes.Layout} >
      <Head>
        <title>Employees-crud App</title>
        <title>{props.title ? `${props.title} - Next Amazona` : 'Next Amazona'}</title>
        {props.description && <meta name="description" content={props.description}></meta>}
      </Head>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <div className={classes['main-link']}>Employees-CRUD app</div>
          <div className={classes.grow}></div>
          <div className={classes.links}>
            <NextLink href="/about-us" passHref>
              <Link>
                About Us
              </Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>
        {props.children}
      </Container>
      <footer>
        <Typography>All rights reserved. Jayson Hernandez. 2022</Typography>
      </footer>
    </div >
  )
}

export default Layout;