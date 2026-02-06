import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  async googleLogin(@Body('idToken') idToken: string) {
    return this.authService.googleLogin(idToken);
  }

  @Post('login')
  async loginWithEmail(@Body() body: any) {
    return this.authService.loginWithEmail(body);
  }
}