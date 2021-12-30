const stringToColor = (string: string): string => {
  let hash = 0;
  let i = 0;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

type StringAvatarResult = {
  sx: {
    bgcolor: string;
  };
  children: string;
};

export const stringAvatar = (name: string): StringAvatarResult => {
  const chunks = name.toUpperCase().split(' ');

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${chunks[0][0]}${chunks[1][0]}`,
  };
};
