import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel) {}
  async findAll(json = {}) {
    return await this.articleModel.find(json).exec();
  }
}
