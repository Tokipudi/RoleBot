import { Command as C } from 'discord-akairo';
import type { Client } from './Client';

export class Command extends C {
    client: Client;
}
