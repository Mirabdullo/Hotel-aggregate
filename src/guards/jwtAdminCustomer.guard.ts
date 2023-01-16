import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminOrCustomer implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest()
            const id = req.params.id
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer != 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
                })
            }
            
            const user = this.jwtService.verify(token,{secret:process.env.ACCESS_TOKEN_KEY})
            if(user.is_active){
                return true
            }
            if(user.sub !== +id){
                throw new UnauthorizedException({
                    message: "Ruxsat etilmagan foydalanuvchi"
                })
            }
            return true
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({
                message: "Foydalanuvchi avtorizatsiyadan o'tmagan7",
            })
        }
    }
}