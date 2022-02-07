export const getInvalidFields = (message?: string): Array<number> => {
  if (!message) {
    return [];
  }

  const numbersSeparatedByCommas = /^\d+(,\d+)*$/;
  if (!numbersSeparatedByCommas.test(message)) {
    return [];
  }

  return message.split(',').map((n) => +n);
};
