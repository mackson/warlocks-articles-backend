import { PrismaClient, Article } from '@prisma/client';

export class ArticlePrismaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createArticle(data: Omit<Article, 'id'>): Promise<Article> {
    return this.prisma.article.create({
      data,
    });
  }

  async getArticleById(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  async updateArticle(id: number, data: Partial<Article>): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async deleteArticle(id: number): Promise<Article> {
    return this.prisma.article.delete({
      where: { id },
    });
  }

  async getAllArticles(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }
}