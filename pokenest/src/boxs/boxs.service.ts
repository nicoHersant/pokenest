
import { Injectable } from '@nestjs/common';
import { Box } from './interfaces/box.interface';

@Injectable()
export class BoxsService {
    private readonly Boxs: Box[] = [];

    create(Box: Box) {
        this.Boxs.push(Box);
    }

    findAll(): Box[] {
        return this.Boxs;
    }
}