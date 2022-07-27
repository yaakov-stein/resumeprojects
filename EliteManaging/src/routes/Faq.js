import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
 import './faq.css'

export default class Faq extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <div className="faq">
                <Accordion fluid styled>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Should I do the three year program?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <p>
                            "NO". - Judah
                        </p>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Do I know enough to start the a C.S. major? How much do I have to know about C.S. before starting the major?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                            We assume that students know absolutely nothing about C.S. coming in to COM 1300, Introduction to Computer Science.
                        </p>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        How much math is involved in having a successful career in Computer Science?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <p>
                            It depends on which area of C.S. one works in. The vast majority of professional Software Engineers will use very little
                            advanced math, or none at all, and the little math they do use is not more than what they learned in their K-12 schooling.
                            Data Science, graphics algorithms, and cryptography, for example, are all heavily mathematical,
                            but the vast majority of Software Engineers in industry spend their time working on applications and/or
                            infrastructure that do not involve any significant amount of math at all. And, even within Data Science etc.,
                            a large percentage of the Software Engineers that work in those areas simply use code libraries that are built by someone else,
                            and do not actually understand all the underlying math. To summarize: the vast majority of Software Engineers use very little math, if any.
                        </p>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        How do I know if C.S. is for me?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <p>
                            There is no one personality, set of abilities, or interests that guarantee success or failure in C.S.
                            Whether one is "left brained" or "right brained" is no indication - one person will approach software engineering primarily
                            as a creative process while another will approach it primarily as an analytic process, and both are valid and powerful,
                            depending on the exact situation. Whether one has enjoyed or despised math in his K-12 education is not much of an indication
                            either - aside from the fact that there are many factors that go into K-12 math going well or badly that have little to do
                            with student ability, some parts of C.S. are highly mathematical and some parts are entirely divorced from math.
                            The only way to know if C.S. will work for you is to try it.
                        </p>
                    </Accordion.Content>
                </Accordion>

            </div>
        )
    }
}