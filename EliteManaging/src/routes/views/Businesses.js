import React, {useEffect, useState} from 'react'
import {Card, Grid, Segment} from "semantic-ui-react";
import '../../styles/Businesses.css';
import axios from "axios";
import {Link} from "react-router-dom";
import AllBusinessCards from "./AllBusinessCards";
import Navbar from "../components/Navbars/AuthNavbar";

function Businesses() {

    const [businesses, setBusinesses] = useState('');

    useEffect(() => {
        getAllBusinesses();
    }, []);

    const jsonData = {
        "TableName": "BusinessUserDB"
    }

    const getAllBusinesses = () => {
        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/scan', jsonData)
            .then(response => {
                console.log(response);
                const allBusinesses = response.data.Items;
                setBusinesses(allBusinesses);
            });
    }

    return (
        <div>
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1566807387450-b74aea0e727e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60')",
                    }}
                >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
            ></span>
                </div>
                <div className="container relative mx-auto">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div className="pr-12">
                                <h1 className="text-white font-semibold text-5xl">
                                    Participating Businesses
                                </h1>
                                <p className="mt-4 text-lg text-blueGray-200">
                                    Don't see your favorite business? Contact Us
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style={{ transform: "translateZ(0)" }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="text-blueGray-200 fill-current"
                            points="2560 0 2560 100 0 100"
                        ></polygon>
                    </svg>
                </div>
            </div>
            <Segment className='segment' style={{display: 'flex'}}>
                <Grid className='main' columns={1} relaxed='very'>
                    <Grid.Column>
                        <Card.Group centered>
                            <AllBusinessCards businesses={businesses}/>
                        </Card.Group>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )
}

export default React.memo(Businesses);