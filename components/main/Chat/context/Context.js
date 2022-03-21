import React from "react";
import {theme} from "../../../utils";

const Context = React.createContext({
    theme,
    rooms: [],
    setRooms: () => {},
    unfilteredRooms: [],
    setUnfilteredRooms: () => {}
});

export default Context;