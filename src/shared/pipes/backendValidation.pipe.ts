import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
  ValidationError,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class BackendValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof HttpException) {
      const object = plainToClass(metadata.metatype, value);

      if (typeof object !== 'object') {
        return value;
      }

      const error = await validate(object);

      if (error.length === 0) {
        return value;
      }

      throw new HttpException({ errors: {} }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  formatErrors(errors: ValidationError[]) {
    return errors.reduce((acc, error) => {
      const { constraints, children, property } = error;

      acc[property] = Object.values(constraints);
      return acc;
    }, {});
  }
}
