/**
 * SIMD:单指令，多数据
 * SISD:单指令，单数据
 */
var SIMD = require("SIMD")
 var a = SIMD.Float32x4(1, 2, 3, 4);
 var b = SIMD.Float32x4(5, 6, 7, 8);
 var c = SIMD.Float32x4.add(a, b); // Float32x4[6, 8, 10, 12]
