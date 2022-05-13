const { log } = require("console");
const fs = require("fs");
// * async和await是es7推出的新语法，也是用来处理异步代码的
//*  async 和 await 是一对关键字
//*  一个普通函数用async修饰，就成了一个异步函数，但是单独使用没有意义，必须配合await
//*  await也是一个关键字，用于等待一个结果，只能用在async函数中
//*  await后面一般会跟一个promise对象，await会阻塞async函数 的执行，直到promise成功的结果

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
//* await只会等待成功的结构，失败会报错，抛出异常，try  catch一下

async function a() {
  try {
    const data1 = await readFile("a.txt");
    console.log(data1);

    const data2 = await readFile("b.txt");
    console.log(data2);

    const data3 = await readFile("c.txt");
    console.log(data3);

    const data4 = await readFile("d.txt");
    console.log(data4);
  } catch (e) {
    console.log(e);
  }
}

a();
