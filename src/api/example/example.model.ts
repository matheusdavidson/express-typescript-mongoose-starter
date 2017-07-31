import { Schema, model } from 'mongoose';

let schema: Schema = new Schema({
    title: String,
    subtitle: String
});

export default model('Example', schema);