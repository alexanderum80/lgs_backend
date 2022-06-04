import { AppGateway } from './app.gateway';
import { usersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { PlayersModule } from './players/players.module';
import { CountriesModule } from './countries/countries.module';
import { CurrencyModule } from './currency/currency.module';
import { CasinoInfoModule } from './casino-info/casino-info.module';
import { CitiesModule } from './cities/cities.module';
import { TablesGameModule } from './tables-game/tables-game.module';
import { TablesModule } from './tables/tables.module';
import { OperationsModule } from './operations/operations.module';
import { PaymentInstrumentsModule } from './payment-instruments/payment-instruments.module';
import { CageModule } from './cage/cage.module';
import { PaymentsModule } from './payments/payments.module';
import { TrackingModule } from './tracking/tracking.module';
import { SessionsModule } from './sessions/sessions.module';
import { CreditRequestModule } from './credit-request/credit-request.module';
import { PlayersCategoryModule } from './players-category/players-category.module';
import 'dotenv/config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: (req) => ({ headers: req.headers }),
      formatError: (err) => {
        err.message = err.message
          .replace('Unexpected error value: ', '')
          .replace(/"/g, '');
        return err;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.128.32.106',
      username: 'postgres',
      password: 'admin',
      database: 'LGS',
      connectTimeoutMS: 60000,
      entities: ['**/*.entity.js'],
      synchronize: false,
    }),
    usersModule,
    RolesModule,
    UsersRolesModule,
    PlayersModule,
    CountriesModule,
    CurrencyModule,
    CasinoInfoModule,
    CitiesModule,
    TablesGameModule,
    TablesModule,
    OperationsModule,
    PaymentInstrumentsModule,
    CageModule,
    PaymentsModule,
    TrackingModule,
    SessionsModule,
    CreditRequestModule,
    CurrencyModule,
    PlayersCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
