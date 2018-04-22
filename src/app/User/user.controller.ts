import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@shared/entities/user.entity";
import {Repository} from "typeorm";
import {Token} from "@shared/entities/token.entity";

@Controller("user")
export class UserController {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
    ) {
    }

    @Post("getToken")
    async getToken(@Body("user") userName) {
        let user: User;
        try {
            user = await this.userRepository.findOne({name: userName});

            if (!user) {
                return {
                    err: "No such user",
                };
            }
        } catch (e) {
            return {
                err: "No such user",
            };
        }

        const newToken = new Token();
        newToken.token = this.generateToken(100);
        newToken.user = user;

        this.tokenRepository.save(newToken);

        return {token: newToken.token};
    }

    @Post("getUser")
    async getUser(@Body("token") token) {
        return await this.tokenRepository.findOne({token});
    }

    generateToken(length: number) {
        let a = "";
        let numb: number;

        for (let i = 0; i < length; i++) {
            numb = Math.floor(Math.random() * 57 + 65);
            if (numb > 90 && numb < 97) {
                numb += 10;
            }
            a += String.fromCharCode(numb);
        }

        return a;
    }
}
