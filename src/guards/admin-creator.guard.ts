import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class CreatorAdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
        private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest()
            const id = req.params.id
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
                })
            }
            const admin = this.jwtService.verify(token,{secret: process.env.ACCESS_TOKEN_KEY})
            if(!admin.is_creator){
                throw new UnauthorizedException({
                    message: "Sizga ruxsat etilmagan",
                })
            }
            return true
        } catch (error) {
            throw new HttpException(
                "Ruxsat etilmagan foydalanuvchi",
                HttpStatus.FORBIDDEN
            )
        }
    }
}