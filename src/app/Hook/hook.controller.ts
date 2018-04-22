import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@shared/entities/user.entity";
import {Repository} from "typeorm";
import {HookGateway} from "./hook.gateway";

@Controller("Hook")
export class HookController {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private gateway: HookGateway,
    ) {}


    @Post(":user/:hook")
    async callHook(@Param() params, @Body() body) {
        let user: User;

        try {
            user = await this.userRepository.findOne({name: params.user});

            if (!user) {
                return {
                    err: "No user found",
                };
            }
        } catch (e) {
            return {
                err: "Error occured",
            };
        }

        try {
            this.gateway.clients[user.name].emit(params.hook, body);
        } catch (e) {
            return {
                err: "No such user",
            };
        }
    }

}
