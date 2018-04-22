import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {RoutingModule} from "./app";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: "root",
          password: "",
          database: "hook",
          entities: [__dirname + "/../**/*.entity{.ts,.js}"],
          synchronize: true,
      }),
      RoutingModule,
  ],
  controllers: [],
  components: [],
})
export class AppModule {}
