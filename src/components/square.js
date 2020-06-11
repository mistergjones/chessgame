// This square.js component will be used to estabilsh each individual square as button. The button will need to support an onClick event.

import React from "react";

import "../index.css";

export default function Square(props) {
    return (
        <button
            className={"square " + props.shade}
            onClick={props.onClick}
            style={props.style}
        ></button>
    );
}
