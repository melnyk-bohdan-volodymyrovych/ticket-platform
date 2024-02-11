export const capsAndNumsCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export const generateBarcode = (
  length: number,
  charset: string = capsAndNumsCharset,
) => {
  return new Array(length)
    .fill(null)
    .map(() => charset.charAt(Math.random() * charset.length))
    .join('');
};
