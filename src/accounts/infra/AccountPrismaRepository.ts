import { PrismaClient, Account } from '@prisma/client';

export class AccountPrismaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createAccount(data: Omit<Account, 'id'>): Promise<Account> {
    return this.prisma.Account.create({
      data,
    });
  }

  async getAccountById(id: number): Promise<Account | null> {
    return this.prisma.Account.findUnique({
      where: { id },
    });
  }

  async updateAccount(id: number, data: Partial<Account>): Promise<Account> {
    return this.prisma.Account.update({
      where: { id },
      data,
    });
  }

  async deleteAccount(id: number): Promise<Account> {
    return this.prisma.Account.delete({
      where: { id },
    });
  }

  async getAllAccounts(): Promise<Account[]> {
    return this.prisma.Account.findMany();
  }
}