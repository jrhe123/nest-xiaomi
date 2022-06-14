import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * cli: nest g pipe pipe/demo
 *
 * usage:
 * 1. form validate
 * 2. update form data
 */
@Injectable()
export class DemoPipe implements PipeTransform {
  constructor(private schema: any) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const { error } = this.schema.validate(value);
      if (error) return error;
      return value;
    } catch (err) {
      return err;
    }
  }
}
