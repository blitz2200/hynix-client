import { ImageModel } from './image.model';

export class ImageModelResult {
  constructor(
    public memoryType: string,
    public image?: ImageModel,
    public nearestImages?: ImageModel[],
  ) {}
}

