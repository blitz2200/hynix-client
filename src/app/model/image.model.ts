export class ImageModel {
  constructor(
    public index: number,
    public fileName?: string | null,
    public type?: string,
    public feature?: number[],
  ) {}
}

