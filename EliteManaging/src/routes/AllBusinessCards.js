import React from 'react';
import {Button, Card, Dimmer, Loader, Modal, Header} from "semantic-ui-react";
import {useState} from "react";
import Map from "./Map";


function AllBusinessCards(props) {
    const [open, setOpen] = useState(false)

    const displayCards = (props) => {
        const {businesses} = props;

        if (businesses.length > 0) {
            return(
                businesses.map((business) => {
                    console.log(business);
                    const businessName = business.businessName.S 
                    const businessAddress = business.address.S 
                    return(
                        <Card>
                            <Card.Content>
                                <Card.Header>{businessName}</Card.Header>
                                <Card.Description>{business.description.S}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui-button'>
                                    <Modal
                                        onClose={() => setOpen(false)}
                                        onOpen={() => setOpen(true)}
                                        open={open}
                                        trigger={<Button color={'green'} inverted>Visit Us</Button>}
                                    >
                                        <Modal.Header>Welcome to {businessName}</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <Header>Badges?</Header>
                                                <p>
                                                    Maybe put some badges here?
                                                </p>
                                                <Header>Come visit us at {businessAddress}</Header>
                                                    <Map stringAddress={businessAddress} />
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button
                                                icon='close'
                                                onClick={() => setOpen(false)}
                                                negative
                                            />
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
                <div style={{marginTop: '5vh', marginBottom: '5vh', width: '100%'}}>

                    <Dimmer active inverted>
                        <Loader style={{color: 'mediumseagreen'}} size='large'>Loading</Loader>
                    </Dimmer>

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

export default React.memo(AllBusinessCards);