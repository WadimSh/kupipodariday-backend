import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getStart(): string {
    return 'Start project';
  }
}