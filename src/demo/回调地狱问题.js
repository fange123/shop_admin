const fs = require("fs");

//异步的，顺序无法确定
// fs.readFile("a.txt", "utf8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });
// fs.readFile("b.txt", "utf8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });
// fs.readFile("c.txt", "utf8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });
// fs.readFile("d.txt", "utf8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });

//顺序可以确定，但是回调地狱了
fs.readFile("a.txt", "utf8", (err, data) => {
  if (err) return console.log(err);
  console.log(data);
  fs.readFile("b.txt", "utf8", (err, data) => {
    if (err) return console.log(err);
    console.log(data);
    fs.readFile("c.txt", "utf8", (err, data) => {
      if (err) return console.log(err);
      console.log(data);
      fs.readFile("d.txt", "utf8", (err, data) => {
        if (err) return console.log(err);
        console.log(data);
      });
    });
  });
});
