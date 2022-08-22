export interface IRequest {
  knnSize: number;
  knnThreshold: number;
  knnType: number;
  features: number[];
  imageType: string;
}

export class Request implements IRequest {
  constructor(public knnSize: number, public knnThreshold: number,
              public knnType: number, public features: number[], public imageType: string) {
  }
}
