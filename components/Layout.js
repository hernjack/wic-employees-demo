import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar, Toolbar, Typography, Container, Link
} from '@mui/material';
import classes from '../styles/Layout.module.css';


const Layout = ({ title, description, children }) => {
  return (
    < div className={classes.Layout} >
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <div className={classes['main-link']}>{title}</div>
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
        {children}
      </Container>
      <footer>
        <Typography>All rights reserved. Jayson Hernandez. 2022</Typography>
      </footer>
    </div >
  )
}

export default Layout;