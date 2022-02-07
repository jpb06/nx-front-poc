import AssessmentIcon from '@mui/icons-material/Assessment';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { SxProps, Theme } from '@mui/system';
import Image from 'next/image';
import React from 'react';

import { getRandomColor } from '../logic/getRandomColor';

type SkillIconProps = {
  idSkill: number;
};

export const SkillIcon: React.FC<SkillIconProps> = ({ idSkill }) => {
  const root = '/svg';

  const iconsStyle: SxProps<Theme> = {
    color: getRandomColor(),
    width: 30,
    height: 30,
  };

  switch (idSkill) {
    case 1:
      return (
        <Image src={`${root}/jest.svg`} alt="jest" height={30} width={30} />
      );
    case 4:
      return (
        <Image src={`${root}/react.svg`} alt="react" height={30} width={30} />
      );
    case 5:
      return (
        <Image
          src={`${root}/typescript.svg`}
          alt="typescript"
          height={30}
          width={30}
        />
      );
    case 6:
      return <RecordVoiceOverIcon sx={iconsStyle} />;
    case 7:
      return <TwoWheelerIcon sx={iconsStyle} />;
    case 8:
      return <QuestionAnswerIcon sx={iconsStyle} />;
    case 9:
      return <AssessmentIcon sx={iconsStyle} />;
    case 10:
      return <GitHubIcon sx={iconsStyle} />;
    case 11:
      return <LoyaltyIcon sx={iconsStyle} />;
  }

  return null;
};
