import React, {useEffect, useState} from 'react';
import axios from "axios";
import {InputLabel, MenuItem, Select} from "@mui/material";
import FormControl from '@mui/material/FormControl';

const SelectClimbingGym = () => {
    const [gyms, setGyms] = useState([]);
    const [selectedGym, setSelectedGym] = useState(0)
    const getClimbingGyms = () => {
        return axios.get("https://api.plutodev.de/crr/gyms")
            .then((response) => {
                setGyms(response.data)
            })
    }

    useEffect(() => {
        getClimbingGyms()
    }, []);

    const listOfGyms = gyms.map((gym) =>
        <MenuItem key={gym.gym_id} value={gym.gym_id}>{gym.name}</MenuItem>
    );

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">Climbing Gym</InputLabel>
            <Select
                    label="Climbing Gym"
                    value={selectedGym}
                    fullWidth
                    onChange={(event) => setSelectedGym(event.target.value)}>
                {listOfGyms}
            </Select>
        </FormControl>
    )
}

export default SelectClimbingGym;
