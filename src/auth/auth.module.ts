import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [
    JwtModule.register({
      secret: `4Fn@,]]r@551[cbY`
    }),
    UserModule,
    PrismaModule
  ],
  controllers: [AuthController]
})
export class AuthModule {

}