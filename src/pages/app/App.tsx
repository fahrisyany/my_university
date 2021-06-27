import React from "react";
import AuthPage from '../../layout/auth-layout/AuthLayout'
import { makeStyles, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ApplicationBar from '../../components/applicationBar/ApplicationBar'
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Drawer, ProvideDrawer } from "../../components/drawer/Drawer"
import { ProvideSideNav, SideNav } from "../../components/sideNav/SideNav"
import { ProvideSnackbar, CustomizedSnackbars } from "../../components/customSnackbar/CustomizedSnackbar"
import { ProvideAuth, PrivateRoute, PublicRoute } from '../../services/authService'
import MainLayout from '../../layout/main-layout/MainLayout'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#ffff",
      position: "relative",
      maxWidth: 480,
      width: "100%",
      boxSizing: "border-box",
      minHeight: `100vh`,
      margin: "0 auto",
      padding: theme.spacing(14, 0, 20),
      overflow: 'auto',
    },
    mainContent: {
      paddingTop: "56px"
    }
  }));

const theme = createMuiTheme({
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: '9px'
      }
    }
  },
  spacing: 4,
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#6c63ff',
    },
    secondary: {
      main: '#020102',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <section className={`${classes.root} layout-column`}>
        <ProvideSnackbar>
          <ProvideAuth>
            <Router>
              <ProvideSideNav>
                <ApplicationBar />
                <CustomizedSnackbars />
                <ProvideDrawer>
                  <Switch>
                    <PublicRoute path="/auth">
                      <AuthPage />
                    </PublicRoute>
                    <PrivateRoute path="/">
                      <MainLayout />
                    </PrivateRoute>
                    <Redirect to={{ pathname: "/auth/login" }} />
                  </Switch>
                  <Drawer />
                  <SideNav />
                </ProvideDrawer>
              </ProvideSideNav>
            </Router>
          </ProvideAuth>
        </ProvideSnackbar>
      </section>
    </ThemeProvider>
  );
}

export default App;
