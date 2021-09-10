import { primaryColor } from "common/colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Home from "Home";
import Room from "Room";

const theme = createTheme({
  palette: {
    primary: primaryColor,
    secondary: {
      main: "#089df4",
    },
  },
  typography: {
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/room">
            <Room />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export { App };
