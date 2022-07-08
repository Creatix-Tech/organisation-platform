import { Schema } from "dynamoose";

import { UserModel } from "src/user/user.model";

export const OrganizationSchema = new Schema({
    id: {
        type: String,
        hashKey: true
    },
    name: String,
    description: String,
    members: {
        type: Array,
        schema: [UserModel],
    }
})