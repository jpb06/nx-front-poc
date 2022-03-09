export const getRandomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff);

  return '#' + hex.toString(16);
};
