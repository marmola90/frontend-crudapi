export const generarPass = () => {
  let pwd = '';
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz0123456789@#$';

  for (let i = 1; i <= 16; i++) {
    const char = Math.floor(Math.random()
      * str.length + 1);
    pwd += str.charAt(char)
  }
  return pwd;
}