import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps: true})
export class User {

    @Prop({ unique: true })
    username: string;

    @Prop({required: true})
    password: string;

    @Prop( {required: true})
    lastname: string;

    @Prop({required: true})
    firstname: string;

    @Prop({unique: [true,'Duplicate email entered']})
    emailadd: string;

    @Prop({required: false})
    mobileno?: string;

    @Prop({required: true})
    role: string;

    @Prop({required: false})
    profilepic?: string;

    createdAt: string;
    updatedAt: string;
}

export const userschema = SchemaFactory.createForClass(User)