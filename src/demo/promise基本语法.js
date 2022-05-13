// * promise是es6提供的语法，
// * 目的：是书写异步函数的一种新方式，用来解决回调地狱

const { log } = require("console");
const fs = require("fs");
//# es6提供了Promise构造函数

//todo 1.如何创建一个promise对象
//+ 参数：函数

const p1 = new Promise((resolve, reject) => {
  //* promise内部会封装一个异步操作，只有两种情况：成功的回调函数/失败的回调函数
  //* resolve:成功的时候调用的函数
  //* reject:失败的时候调用的函数
  fs.readFile("a.txt", "utf8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const p2 = new Promise((resolve, reject) => {
  fs.readFile("b.txt", "utf8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const p3 = new Promise((resolve, reject) => {
  fs.readFile("c.txt", "utf8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const p4 = new Promise((resolve, reject) => {
  fs.readFile("d.txt", "utf8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

//todo: 如何使用一个promise呢
//# .then方法：promise对象处于成功的状态是时候，需要传入一个回调函数，这个回调函数就是resolve
//* promise可以避免回调地狱，但是有链式编程
p1.then((res) => {
  console.log(res);
  return p2;
})
  .then((res) => {
    console.log(res);
    return p3;
  })
  .then((res) => {
    console.log(res);
    return p4;
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
