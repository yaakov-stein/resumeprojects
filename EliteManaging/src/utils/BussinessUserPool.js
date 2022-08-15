import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_IKBxTGVCJ',
    ClientId: '48866rurmo8nskliie7etk3iig'
};

export default new CognitoUserPool(poolData);