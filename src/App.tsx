import { primaryColor } from "colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Home from "Home";

const App = () => {
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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
