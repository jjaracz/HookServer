import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from "@nestjs/websockets";
import {User} from "@shared/entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@shared/guards";

@WebSocketGateway()
export class HookGateway {
    @WebSocketServer() server;

    public clients: {[key: string]: any} = {};

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    @SubscribeMessage("auth")
    async onAuth(client, data): Promise<WsResponse<any>> {
        let user: User;

        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
            } catch (e) {
                return {
                    event: "auth",
                    data: {
                        err: "Bad request",
                    },
                };
            }
        }

        try {
            user = await this.userRepository.findOne({name: data.user});

            if (!user) {
                return {
                    event: "auth",
                    data: {
                        err: "User not found",
                    },
                };
            }
        } catch (e) {
            return {
                event: "auth",
                data: {
                    err: "Error occured",
                },
            };
        }

        this.clients[user.name] = client;

        return {
            event: "auth",
            data: {
                msg: "Success",
            },
        };
    }

    @SubscribeMessage("log")
    @UseGuards(AuthGuard)
    async log(client, data): Promise<WsResponse<any>> {
        return {event: "log", data: Object.keys(this.clients)};
    }
}