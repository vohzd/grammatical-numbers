// Using 'classic' function declarations due to everything being hoisted
// no more annoying bugs due to expressing as part of a variable / method of an object

function init(){

	// get an instance
	const rangeSlider = registerSliderListener("#numWords", handleConversionToString);

	// start the slider to the left instead of at the middle
	initSliderAtZero("#numWords");

	// show 0 as 'Zero'
	handleConversionToString(0)

}

function initSliderAtZero(id){
	// takes id of dom element
	$(id).val(0);
}

function registerSliderListener(id, handler){
	// Takes id, and function for when something happens

	// Damn you to hell, IE (http://stackoverflow.com/questions/28118849/range-slider-input-event-not-firing-in-ie-10)
	const eventType = isSaneBrowser();

	// listen to it
	$(id).on(eventType, function(event){

		// get its value
		let current = $(id).val();
			// turn to int
			current = parseInt(current);

		// quick and dirty check if actually a function
		if (typeof handler !== "function") {
			console.log("computer says no");
			return;
		}
		else { 
			// cram it through the event handler
			handler(current);
		}
	});


}

function recursiveCheck(integer)
{
	if (integer <= 19){
		return firstNineteen(integer);
	}
	else if (integer >= 20 && integer <= 100){
		return getTensPhrase(integer);
	}
	else if (integer >= 101 && integer <= 999){

		let quantity = recursiveCheck(parseInt(integer / 100));

		// ends in a zero
		if (integer % 100 === 0)
		{
			return quantity + " Hundred";
		}
		else
		{
			const tens = cropNumber(integer, 1);
			let tensAsPhrase = recursiveCheck(tens);

			return quantity + " Hundred and " + tensAsPhrase
		}
	}
	else if (integer === 1000)
	{
		return "One Thousand :)";
	}
}


function isSaneBrowser(){

	let userAgent = navigator.userAgent;

	let isIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1;

	// because range events fire on 'change' in IE, and 'input' in others
	if (isIE){
		return "change";
	}
	else {
		return "input"
	}

}

function handleConversionToString(integer){

	const asString = integer.toString();
	const numberLength = asString.length;

	let FinalPhrase = recursiveCheck(integer);

	sendPhraseToView(FinalPhrase);

}


function cropNumber(integer, offset){
	// using the substr method as its quick and easy
	let asString = integer.toString();
	let secondNum = asString.substr(offset,asString.length);

	return parseInt(secondNum);
}

// Because English is weird and awkward, treat the range 20 - 90 as its actual phrase e.g Eighty
function getFirstNumberAsPhraseBetween20and99(integer){

	let rootNum = parseInt(integer / 10);

	return between20and99(rootNum);

}

function getSecondNumberAsPhraseBetween20and99(integer, offset1, offset2){

	// using the substr method as its quick and easy
	let asString = integer.toString();
	let secondNum = asString.substr(offset1,offset2);

	return firstNineteen(secondNum);

}


// What this is doing is figuring out what any number between 20 -- 99 should be 
function getTensPhrase(integer)
{
	let firstNumberPhrase = getFirstNumberAsPhraseBetween20and99(integer);

	if (integer % 10 === 0)
	{
		// Eg 'Twenty', "Thirty"
		return firstNumberPhrase;
	}
	else
	{
		// Eg 'Ninety-Eight'
		let secondNumberPhrase = getSecondNumberAsPhraseBetween20and99(integer, 1, 2);
		let combined = firstNumberPhrase + "-" + secondNumberPhrase;

		return combined;
	}
}


function sendPhraseToView(phrase){

	$(".phrase-output").html(phrase);

}

function firstNineteen(integer){
	const arr = [
		"Zero",
		"One",
		"Two",
		"Three",
		"Four",
		"Five",
		"Six",
		"Seven",
		"Eight",
		"Nine",
		"Ten",
		"Eleven",
		"Twelve",
		"Thirteen",
		"Fourteen",
		"Fifteen",
		"Sixteen",
		"Seventeen",
		"Eighteen",
		"Nineteen"
	]

	return arr[integer];
}

function between20and99(integer){

	const arr = [
		null,
		null,
		"Twenty",
		"Thirty",
		"Fourty",
		"Fifty",
		"Sixty",
		"Seventy",
		"Eighty",
		"Ninety"
	]

	return arr[integer];
}


