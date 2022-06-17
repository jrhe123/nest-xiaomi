import { Injectable } from '@nestjs/common';
// mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Article as IArticle } from 'src/interface/article.interface';
// mysql
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Article as ArticleEntity } from 'src/entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel,
    @InjectRepository(ArticleEntity)
    private readonly aritcleRepository: Repository<ArticleEntity>,
  ) {}

  // search
  async findAll(json: IArticle = {}, fields?: string) {
    return await this.articleModel.find(json, fields).exec();
  }

  // add
  async add(json: IArticle) {
    return await this.articleModel.save(json);
  }

  // update
  async update(json1: IArticle, json2: IArticle) {
    return await this.articleModel.updateOne(json1, json2);
  }

  // delete
  async delete(json: IArticle) {
    return await this.articleModel.deleteOne(json);
  }

  // search mysql
  async findAllMysql(json?: FindManyOptions<ArticleEntity>) {
    return await this.aritcleRepository.find(json);
  }

  async findByQuery(query: string) {
    // select * from article
    return await this.aritcleRepository.query(query);
  }

  /**
   *
   * MYSQL version
   *
   */
  async addMysql(json?: ArticleEntity) {
    const article = new ArticleEntity();
    article.title = '123';
    const rows = await this.aritcleRepository.save(article);
    return rows;
  }

  async updateMysql(
    json1: FindOneOptions<ArticleEntity>,
    json2: ArticleEntity,
  ) {
    const article = await this.aritcleRepository.findOne(json1);
    article.title = json2.title;
    const rows = await this.aritcleRepository.save(article);
    return rows;
  }

  async deleteMysql(json: FindOneOptions<ArticleEntity>) {
    const article = await this.aritcleRepository.findOne(json);
    const rows = await this.aritcleRepository.remove(article);
    return rows;
  }
}
