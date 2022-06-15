import { DemoPipe } from './demo.pipe';
import * as Joi from 'joi';

const demoSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
});

describe('DemoPipe', () => {
  it('should be defined', () => {
    expect(new DemoPipe(demoSchema)).toBeDefined();
  });
});
