import React from 'react'
import {Button, Card, Grid, Image, Divider, Segment} from "semantic-ui-react";
import './LandingPage.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import BusinessCards from "./BusinessCards";
import {useEffect} from "react";


export default function LandingPage(){
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
                const allBusinesses = response.data.Items;
                setBusinesses(allBusinesses);
            });
    }

    return (
        <div>
            <section className="Welcome-Section">
                <p>
                    <h1 style={{fontFamily: 'Bebas Neue', fontSize: '10vh', color: 'mintcream'}}>Welcome to Elite Managing</h1>
                    <h2 style={{fontFamily: 'Bebas Neue', fontSize: '4vh', color: 'mintcream'}}>More than just a CRM, it's a tool for managing your business.</h2>
                </p>
                <div className="Get-Started">
                    <Button size='big' inverted>

                        <Link to="/BusinessLogin" style={{color: 'white'}}> Get Started as a Business </Link>

                    </Button>
                    <Button size='big' inverted>

                        <Link to="/CustomerLogin" style={{color: 'white'}}> Get Started as a Customer </Link>


                    </Button>
                </div>
            </section>
            <Segment className='segment'>
                <Grid className='main' columns={2} relaxed='very' divided='vertically'>
                    <Grid.Column floated='left' width={7}>
                        <div className="trending"><h2>Trending Badges</h2></div>
                        <Card.Group style={{marginLeft: '8em'}} itemsPerRow={2}>
                            <Card style={{width: '250px'}}>
                                <Image src='https://www2.skillsoft.com/wp-content/uploads/2020/01/GenericBadge-1.png' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>Skillsoft</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Badge</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        This is a badge that gives you something.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card style={{width: '250px'}}>
                                <Image src='https://www2.skillsoft.com/wp-content/uploads/2020/01/GenericBadge-1.png' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>Skillsoft</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Badge</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        This is a badge that gives you something.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card style={{width: '250px'}}>
                                <Image src='https://www2.skillsoft.com/wp-content/uploads/2020/01/GenericBadge-1.png' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>Skillsoft</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Badge</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        This is a badge that gives you something.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card style={{width: '250px'}}>
                                <Image src='https://www2.skillsoft.com/wp-content/uploads/2020/01/GenericBadge-1.png' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>DevOps Lead</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Badge</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        This is a badge that gives you something.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card style={{width: '250px'}}>
                                <Image src='https://www2.skillsoft.com/wp-content/uploads/2020/01/GenericBadge-1.png' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>Cloud Computing</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Badge</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        This is a badge that gives you something.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card style={{width: '250px'}}>
                                <Image src='https://images.credly.com/images/6c201cda-74c5-4593-9ce2-c2fa780a4a94/Skillsoft_ACE_Course_600x600.png' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>ACE</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Badge</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        This is a badge that gives you something.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <div className="featured"><h2>Featured Businesses</h2></div>
                        <Card.Group style={{marginLeft : '6em', marginRight: '2em'}} itemsPerRow={2}>
                            <BusinessCards businesses={businesses}/>
                        </Card.Group>
                    </Grid.Column>
                </Grid>
                <Divider vertical>And</Divider>
            </Segment>
        </div>
    )
}
