import {CanActivate, ExecutionContext, Guard} from "@nestjs/common";
import {Token} from "@shared/entities/token.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Guard()
export class AuthGuard implements CanActivate {

    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
    ) {}

    async canActivate(request: any, context: ExecutionContext): Promise<boolean> {
        if (typeof request !== "object") {
            return false;
        }

        const token = request.body.token || request.token;

        return !!await this.tokenRepository.findOne({token});
    }
}