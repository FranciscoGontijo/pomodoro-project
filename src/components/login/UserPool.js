import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'ap-southeast-2_silpTUsaz',
    ClientId: '2dvluon89vtn7vto8nbi3ttee6'
};

export default new CognitoUserPool(poolData);