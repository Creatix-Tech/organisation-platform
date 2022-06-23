import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


import { ServiceConfig } from 'src/common/configservice';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private serviceConfig: ServiceConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: serviceConfig.jwtSecret,
        });
    }

    async validate(payload: { sub: string, username: string }) {
        return { userId: payload.sub, email: payload.username };
    }
}