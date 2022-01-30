import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export class Pokemon {
  @ObjectIdColumn()
  readonly _id: ObjectID;

  @Column()
  name: string;

  @Column()
  baseExperience: number;

  @Column()
  height: number;

  @Column()
  weight: number;
}
