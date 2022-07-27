import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

function BusinessProfile() {

    const [business, setBusiness] = useState(null);
    const email = localStorage.getItem('userId');

    useEffect(() => {
        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/get', jsonData)
            .then(response => {
                console.log(response);
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

    if (!business) {
        return (
            <p>There is no information to display at this time</p>
        )
    }

    return (
        <div>
            <p>Business Name: {business.Item.businessName.S}</p>
            <p>Description: {business.Item.description.S}</p>
            <p>Address: {business.Item.address.S}</p>
            <p>Email: {business.Item.email.S}</p>
        </div>
    )
}

export default React.memo(BusinessProfile);