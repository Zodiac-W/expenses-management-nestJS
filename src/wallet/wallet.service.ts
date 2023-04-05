import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet-dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async createWallet(createWalletDto: CreateWalletDto): Promise<any> {
    const { wallet_name, wallet_balance, wallet_description } = createWalletDto;

    const wallet = new Wallet();
    wallet.wallet_name = wallet_name;
    wallet.wallet_balance = wallet_balance;
    wallet.wallet_description = wallet_description;

    await this.walletRepository.save(wallet);

    return wallet;
  }

  async getWallet(id: number): Promise<any> {
    const wallet = await this.walletRepository.findOne({ where: { id } });

    return wallet;
  }

  async deleteWallet(id: number): Promise<any> {
    const wallet = await this.getWallet(id);

    await this.walletRepository.softDelete(id);

    return wallet;
  }

  async addToWallet(id: number, amount: number): Promise<any> {
    const wallet = await this.getWallet(id);

    wallet.wallet_balance += amount;

    await this.walletRepository.save(wallet);

    return wallet.wallet_balance;
  }

  async takeFromWallet(id: number, amount: number): Promise<any> {
    const wallet = await this.getWallet(id);

    wallet.wallet_balance -= amount;

    await this.walletRepository.save(wallet);

    return wallet.wallet_balance;
  }
}
