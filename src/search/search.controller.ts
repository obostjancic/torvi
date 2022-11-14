import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';

@Controller('searches')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post(':id/instances')
  async createInstance(@Param('id') id: string) {
    return this.searchService.createSearchInstance(+id);
  }

  @Post()
  create(@Body() createSearchDto: CreateSearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @Get()
  findAll() {
    return this.searchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
    return this.searchService.update(+id, updateSearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchService.remove(+id);
  }

  // TODO just dev
  @Delete()
  async removeAll() {
    const searches = await this.searchService.findAll();
    searches.forEach((search) => {
      this.searchService.remove(search.id);
    });
  }
}
