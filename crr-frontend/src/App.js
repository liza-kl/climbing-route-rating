import './App.css';

import RegisterClimbingRouteComponent from "./components/RegisterClimbingRoute/RegisterClimbingRoute.component";
import {Grid, Stack} from "@mui/material";

function App() {
  return (
    <Grid container spacing={2}
          className="App"
          justifyContent="center"
          alignItems="center">
        <Grid item xs={12} md={4}>
           <RegisterClimbingRouteComponent/>
        </Grid>
    </Grid>
  );
}

export default App;
