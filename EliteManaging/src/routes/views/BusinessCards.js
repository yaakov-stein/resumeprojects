import React, {useState} from 'react';
import {Button, Card, Segment, Dimmer, Loader, Modal, Header} from "semantic-ui-react";
import Maps from "./Map";
import {Link} from "react-router-dom";

function BusinessCards(props) {
    const [open, setOpen] = useState(false)
    const displayCards = (props) => {
        const {businesses} = props;
        if (businesses.length > 0) {
            return(
                businesses.slice(0,1).map((business) => {
                    console.log(business);
                    const businessName = business.businessName.S 
                    const businessAddress = business.address.S 
                    return(
                        <Card style={{marginLeft: '2.5em'}}>
                            <Card.Content>
                                <Card.Header>{business.businessName.S}</Card.Header>
                                <Card.Description>{business.description.S}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui-button'>
                                    <Modal
                                        trigger={<Button color={'green'} inverted>Visit Us</Button>}
                                    >
                                        <Modal.Header>Welcome to {business.businessName.S}</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <Header>Come visit us at {businessAddress}</Header>
                                                    <Maps stringAddress = {businessAddress}></Maps>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                        </Modal.Actions>
                                    </Modal>
                                </div>
                            </Card.Content>
                        </Card>
                    )
                })
            )
        } else {
            return(
                <div>
                    <Segment className='segment'>
                        <div style={{marginTop: '5vh', marginBottom: '5vh', width: '100%'}}>

                            <Dimmer active inverted>
                                <Loader style={{color: 'mediumseagreen'}} size='large'>Loading</Loader>
                            </Dimmer>
                        </div>
                    </Segment>
                </div>
            )
        }
    }

    return (
        <>
            {displayCards(props)}
        </>
    )
}

export default React.memo(BusinessCards);