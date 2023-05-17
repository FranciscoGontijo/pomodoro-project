import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'ap-southeast-2_PSggiCVvX',
    ClientId: '1p85k0tl10ojsvd56ra5d750v2'
};

const UserPool = new CognitoUserPool(poolData)

export default UserPool;