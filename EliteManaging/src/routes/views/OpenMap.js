import { Button } from "semantic-ui-react";
import {
    Routes,
    Route,
    Navigate, Link
} from "react-router-dom";
import Maps from "./Map";


function renderMap({businessName, businessAddress}) {
    return(
        <div>
            <h1>Welcome to {businessName}! Come visit us at {businessAddress}</h1>
            <Maps stringAddress = {businessAddress}></Maps>
            <Button
                icon='close'
                onClick={() => <Link to="/BusinessCards" style={{color: 'black'}}> BusinessCards </Link>}
                negative
            />
        </div>

    )






}


