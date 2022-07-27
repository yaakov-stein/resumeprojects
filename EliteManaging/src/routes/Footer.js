import './Footer.css';
import {Component} from "react";
import {Input, Icon, Button} from "semantic-ui-react";
import {Link,Outlet} from "react-router-dom";

export default class Footer extends Component {

    render() {
        return (
            <div className='footer'>
                <div className='contact'>
                    <p id='contact-us'>
                        <Link to="/AboutUs" style={{color: 'black'}}> Contact Us </Link>
                    </p>
                    <p id='FAQ'>
                        <Link to="/Faq" style={{color: 'black'}}> FAQs </Link>
                    </p>
                    <p id='customer-service'>Customer Service</p>
                </div>
                <div className='email'>
                    <Input iconPosition='left' placeholder='Email'>
                        <Icon name='at' />
                        <input />
                    </Input>
                    <Button className='submit-button' inverted>Subscribe Now</Button>
                </div>
                <div className='social'>
                    <Button color='instagram'>
                        <Icon name='instagram' /> Instagram
                    </Button>
                    <Button color='facebook'>
                        <Icon name='facebook' /> Facebook
                    </Button>
                    <Button color='twitter'>
                        <Icon name='twitter' /> Twitter
                    </Button>
                </div>
                <Outlet/>
            </div>

        )
    }
}