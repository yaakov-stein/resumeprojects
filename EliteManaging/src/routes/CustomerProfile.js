import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Divider, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
// import "./CustomerProfile.css"

function CustomerProfile() {

    const [customer, setCustomer] = useState(null);
    const email = localStorage.getItem('userId');
    const src = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'

    useEffect(() => {
        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/get', jsonData)
            .then(response => {
                console.log(email)
                console.log(response);
                setCustomer(response.data);
            })
    }, []);

    const jsonData = {
        "TableName": "CustomerUserDB",
        "Key": {
            "customerId": {
                "S": email
            }
        }
    }

    if (!customer) {
        return (
            <p>There is no information to display at this time</p>
        )
    }

    return (
        <div>
            <section className="Welcome-Section" style={
                {
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
                    fontWeight: "bold",
                    height: "20vh"
                }
            }>
                <h1 style={{fontFamily: "Beba Neue", fontSize: "7vh"}}>
                    Welcome {customer.Item.firstName.S} {customer.Item.lastName.S}
                </h1>
                <div>
                    <Button size='small' inverted>
                        <Link to="/businesses" style={{color: 'black'}}> Check Out Participating Businesses </Link>
                    </Button>
                    <Button size='small inverted'>
                        <Link to="/AboutUs" style={{color: 'black'}}> Get to Know Us </Link>
                    </Button>
                </div>
            </section>
            <section>
                <div style={{marginBottom: '2em', marginTop: '2em'}}>
                    <h1>Your Wallet</h1>
                    <Container style={{borderStyle: "dashed", borderColor: "#7aecae", borderRadius: "3px", margin: "auto"}}>
                        <h3 style={{marginTop: "0.5em"}}>No Badges Yet</h3>
                        <Image.Group size='medium'>
                            <Image src={src} />
                            <Image src={src} />
                            <Image src={src} />
                        </Image.Group>
                    </Container>
                </div>
            </section>
        </div>
    )
}

export default React.memo(CustomerProfile);