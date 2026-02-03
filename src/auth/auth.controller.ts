import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('google-login')
    async googleLogin(@Body() body: { email: string; name: string; photoUrl?: string }) {
        return this.authService.googleLogin(body);
    }
}
