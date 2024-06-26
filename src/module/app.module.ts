import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/controller/app.controller';
import { ShowController } from 'src/controller/show.controller';
import { Cliente } from 'src/entity/cliente.entity';
import { AppService } from 'src/service/app.service';
import { ClienteService } from 'src/service/cliente.services';
import { ShowService } from 'src/service/show.services';
import { Show } from 'src/entity/show.entity';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: 'regulus.cotuca.unicamp.br',
        port: 1433,
        username: 'BD23341',
        password: 'BD23341',
        database: 'BD23341',
        entities: [],
        synchronize: true,
        extra: {
          encrypt: true, // Habilitar criptografia
          trustServerCertificate: true, // Confiança no certificado do servidor
        },
      }),
    }),
    TypeOrmModule.forFeature([Cliente,Show],),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '!D2p$U5b&Q9w#N8f@G4',
      signOptions: { expiresIn: 'id' },
    })],
  
  controllers: [AppController, ShowController],
  providers: [ClienteService, AppService,ShowService],
})
export class AppModule {}
