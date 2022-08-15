import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_85UzcX8vu',
    ClientId: '69f76h4ug2acoj58pdbtvfnkbm'
};

export default new CognitoUserPool(poolData);