var coins = [1,5,10,50,100,500];
var pay = 2430;

function greedSol(coins,pay){
	var result = {};
	for (var i=coins.length-1;i>=0;i--){
		var coinNum = Math.floor(pay/coins[i]);	
		pay -= coins[i] * coinNum;
		result[coins[i]] = coinNum;
	}
	return result;
}

console.log(greedSol(coins,pay));

