import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import axios from "axios";

import {Modal, Button as B, Form, Input, Label, Divider, Image, Header} from "semantic-ui-react";

import {useState} from "react";
import {useEffect} from "react";

const mdTheme = createTheme();

function DashboardContent() {

    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [perks, setPerks] = useState('');
    const [image, setImage] = useState([]);

    const [business, setBusiness] = useState(null);
    const email = localStorage.getItem('userId');
    const [businesseBadges, setBusinessesBadges] = useState([]);
    const src = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'

    useEffect(() => {
        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/get', jsonData)
            .then(response => {
                setBusiness(response.data);
            })
    }, []);

    const jsonData = {
        "TableName": "BusinessUserDB",
        "Key": {
            "businessId": {
                "S": email
            }
        }
    }




    const generateJsonData = (pictureName, perks, price, business)=> {
        const date = new Date();
        return {
            "TableName": "BadgeDB",
            "Item": {
                "badgeId": {
                    "S": pictureName
                },
                "Business": {
                    "S": business
                },
                "DateOfCreation": {
                    "S": date
                },
                "CurrentOwner": {
                    "S": "None"
                },
                "Price": {
                    "S": price
                },
                "Perks": {
                    "S": perks
                }
            }
        }
    };

    function onClick(event) {
        event.preventDefault();
        setOpen(false);
        generateBadge('/' + description.valueOf(), perks.valueOf() , price.valueOf(), business.Item.businessName.S, '7');
        console.log('/'+description.valueOf());
        console.log('perks: ' + perks.valueOf());
        console.log('price: ' + price.valueOf());
    }

    function generateBadge(descriptions, perks, price, business, numberBadge){
        price = "$" + price.replace(/[^\d.]/g,'');
        const pictureName = business + numberBadge;
        const s3URL = "https://1v74t44h9b.execute-api.us-east-1.amazonaws.com/S3Test/badgepicscontainer/" + pictureName +  ".jpeg";
        axios.get("https://loremflickr.com/200/200" + descriptions, {responseType: "blob"})
            .then((response) => {
                console.log(response)
                axios({
                    method : 'put',
                    url : s3URL,
                    headers : {'Content-Type' : 'image/jpeg'},
                    data : response.data
                })
                    .then(response => {
                        console.log(response);
                    });
            });
        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/post', generateJsonData(pictureName, perks, price, business))
    }

    function generateJsonScanData(businessName){
        return {
            "TableName": "BadgeDB",
            "FilterExpression": "businessId = :val",
            "ExpressionAttributeValues": {":val": {"S": businessName}}
        }
    }

    function getBusinessesBadgeCards(businessName){
        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/scan', generateJsonScanData(businessName))
            .then((response) => {
                const badgeResponseJson = response.data.Items;
                setBusinessesBadges(badgeResponseJson);
            });
    }
    function onImageChange(event) {
        setImage([...event.target.files]);

    }
    function uploadBadge(){
        const s3URL = "https://1v74t44h9b.execute-api.us-east-1.amazonaws.com/S3Test/badgepicscontainer/bh.jpeg";
        axios({
            method : 'put',
            url : s3URL,
            headers : {'Content-Type' : 'image/jpeg'},
            data : image[0].valueOf()
        }).then(response => {
            console.log('uploaded');
        })

        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/post', generateJsonData("somename", perks.valueOf(), price.valueOf(), "construction")).then(r => {
            console.log("DB Posted")
        })
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3} style={{marginBottom: '8em'}}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Chart />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Deposits />
                                </Paper>
                            </Grid>
                        </Grid>
                        <div style={{marginBottom: '2em'}}>
                            <Divider />
                            <h1>No Badges Yet</h1>
                            <Image.Group size='medium'>
                                <Image src={src} />
                                <Image src={src} />
                                <Image src={src} />
                            </Image.Group>
                        </div>
                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={<B color={'green'}>Create Badge</B>}
                        >
                            <Modal.Header>Create Badge Image</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Group>
                                        <Form.Field width={12}>
                                            <label>Badge Description</label>
                                            <input placeholder='Coffee' onChange={(e) => setDescription( e.target.value)}/>
                                        </Form.Field>

                                        <Form.Field width={4} style={{marginTop: '1.6em'}}>
                                            <Input labelPosition='right' type='text' placeholder='15' onChange={(e) => setPrice(e.target.value)}>
                                                <Label basic>$</Label>
                                                <input />
                                                <Label>.00</Label>
                                            </Input>
                                        </Form.Field>

                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field width={12}>
                                            <label>Perk</label>
                                            <input placeholder='Free coffee fridays' onChange={(e) => setPerks(e.target.value)}/>
                                        </Form.Field>

                                        <Form.Field >
                                            <Modal.Actions>
                                                <B
                                                    style={{marginTop: '1.6em', marginLeft: '1.6em'}}
                                                    content='Generate Badge'
                                                    icon='checkmark'
                                                    color={'green'}
                                                    onClick={onClick}
                                                />
                                            </Modal.Actions>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>


                                <Divider horizontal>Or</Divider>
                                <Form>
                                    <Form.Group >
                                        <Form.Field width={8}>
                                            <label>Upload jpg image</label>
                                            <Input
                                                type='file'
                                                multiple accept="image/*"
                                                onChange={onImageChange}

                                            />
                                        </Form.Field>
                                        <Form.Field width={4} style={{marginTop: '1.6em'}}>
                                            <Input labelPosition='right' type='text' placeholder='15' onChange={(e) => setPrice(e.target.value)}>
                                                <Label basic>$</Label>
                                                <input />
                                                <Label>.00</Label>
                                            </Input>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field width={12}>
                                            <label>Perk</label>
                                            <input placeholder='Free coffee fridays' onChange={(e) => setPerks(e.target.value)}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Modal.Actions>
                                                <B
                                                    style={{marginTop: '1.6em', marginLeft: '1.6em'}}
                                                    content='Upload Badge'
                                                    icon='upload'
                                                    color={'green'}
                                                    onClick={uploadBadge}
                                                />

                                            </Modal.Actions>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <B
                                    icon='close'
                                    color={'red'}
                                    onClick={() => setOpen(false)}
                                />
                            </Modal.Actions>
                        </Modal>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}