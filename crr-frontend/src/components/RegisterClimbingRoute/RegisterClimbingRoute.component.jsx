import React, {useEffect, useState} from 'react';
import QRCodeComponent from "../QRCode/QRCode.component";
import Button from '@mui/material/Button';
import axios from "axios"

const RegisterClimbingRouteComponent = () => {
    const [gyms,setGyms] = useState([]);
    const [selectedGym, setSelectedGym] = useState(0)
    const getClimbingGyms = () =>
        {
            return axios.get("https://api.plutodev.de/crr/gyms")
                .then((response) => {
                    setGyms(response.data)
                })
        }

    useEffect(() => {
        getClimbingGyms()
    }, []);

    const listOfGyms = gyms.map((gym) =>
        <option key={gym.gym_id} value={gym.gym_id}>{gym.name}</option>
    );

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return(
        <form onSubmit={handleSubmit}>
        <h2>Register Your Climbing Route!</h2>
        <select value={selectedGym} onChange={(event) => setSelectedGym(event.target.value)}>
            <option value={0}>Select Your Gym</option>
            {listOfGyms}
        </select>
            <input type="text" placeholder="What is the name of the route"/>
        <input type="text" placeholder="Difficulty of the route"/>
            <input type="submit" value="Submit" />
            <Button variant="contained" id="submit-button" >Submit</Button>
            <QRCodeComponent link="www.google.com"/>
        </form>
    );
}

export default RegisterClimbingRouteComponent;
