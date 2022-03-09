import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ApiRoute } from '../../../decorators/api-route';
import { transformTo } from '../../../util/transform-to';
import { RolesStoreService } from '../../dal/stores/roles-store.service';
import { SkillsStoreService } from '../../dal/stores/skills-store.service';
import { UsersStoreService } from '../../dal/stores/users-store.service';
import { JwtAuthGuard } from './../../../guards/jwt-auth.guard';
import { LoggedUserRequest } from './dto/logged-user.request.dto';
import { SignupBodyDto } from './dto/signup.body.dto';
import { SignupResultDto } from './dto/signup.result.dto';
import { UserProfileResultDto } from './dto/user-profile.result.dto';
import { JwtService } from './jwt.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersStore: UsersStoreService,
    private readonly rolesStore: RolesStoreService,
    private readonly skillsStore: SkillsStoreService,
    private readonly jwtService: JwtService
  ) {}

  @Post('signup')
  @ApiRoute({
    summary: 'Registers a user',
    badRequest: {},
    created: {
      type: SignupResultDto,
      description: 'The signed user profile, along with a token',
    },
  })
  async signup(@Body() data: SignupBodyDto): Promise<SignupResultDto> {
    const roles = await this.rolesStore.getAll();
    const userRole = roles.find((el) => el.id === data.idRole);
    if (!userRole) {
      throw new BadRequestException('Invalid role');
    }

    const skills = await this.skillsStore.getAll();
    const invalidSkills = data.idSkills.filter(
      (el) =>
        !skills
          .flatMap((el) => el.skills)
          .map((sk) => sk.id)
          .includes(el)
    );
    if (invalidSkills.length > 0) {
      throw new BadRequestException(
        `Invalid skill(s): ${invalidSkills.join(', ')}`
      );
    }

    const user = await this.usersStore.create(data);
    const token = await this.jwtService.sign(user);

    return transformTo(SignupResultDto, {
      ...user,
      role: userRole,
      skills: skills
        .flatMap((el) => el.skills)
        .filter((el) => data.idSkills.includes(el.id)),
      token,
    });
  }

  @Get('logged-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiRoute({
    summary: 'Gets a signed user profile from his token',
    notFound: {},
    ok: {
      type: UserProfileResultDto,
      description: 'The user profile',
    },
  })
  async userProfile(
    @Req() { loggedUser: { id } }: LoggedUserRequest
  ): Promise<UserProfileResultDto> {
    const user = await this.usersStore.getBy(id);

    if (!user) {
      throw new NotFoundException();
    }

    const skills = await this.skillsStore.getAll();
    const roles = await this.rolesStore.getAll();

    return transformTo(UserProfileResultDto, {
      ...user,
      role: roles.find((r) => r.id === user.idRole),
      skills: skills.filter((s) => user.idSkills.includes(s.id)),
    });
  }
}
