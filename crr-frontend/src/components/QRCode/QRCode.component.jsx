import React from 'react';
import QRCode from "qrcode.react"

const QRCodeComponent = (props) => {
    return(
        <QRCode value={props.link} />
    )
}

export default QRCodeComponent;
