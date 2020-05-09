import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor() { }

    public hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

}
