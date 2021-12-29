import { Controller, Get } from '@nestjs/common';

import { ApiRoute } from '../../../decorators/api-route';
import { transformTo } from '../../../util/transform-to';
import { SkillsStoreService } from '../../dal/stores/skills-store.service';
import { SkillsResultDto } from './dto/skills.result.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsStore: SkillsStoreService) {}

  @Get()
  @ApiRoute({
    summary: 'Gets all skills',
    ok: {
      type: SkillsResultDto,
      description: 'The available skills',
    },
  })
  async getAllSkills(): Promise<SkillsResultDto> {
    const data = await this.skillsStore.getAll();

    return transformTo(SkillsResultDto, data);
  }
}
