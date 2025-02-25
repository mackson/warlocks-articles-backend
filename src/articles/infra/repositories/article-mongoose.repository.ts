import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { ArticleEntity } from '../../domain/article.entity';
import { ArticleRepository } from '../../domain/article.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { ArticlesDto } from 'src/articles/domain/dto/articles.dto';
import Keyv from 'keyv';

@Injectable()
export class ArticleMongooseRepository implements ArticleRepository {
    
  constructor(
    @InjectModel('Article') private articleModel: Model<ArticleDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(article: ArticleEntity): Promise<String> {
    const newArticle = new this.articleModel(article);
    const savedArticle = await newArticle.save();

    if (!savedArticle) {
      throw new UnauthorizedException('Article not created');
    }
    await this.invalidateCache('article_');
    return 'Article created';
  }

  async update(id: string, article: Partial<ArticleEntity>): Promise<String> {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(
      id,
      { ...article },
      { new: true }
    ).exec();

    if (!updatedArticle) {
      throw new UnauthorizedException('Article not updated');
    }

    await this.invalidateCache('article_');

    return 'Article updated';
  }

  async delete(id: string): Promise<void> {
    await this.articleModel.findByIdAndDelete(id).exec();
    await this.invalidateCache('article_');
  }

  async findAll(page: number = 1, limit: number = 10): Promise<ArticlesDto> {
    const cacheKey = `article_all_page_${page}_limit${limit}`;
    const cachedArticles = await this.cacheManager.get<ArticlesDto>(cacheKey);

    if (cachedArticles) {
      return cachedArticles;
    }

    const skip = (page - 1) * limit;
    const articles = await this.articleModel.find().skip(skip).limit(limit).exec();
    const total = await this.articleModel.countDocuments().exec();
    const result = {
      data: articles.map(article => this.toEntity(article)),
      total,
      page,
      limit,
    };

    await this.cacheManager.set(cacheKey, result);
    return result;
  }

  async findBySlug(slug: string): Promise<ArticleEntity | null> {
    const cacheKey = `article_slug_${slug}`;
    const cachedArticle = await this.cacheManager.get<ArticleEntity>(cacheKey);

    if (cachedArticle) {
      return cachedArticle;
    }

    const article = await this.articleModel.findOne({ slug }).exec();
    if (!article) return null;

    const entity = this.toEntity(article);
    await this.cacheManager.set(cacheKey, entity);
    return entity;
  }

  async findById(id: string): Promise<ArticleEntity | null> {
    const cacheKey = `article_id_${id}`;
    const cachedArticle = await this.cacheManager.get<ArticleEntity>(cacheKey);

    if (cachedArticle) {
      return cachedArticle;
    }

    const article = await this.articleModel.findById(id).exec();
    if (!article) return null;

    const entity = this.toEntity(article);
    await this.cacheManager.set(cacheKey, entity);
    return entity;
  }

  async updateLikes(id: string, userId: string): Promise<void> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      throw new UnauthorizedException('Article not found');
    }

    const likeIndex = article.likes.indexOf(userId);
    likeIndex === -1 ? article.likes.push(userId) : article.likes.splice(likeIndex, 1);

    const updatedArticle = await article.save();
    if (!updatedArticle) {
      throw new UnauthorizedException('Article likes not updated');
    }

    await this.cacheManager.del(`article_id_${id}`);
  }

  async search(title: string): Promise<ArticleEntity[]> {
    const cacheKey = `article_search_${title}`;
    const cachedArticles = await this.cacheManager.get<ArticleEntity[]>(cacheKey);

    if (cachedArticles) {
      return cachedArticles;
    }

    const articles = await this.articleModel.find({title: { $regex: '.*' + title + '.*',  $options: 'i' } }).exec();
    
    const articleEntities = articles.map(article => this.toEntity(article));

    await this.cacheManager.set(cacheKey, articleEntities);
    return articleEntities;
  }

  async invalidateCache(prefix: string): Promise<void> {
    try {
      for (const store of this.cacheManager.stores) {
        if (store instanceof Keyv) {
          await store.clear();
        }
      }
    } catch (error) {
      throw new UnauthorizedException(`Erro ao limpar cache: ${error.message}`);
    }
  }
  

  private toEntity(document: ArticleDocument): ArticleEntity {
    return {
      id: document._id?.toString() ?? '',
      title: document.title,
      slug: document.slug,
      author_id: document.author_id,
      content: document.content,
      cover: document.cover,
      likes: document.likes,
      tags: document.tags,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
