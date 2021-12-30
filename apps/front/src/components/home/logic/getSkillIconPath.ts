export const getSkillIconPath = (idSkill: number): string => {
  const root = '/svg';

  switch (idSkill) {
    case 1:
      return `${root}/jest.svg`;
    case 2:
      return `${root}/prisma.svg`;
    case 3:
      return `${root}/nestjs.svg`;
    case 4:
      return `${root}/react.svg`;
    case 5:
      return `${root}/typescript.svg`;
  }

  throw new Error(`Missing icon for ${idSkill}`);
};
