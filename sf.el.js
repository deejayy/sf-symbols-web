const fs = require("fs");

const data = fs.readFileSync("sf.el.txt", "binary").split(/[\r\n]/);

data.map((e) => {
  const code = e.split(" - ")[0];
  const desc = e.split(" - ")[1];
  const bytes = [
    code.charCodeAt(0),
    code.charCodeAt(1),
    code.charCodeAt(2),
    code.charCodeAt(3),
  ];
  const codePoint =
    ((bytes[0] & 0x07) << 18) |
    ((bytes[1] & 0x3f) << 12) |
    ((bytes[2] & 0x3f) << 6) |
    (bytes[3] & 0x3f);
  console.log(`.sfs-${desc.replace(/\./ig, '-')}::after { content: "\\${codePoint.toString(16).toUpperCase()}"; }`);
});
