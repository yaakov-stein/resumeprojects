import React, {useEffect, useState} from 'react'
import {Card, Grid, Segment} from "semantic-ui-react";
import './Businesses.css';
import axios from "axios";
import {Link} from "react-router-dom";
import AllBusinessCards from "./AllBusinessCards";

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
            <section className="Participating-Businesses">
                <p className="intro">
                    <h1 style={{fontFamily: 'Bebas Neue', fontSize: '10vh'}}>Participating Businesses</h1>
                    <h2 style={{fontFamily: 'Bebas Neue', fontSize: '4vh'}}>Below are all the participating businesses.</h2>
                    <h3 style={{fontFamily: 'Bebas Neue', fontSize: '3vh'}}>
                        Don't see your favorite business?
                        <Link to="/AboutUs"> Contact Us </Link>
                    </h3>
                </p>
            </section>
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