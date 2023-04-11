import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WalletService } from './wallet.service';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Delete(':id')
  deletWallet(@Param('id', ParseIntPipe) id: number) {
    return this.walletService.deleteWallet(id);
  }
}
