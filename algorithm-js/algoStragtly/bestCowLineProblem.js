debugger;
var N = "ACDBCB";

function bestCowLineSolve(text) {
	var leftPosition = 0,
		rightPosition = text.length - 1,
		result = [],
		textLen = text.length,
		tempStr = text;

	while (textLen > 0) {
		let leftChar = text[leftPosition];
		let rightChar = text[rightPosition];
		if(textLen == 1){
			result.push(leftChar);
			textLen--;
			break;
		}

		if (leftChar < rightChar) {
			result.push(leftChar);
			leftPosition++;
			tempStr = tempStr.substr(leftPosition, textLen);
		} else if (rightChar < leftChar) {
			result.push(rightChar);
			rightPosition--;
			tempStr = tempStr.substr(0, rightPosition);
		} else {
			let reverseStr = tempStr.split("").reverse().join("");
			if (reverseStr < tempStr) {
				result.push(reverseStr[0]);
				rightPosition--;
				tempStr = tempStr.substr(0, rightPosition);
			} else {
				result.push(tempStr[0]);
				leftPosition--;
				tempStr = tempStr.substr(leftPosition, textLen);
			}

		}
		textLen--;
		console.log(tempStr);
	}
	return result;
}

console.log(bestCowLineSolve(N));
