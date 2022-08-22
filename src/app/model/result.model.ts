import { Record } from './record.model';

export class Result {
  constructor(
    public records: Record,
    public distance: number,
  ) {}
}

