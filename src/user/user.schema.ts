import { Schema } from "dynamoose";
import * as bcrypt from 'bcrypt'
import * as dynamoose from 'dynamoose';

import { Roles } from "./roles.enumt";

export const UserSchema = new Schema({
    id: {
        type: String,
        hashKey: true
    },
    email: String,
    password: {
        type: String,
        set: async (pass: string) => await bcrypt.hash(pass, 10),
    },
    name: String,
    age: Number,
    role: {
        type: String,
        enum: [Roles.Admin, Roles.User]
    },
    orgList: {
        type: Array,
        schema: [{
            type: Object,
            schema: { id: String }
        }],

    }
});