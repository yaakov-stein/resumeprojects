import React from 'react'
import { Container } from 'semantic-ui-react'

const About = () => (

    <Container>
        <div style={{ padding: '7em 0em 0em'}} >
            <div className="ui text container">
                <h1 className="ui dividing header">About Us</h1>
            </div>
        </div>
        <div style={{margin: '1em 16em 3em',}}>
            <h3> We are a team of undergraduate students at Yeshiva University studying Computer Science.
                In the summer of 2022, we all signed up to spend our summer working
                on a Customer Relationship Management Website. After a lot of research, we
                decided that a website where volunteers can sign up for events was the most
                useful app we could build, and includes many of the features needed to experience what it takes to build a real application.</h3>

            <h3>Our Team:</h3>

            <h3>Yaakov Stein
                <h5>
                    <a href="mailto:Jstein4@mail.yu.edu">Contact Me</a>
                </h5>
            </h3>
            <h3>
                Yosef Teitelbaum
                <h5>
                    <a href="mailto:yosefteitelbaum@gmail.com">Contact Me</a>
                </h5>
            </h3>
            <h3>
                David Kohanchi
                <h5>
                    <a href="mailto:dkohanch@mail.yu.edu">Contact Me</a>
                </h5>
            </h3>
            <h3>
                Sam Shulman
                <h5>
                    <a href="mailto:sshulma5@mail.yu.edu">Contact Me</a>
                </h5>
            </h3>
        </div>

    </Container>
)

export default About