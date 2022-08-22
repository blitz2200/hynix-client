import { ImageModel } from './image.model';

export class Record {
  constructor(
    public projectId: number,
    public instanceId: number,
    public croppedImagePath: String,
  ) {}
}

