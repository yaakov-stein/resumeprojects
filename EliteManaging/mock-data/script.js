const axios = require('axios');
const {faker} = require('@faker-js/faker');


for(let i = 0; i < 150; i++) {
    const generateBusinessMockData = ()=> {
        return {
            "TableName": "BusinessUserDB",
            "Item": {
                "businessId": {
                    "S": faker.datatype.uuid()
                },
                "businessName": {
                    "S": faker.company.companyName()
                },
                "email": {
                    "S": faker.internet.email()
                },
                "address": {
                    "S": faker.address.streetAddress()
                },
                "description": {
                    "S": faker.company.catchPhrase()
                }
            }
        }
    };

    axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/post', generateBusinessMockData()).then(res => {
        console.log("business success");

    });

    const generateUserMockData = ()=> {
        return {
            "TableName": "CustomerUserDB",
            "Item": {
                "customerId": {
                    "S": faker.datatype.uuid()
                },
                "firstName": {
                    "S": faker.name.firstName()
                },
                "lastName": {
                    "S": faker.name.lastName()
                },
                "email": {
                    "S": faker.internet.email()
                }
            }
        }
    };


    axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/post', generateUserMockData()).then(res => {
        console.log(i + "customer success");

    });

}


