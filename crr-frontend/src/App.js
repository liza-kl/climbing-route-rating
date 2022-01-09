import './App.css';

import RegisterClimbingRouteComponent from "./components/RegisterClimbingRoute/RegisterClimbingRoute.component";
import {Grid} from "@mui/material";

function App() {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
           <RegisterClimbingRouteComponent/>
        </Grid>
    </Grid>
  );
}

export default App;
