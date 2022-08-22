import { ImageModel } from './image.model';
import { Result } from './result.model';

export class Response {
  constructor(
    public results: Result[],
    public imageType: string,
    public processingTime: number,
    public error: boolean,
  ) {}
}

