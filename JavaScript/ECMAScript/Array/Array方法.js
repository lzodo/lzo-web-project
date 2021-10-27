let arr = ['a','b','c','d','e','f','g','a','b'];
console.log('======不改变原数组(如果不动遍历第三个原数组参数的话)======')
console.log(arr.map(item => item + 'a'))  //修改数组中的元素并返回一个新数组，其中每个元素都使用指定函数进行过转换。 
console.log(arr.forEach(item => item + 'a'))  //遍历数组 无return,(item,index,原数组) 代替for
console.log(arr.filter(item => item == 'a'))  //返回一个数组，只有当指定函数返回 true 时，相应的元素才会被包含在这个数组中
console.log(arr.reduce((fnRetrunNewVal, itema) => { return fnRetrunNewVal + itema},0)) //每一项进行累加
console.log(arr.find(item => item == 'x')) //返回符合条件的第一项(只会返回符合条件的第一个) 或undefined
console.log(arr.findIndex(item => item == 'x')) //返回符合条件的第一项索引 或 -1
console.log(arr.indexOf('a')) //返回匹配的索引或-1
console.log(arr.slice(2, 4)) //拷贝子数组 （起始位置,结束位置) 包前不包后
console.log(arr.every(item=>item != 'x')) //所有元素满足返回true,否则返回false
console.log(arr.some(item=>item == 'a')) //只要有一个满足返回true,否则返回false
console.log(arr.includes('a')) //判断数中是否包含给定的值
//console.log(arr.flat()) //数组扁平化(默认展开一层,Infinity展开全部,还能用数字表示)
console.log(arr.join('_')) //装字符串(如果有子数组用默认逗号相连)
console.log('======改变原数组======')
console.log(arr.splice(1,2,'c')) //替换原数组 (位置索引,删除长度,插入元素)
console.log(arr.sort()) //数组排序 改变原数组并返回排序后的数组
console.log(arr.push()) //后加并返回长度
console.log(arr.pop('f')) //后删并返回删除的元素
console.log(arr.unshift('g')) //前加并返回长度
console.log(arr.shift()) //前删并返回删除元素
console.log(arr.fill(5,1,2)) //填充数组(待填充的元素,起始索引,结束索引)
console.log(arr.reverse(arr)) //反转数组
console.log('======Array方法======')
Array.from(arr) //将伪数组(有length的)变成数组  || arr = [...str]
Array.of('1','b','3') //将一组值转为数组
Array.isArray(arr) //判断一个对象是否为数组 
console.log('======遍历器========')
arr.keys() //键
arr.values() //值
arr.entries() //键值对

'10000000000'.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/*
p=pro_e=cmd_w=2_com=4_v=02050001FF00DDC9_rep=2

p=pro_e=cmd_w=2_com=4_v=0205000100009C39_rep=2
p=pro_e=cmd_w=2_com=4_v=0205000100009C39_rep=2
*/
console.log('================================')
let reducearr = ['a','b','c','d','e','f','g','a','b'];
reducearr.reduce((fnRetrunNewVal, item) => {
	console.log(fnRetrunNewVal ,item)
		if(item == 'a'||item == 'f'){
			fnRetrunNewVal.push(item);
		}
		return fnRetrunNewVal
},[])

var numbers = [6.1, 4.2, 6.3,9.3,4.6,6,10.6,7.7,7.5,4.8];
let flats = numbers.reduce((fnRetrunNewVal, item) => {
		if(fnRetrunNewVal[Math.floor(item)]){
			fnRetrunNewVal[Math.floor(item)].push(item)
		}else{
			fnRetrunNewVal[Math.floor(item)] = [item];
		}
		return fnRetrunNewVal
},{})
console.log(flats);

//合并
var wizards = [
	{
	  name: 'Harry Potter',
	  house: 'Gryfindor'
	},
	{
	  name: 'Cedric Diggory',
	  house: 'Hufflepuff'
	},
	{
	  name: 'Tonks',
	  house: 'Hufflepuff'
	},
	{
	  name: 'Ronald Weasley',
	  house: 'Gryfindor'
	},
	{
	  name: 'Hermione Granger',
	  house: 'Gryfindor'
	}
  ];
  var points = {
	HarryPotter: 500,
	CedricDiggory: 750,
	RonaldWeasley: 100,
	HermioneGranger: 1270
  };

  let hebin = wizards.reduce((fnRetrunNewVal, item) => {
	var name = item.name.split(' ').join('');
	if(points[name]){
		item.points = points[name];
	}
	fnRetrunNewVal.push(item);
	return fnRetrunNewVal
  },[])
  console.log(hebin);

    
  let hebin2 = wizards.reduce((fnRetrunNewVal, item) => {
	var name = item.name.replace(" ",'');

	fnRetrunNewVal[name] = {house:item.house}
	if(points[name]){
		fnRetrunNewVal[name].points = points[name];
	}
	return fnRetrunNewVal
  },{})
  console.log(hebin2);

