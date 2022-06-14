import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  Headers,
  Session,
  Next,
  Request,
  Response,
} from '@nestjs/common';
import { DemoService } from './demo.service';

/**
 * route:
 * :id -> Param() -> req.params
 * query -> req.query
 * body -> req.body
 * headers -> req.headers
 * session -> req.session
 * next()
 */
@Controller('demo')
export class DemoController {
  constructor(private demoServices: DemoService) {}

  @Get()
  index() {
    return {
      list: this.demoServices.findAll(),
    };
  }

  @Post()
  create(@Request() req, @Response() res) {
    // 1. cookie usage
    // const signedCookies = req.signedCookies;
    // res.cookie('username', 'roy', {
    //   maxAge: 1000 * 60 * 60,
    //   httpOnly: true,
    // });
    // 2. session usages
    req.session.username = 'abc';
    res.json({
      msg: req.session.username,
    });
  }
}
