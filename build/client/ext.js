"use strict";

console.log(Array);

Array.asyncmap = function () {
  console.log(this);
}[(1, 2, 3)].asyncmap(function (val) {
  return new Promise(function (resolve, reject) {
    resolve(123);
  });
});

console.log(";)");
//# sourceMappingURL=ext.js.map
