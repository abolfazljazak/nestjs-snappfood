import { IsEmail, IsMobilePhone, IsString, Length } from "class-validator";

export class SignupDto {
    @IsString()
    first_name: string

    @IsString()
    last_name: string

    @IsMobilePhone("fa-IR", {}, {message: "your mobile number format is incorrect"})
    mobile: string

    @IsEmail({}, {message: "your email format is incorrect"})
    email: string
}