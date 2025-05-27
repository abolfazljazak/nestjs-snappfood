import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity"

@Entity("otp")
export class OtpEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    code: string

    @Column()
    expries_in: Date

    @Column()
    userId: number

    @OneToOne(() => UserEntity, (user) => user.otp, {onDelete: "CASCADE"})
    user: UserEntity
}