import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Delete(':id')
  deletWallet(@Param('id', ParseIntPipe) id: number) {
    return this.walletService.deleteWallet(id);
  }
}
