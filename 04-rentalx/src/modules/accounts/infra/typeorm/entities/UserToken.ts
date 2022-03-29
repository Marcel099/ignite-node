import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./User";

@Entity("users_token")
export class UserToken {
  constructor(id: string) {
    if (!id) {
      this.id = uuidV4();
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  refresh_token: string;

  @Column()
  expiration_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
