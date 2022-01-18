import { Controller, Get } from '@nestjs/common';

import { ApiRoute } from '../../../decorators/api-route';
import { transformTo } from '../../../util/transform-to';
import { RolesStoreService } from '../../dal/stores/roles-store.service';
import { RolesResultDto } from './dto/roles-result.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesStore: RolesStoreService) {}

  @Get()
  @ApiRoute({
    summary: 'Gets all roles',
    ok: {
      type: RolesResultDto,
      description: 'The available roles',
    },
  })
  async getAllRoles(): Promise<RolesResultDto> {
    const data = await this.rolesStore.getAll();

    return transformTo(RolesResultDto, [
      ...data,
      // Adding an unknown role for giggles
      { id: 1000, name: 'Techpriest' },
    ]);
  }
}
