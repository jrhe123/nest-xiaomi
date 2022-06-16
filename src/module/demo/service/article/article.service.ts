import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from 'src/interface/article.interface';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel) {}

  // search
  async findAll(json: Article = {}, fields?: string) {
    return await this.articleModel.find(json, fields).exec();
  }

  // add
  async add(json: Article) {
    return await this.articleModel.save(json);
  }

  // update
  async update(json1: Article, json2: Article) {
    return await this.articleModel.updateOne(json1, json2);
  }

  // delete
  async delete(json: Article) {
    return await this.articleModel.deleteOne(json);
  }
}
