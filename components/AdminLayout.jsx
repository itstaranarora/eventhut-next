import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Drawer,
  Container,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useState } from "react";
import {
  Search,
  ExitToApp,
  SignalCellularNullRounded,
} from "@material-ui/icons";
import GroupIcon from "@material-ui/icons/Group";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "context/AuthContext";

const drawerWidth = 300;

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    zIndex: 111,
  },
  toolbar: {
    paddingRight: 24,
    display: "flex",
    justifyContent: "space-between", // keep right padding when drawer closed
  },
  logo: {
    height: 42,
    objectFit: "contain",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: "100vh",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: 0,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  bio: {
    width: "100%",
    padding: "12px 1rem",
  },
  bioProfile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stat: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1.2rem 1rem 0.5rem 1rem",
    alignItems: "center",
  },

  statItem: {
    textAlign: "center",
  },
  search: {
    border: "none",
    outline: "none",
    color: theme.palette.text.primary,
    fontSize: 15,
    marginLeft: 16,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    "& img": {
      borderRadius: "50%",
      padding: 3,
      background: theme.palette.background.default,
    },
    background: theme.palette.primary.main,
    padding: 3,
  },
}));

export default function Layout({ children }) {
  const { user, logoutUser } = useAuth();
  const classes = useStyle();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="secondary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <Avatar
              style={{ height: 32, width: 32, marginLeft: 15 }}
              src={user?.ProfileURL}
            /> */}
            <Typography
              style={{ marginLeft: 20, color: "#000" }}
              variant="body1"
            >
              Welcome {user.email}
            </Typography>
          </div>
        </Toolbar>
        {/* <Divider /> */}
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Hidden smDown>
            <Link href="/">
              <img className={classes.logo} src="/Logo.svg" alt="logo" />
            </Link>
          </Hidden>
          <Hidden mdUp>
            <Typography variant="subtitle1">Navigation</Typography>
          </Hidden>
          <Hidden mdUp>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon color="secondary" />
            </IconButton>
          </Hidden>
        </div>
        <Divider />
        <div style={{ padding: "1rem" }}>
          <List component="nav">
            <Link
              exact
              href="/dashboard"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <ListItem button>
                <ListItemIcon color="inherit">
                  <DashboardIcon color="inherit" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            {/* <Link
              href="/dashboard/create"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Create Event" />
              </ListItem>
            </Link> */}
          </List>
        </div>
        <Divider />
        <div style={{ padding: "1rem" }}>
          <ListItem
            button
            onClick={() => {
              logoutUser();
            }}
          >
            <ListItemIcon>
              <ExitToApp color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
}
