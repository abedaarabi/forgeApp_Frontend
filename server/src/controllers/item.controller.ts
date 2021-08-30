import { Controller, Get, Post } from '@nestjs/common';

@Controller('items')
export class ItemController {
  @Get()
  getItems(): { name: string } {
    return { name: 'all Items' };
  }
  @Get('/:itemId')
  getItemById() {
    return { name: 'One Item' };
  }

}
