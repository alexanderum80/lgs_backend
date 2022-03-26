import { Module } from '@nestjs/common';
import { XmlJsService } from './services/xml-js.service';
import { CryptoService } from './services/crypto.service';
import { JwtService } from './services/jwt.service';

@Module({
    providers: [CryptoService, XmlJsService, JwtService],
    exports: [CryptoService, XmlJsService, JwtService]
})
export class SharedModule {}
