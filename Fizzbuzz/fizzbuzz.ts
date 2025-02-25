/** This function takes a number as an input and output a string if it can be divided by 3 or 5 or both
	* @input n: number
	* @return 'Fizz' : string if it can be divided by 3
	* @return 'Buzz' : string if it can be divided by 5
	* @return 'Fizzbuzz': string if it can be divided by both 3 and 5
	* @return n: number, if it can not be divided by 3, by 5 or by both 3 and 5
	**/

export const fizzbuzz = (n: number): string | number => {
	if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz'
	else if (n % 3 === 0) return 'Fizz'
	else if (n % 5 === 0) return 'Buzz'
	else return n
}
