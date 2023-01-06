parseInt(string, radix) // 将指定进制转十进制：radix 进制2-36基数，0 或未指定，都相当于未指定
parseInt('1010',8) // 8进制的1010,转十进制得到的值
// 1010 = (1 × 8³) + (0 × 8²) + (1 × 8¹) + (0 × 8⁰) = 520
parseInt('1010',16)
// 1010 = (1 × 16³) + (0 × 16²) + (1 × 16¹) + (0 × 16⁰) = 4112
