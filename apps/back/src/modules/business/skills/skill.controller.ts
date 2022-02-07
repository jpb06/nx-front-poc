import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiRoute } from '../../../decorators/api-route';
import { transformTo } from '../../../util/transform-to';
import { SkillsStoreService } from '../../dal/stores/skills-store.service';
import { SkillsAvailabilityForRoleBodyDto } from './dto/skills-availability-for-role.body.dto';
import { SkillsAvailabilityForRoleResultDto } from './dto/skills-availability-for-role.result.dto';
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

  @Post('availabiltyForRole')
  @ApiRoute({
    summary:
      'Checks if the provided skills are available for the provided role',
    ok: {
      type: SkillsAvailabilityForRoleResultDto,
      description: 'The skills which are not available for that role',
    },
  })
  async areSkillsAvailableForRole(
    @Body() data: SkillsAvailabilityForRoleBodyDto
  ): Promise<SkillsAvailabilityForRoleResultDto> {
    const skills = await this.skillsStore.getAll();

    const idSkillsForRole = skills
      .flatMap((el) => el.skills)
      .filter((el) => el.idRoles.includes(data.idRole))
      .map((el) => el.id);

    return transformTo(
      SkillsAvailabilityForRoleResultDto,
      data.idSkills.filter((id) => !idSkillsForRole.includes(id))
    );
  }
}
