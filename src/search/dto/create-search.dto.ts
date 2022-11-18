import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { SearchConfig } from '../entities/search.entity';
import { SearchConfigTransformer } from '../pipes/search-config.validator';

export class CreateSearchDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  schedule: string;

  @IsNotEmpty()
  @Transform((value) => SearchConfigTransformer.transform(value))
  config: SearchConfig;
}
