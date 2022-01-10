import React, {useEffect, useRef, useState} from 'react';
import QRCodeComponent from "../QRCode/QRCode.component";
import Button from '@mui/material/Button';
import {Stack, TextField} from "@mui/material";
import SelectClimbingGym from "../SelectClimbingGym/SelectClimbingGym.component";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const RegisterClimbingRouteComponent = () => {
    const [qrCodeReady,setQrCodeStatus] = useState(false);
    const [routeName,setRouteName] = useState('');
    const [token, setToken] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const captchaRef = useRef(null);

    /**
     * Configurations that the hcaptcha loads correctly
     */
    const onLoad = () => {
        captchaRef.current.execute();
    };

    useEffect(() => {

        if (token)
            console.log(`hCaptcha Token: ${token}`);

    }, [token]);

    /**
     * Returns the generated route_id for the upcoming QR-Code
     */
    const handleSubmit = (event) => {
       return axios.post('https://api.plutodev.de/crr/routes', {
            gym_id: '1',
            name: routeName.toString(),
            difficulty: difficulty.toString(),
            hcaptcha_response: token.toString()
        })
            .then(function (response) {
                setQrCodeStatus(true)
                console.log(response.route_id);
                event.preventDefault();

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2} mr={2} ml={2} justifyContent="center">

        <h2>Register Your Climbing Route!</h2>
            <SelectClimbingGym />
            <TextField id="outlined-basic" label="Name of Route" variant="outlined" value={routeName} onChange={(e) => setRouteName(e.target.value)} />
            <TextField id="outlined-basic" label="Difficulty of Route" variant="outlined" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
            <HCaptcha
                sitekey="7368614f-91e7-48b9-ac30-2375949c2b80"
                onLoad={onLoad}
                onVerify={setToken}
                ref={captchaRef}
            />
            <Button variant="contained" id="submit-button" type="submit">Submit</Button>
            {qrCodeReady ? <QRCodeComponent link="www.google.com"/> : undefined}
        </Stack>
        </form>
    );
}

export default RegisterClimbingRouteComponent;
