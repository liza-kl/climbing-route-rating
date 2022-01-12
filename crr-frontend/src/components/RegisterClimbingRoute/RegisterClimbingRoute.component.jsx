import React, {useEffect, useRef, useState} from 'react';
import QRCodeComponent from "../QRCode/QRCode.component";
import Button from '@mui/material/Button';
import {Stack, TextField} from "@mui/material";
import SelectClimbingGym from "../SelectClimbingGym/SelectClimbingGym.component";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const RegisterClimbingRouteComponent = () => {
    const [qrCodeReady,setQrCodeStatus] = useState(false);
    const [qrLink, setQRLink] = useState('')
    const [routeName,setRouteName] = useState('');
    const [token, setToken] = useState(null);
    const [difficulty, setDifficulty] = useState('');
    const captchaRef = useRef(null);

    /**
     * Configurations that the hcaptcha loads correctly
     */
    const onLoad = () => {
        captchaRef.current.execute();
    };

    /**
     * Run Captcha only once
     */
    useEffect(() => {
        if (token)
            console.log(`hCaptcha Token: ${token}`);

    }, [token]);

    /**
     * Returns the generated route_id for the upcoming QR-Code
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://api.plutodev.de/crr/routes',null, { params:{
                gym_id: '1', //gave the values directly for testing @TODO pass correct props
                name: routeName.toString(),
                difficulty: difficulty.toString(),
                hcaptcha_response: token
            }})
            .then(function (response) {
                let route_id = response.data.route_id;
                setQrCodeStatus(true)
                setQRLink('https://api.plutodev.de/crr/routes/'+ route_id)
            })
            .catch(function (error) {
                console.log('An error occured: '+ error);
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
            {qrCodeReady ? <QRCodeComponent link={qrLink}/> : console.log("QR Code couldn't be created")}
        </Stack>
        </form>
    );
}

export default RegisterClimbingRouteComponent;
