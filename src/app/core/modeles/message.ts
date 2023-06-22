import { User } from "./user";

export interface Message {
    id: number;
    sender: User;
    receiver: User;
    content: string;
    createdAt: Date;
  }
  