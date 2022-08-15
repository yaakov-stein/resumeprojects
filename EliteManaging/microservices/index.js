// TODO: Do not try to run this microservice. It will not work. This code is only to demonstrate what our lambda code looks like.
const AWS = require('aws-sdk');
const axios = require("axios");
AWS.config.update({
    region: 'us-east-1'
})

const ses = new AWS.SES();

const apiEndpoint = 'https://loremflickr.com/320/240/badge';

const image = axios.get(apiEndpoint);


exports.handler = async (event) => {
    const params = {
        Destination: {
            ToAddresses: ['sshulma5@mail.yu.edu', 'dkohanch@mail.yu.edu', 'Jstein4@mail.yu.edu', 'yyt131@yahoo.com']
        },
        Message: {
            Subject: {Data: 'Featured Badge'},
            Body: {
                // display the image in the email
                Html: {
                    Data: `<h1>Hello valued customer</h1> <br/> <h2>This was our most popular badge from last month</h2> <br/> <img src="${apiEndpoint}" alt="sup">`
                },
                Text: {Data: 'idk man' }
            }
        },
        Source: 'samshulman6@gmail.com'
    }
    await ses.sendEmail(params).promise().then(response =>{
        console.log('success');
    }, error =>{
        console.log('ERROR NO GOOD', )
    })
};