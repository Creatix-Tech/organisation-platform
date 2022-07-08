import * as dynamoose from 'dynamoose';

import { UserSchema } from "src/user/user.schema";

export const UserModel = dynamoose.model('User', UserSchema, {
    "create": false,
    "waitForActive": false
})
