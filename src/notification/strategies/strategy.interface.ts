import { Message } from '../message.service';

export interface NotificationStrategy {
  send: (message: Message) => Promise<void>;
}
