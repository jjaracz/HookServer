import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {entities} from "@shared/entities";
import {UserController} from "./User";
import {HookController, HookGateway} from "./Hook";

@Module({
    controllers: [
        UserController,
        HookController,
    ],
    imports: [TypeOrmModule.forFeature(entities)],
    components: [HookGateway],
})
export class RoutingModule {}