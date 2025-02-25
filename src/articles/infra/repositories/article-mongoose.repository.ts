import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { ArticleEntity } from '../../domain/article.entity';
import { ArticleRepository } from '../../domain/article.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { ArticlesDto } from 'src/articles/domain/dto/articles.dto';
import { CacheInvalidationHelper } from 'src/shared/cache.invalidation.helper';

@Injectable()
export class ArticleMongooseRepository implements ArticleRepository {
    
  constructor(
    @InjectModel('Article') private articleModel: Model<ArticleDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private cacheInvalidationHelper: CacheInvalidationHelper
  ) {}

  async create(article: ArticleEntity): Promise<String> {
    const newArticle = new this.articleModel(article);
    const savedArticle = await newArticle.save();

    if (!savedArticle) {
      throw new Error('Article not created');
    }

    await this.cacheInvalidationHelper.clearCache();
    return 'Article created';
  }

  async update(id: string, article: Partial<ArticleEntity>): Promise<String> {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(
      id,
      { ...article },
      { new: true }
    ).exec();

    if (!updatedArticle) {
      throw new Error('Article not updated');
    }

    await this.cacheManager.del(`article_id_${id}`);
    await this.cacheInvalidationHelper.clearCache();
    return 'Article updated';
  }

  async delete(id: string): Promise<void> {
    await this.articleModel.findByIdAndDelete(id).exec();
    await this.cacheManager.del(`article_id_${id}`);
    await this.cacheInvalidationHelper.clearCache();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<ArticlesDto> {
    const cacheKey = `articles_all_page${page}_limit${limit}`;
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

    await this.cacheManager.set(cacheKey, result, 300);
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
    await this.cacheManager.set(cacheKey, entity, 300);
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
    await this.cacheManager.set(cacheKey, entity, 300);
    return entity;
  }

  async updateLikes(id: string, userId: string): Promise<void> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      throw new Error('Article not found');
    }

    const likeIndex = article.likes.indexOf(userId);
    likeIndex === -1 ? article.likes.push(userId) : article.likes.splice(likeIndex, 1);

    const updatedArticle = await article.save();
    if (!updatedArticle) {
      throw new Error('Article likes not updated');
    }

    await this.cacheManager.del(`article_id_${id}`);
    await this.cacheInvalidationHelper.clearCache();
  }

  async search(title: string, tags: string[]): Promise<ArticleEntity[]> {
    const cacheKey = `articles_search_${title}_${tags?.join(',')}`;
    const cachedArticles = await this.cacheManager.get<ArticleEntity[]>(cacheKey);

    if (cachedArticles) {
      return cachedArticles;
    }

    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (tags && tags.length > 0) {
      query.tags = { $in: tags };
    }

    const articles = await this.articleModel.find(query).exec();
    const articleEntities = articles.map(article => this.toEntity(article));

    await this.cacheManager.set(cacheKey, articleEntities, 300);
    return articleEntities;
  }

  private async invalidateCache() {
    if ('keys' in this.cacheManager) {
      const keys = await (this.cacheManager as any).keys();
      await Promise.all(keys.map((key: string) => this.cacheManager.del(key)));
    }
  }
  
  private toEntity(document: ArticleDocument): ArticleEntity {
    return {
      title: document.title,
      slug: document.slug,
      author_id: document.author_id,
      content: document.content,
      cover: document.cover,
      likes: document.likes,
      tags: document.tags,
      comments: document.comments,
      status: document.status,
    };
  }
}
