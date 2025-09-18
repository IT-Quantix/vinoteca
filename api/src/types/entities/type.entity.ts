import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Wine } from "../../wines/entities/wine.entity";

@Entity({name: 'types'})
export class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => Wine, wine => wine.type)
    wines: Wine[];
}