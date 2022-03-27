import { Module } from '@nestjs/common';
import { XmlJsService } from './services/xml-js.service';
import { CryptoService } from './services/crypto.service';

@Module({
    providers: [CryptoService, XmlJsService],
    exports: [CryptoService, XmlJsService]
})
export class SharedModule {}
