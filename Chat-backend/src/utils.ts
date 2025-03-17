const s = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function random() {
  let str = "";
  for (let i = 0; i < 5; i++) {
    str += s[Math.floor((Math.random() * str.length))]
  }
  return str;
}
export default random