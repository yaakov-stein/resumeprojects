import React from 'react';
import {Button, Card, Dimmer, Loader, Modal, Header} from "semantic-ui-react";
import {useState} from "react";
import Maps from "./Map";


function AllBusinessCards(props) {
    const [open, setOpen] = useState(false)

    const displayCards = (props) => {
        const {businesses} = props;

        if (businesses.length > 0) {
            return(
                businesses.map((business) => {
                    console.log(business);
                    return(
                        <Card>
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
                                                <Header>Come visit us at {business.address.S}</Header>
                                                    <Maps stringAddress = {business.address.S}></Maps>
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