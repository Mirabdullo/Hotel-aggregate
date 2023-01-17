import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class TokensService {
    constructor(
        private readonly jwtService: JwtService,
    ){}

    async getTokens(id: number, email: string, is_creator?: boolean, is_active?: boolean, hotelId?: number) {
        const jwtPayload = {
          sub: id,
          email: email,
          is_creator: is_creator,
          is_active: is_active
        };
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: process.env.ACCESS_TOKEN_TIME,
          }),
          this.jwtService.signAsync(jwtPayload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: process.env.REFRESH_TOKEN_TIME,
          }),
        ]);
        return {
          access_token: accessToken,
          refresh_token: refreshToken,
        };
      }
    
    
      async updateRefreshTokenHash(
        id: number,
        refreshToken: string,
        repository: any
      ): Promise<void> {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 7)
        await repository.update({
          hashed_refresh_token: hashedRefreshToken
        }, {where: {id},returning: true})
      }

      async writeCookie(refresh_token: string, res: any){
        res.cookie("refresh_token", refresh_token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
      }
}
