//	Start at 8,000 -> 500,000
var taxBrackets = {
	joint:[
		{ rate:	10,		min: 0,			max: 18450 },
		{ rate:	15,		min: 18451,		max: 74900 },
		{ rate:	25,		min: 74901,		max: 151200 },
		{ rate:	28,		min: 151201,	max: 230450 },
		{ rate:	33,		min: 230451,	max: 411500 },
		{ rate:	35,		min: 411501,	max: 464850 },
		{ rate:	39.6,	min: 464851,	max: Number.MAX_SAFE_INTEGER }
	],
	single:[
		{ rate:	10,		min: 0,			max: 9225 },
		{ rate:	15,		min: 9225,		max: 37450 },
		{ rate:	25,		min: 37450,		max: 90750 },
		{ rate:	28,		min: 90750,		max: 189300 },
		{ rate:	33,		min: 189300,	max: 411500 },
		{ rate:	35,		min: 411500,	max: 413200 },
		{ rate:	39.6,	min: 413200,	max: Number.MAX_SAFE_INTEGER }
	]
}

var seriesBeforeTax = {name: "Before Tax", data: []},
	singleSeriesAfterTax = {name: "Filing Joint", data: []},
	jointSeriesAfterTax = {name: "Filing Single", data: []},
	singleTaxAmount = {name: "Single Tax Amount", data: []},
	jointTaxAmount = {name: "Joint Tax Amount", data: []},
	xAxis = [];

function BuildXAxis(){
	var brackets = GetRelevantTaxBrackets(taxBrackets.single, 500000);

	var bracket = [];
	var bracketID = 0;
	var currentBracket = brackets[0];
	for(var beforeTax = 1000; beforeTax <= 500000; beforeTax += 1000){

		if(!(beforeTax > currentBracket.min && beforeTax <= currentBracket.max)){
			bracketID++;
			currentBracket = brackets[bracketID];

			xAxis.push([currentBracket.rate + "%", bracket]);
			bracket = [];
		}

		bracket.push(beforeTax);
	}
}

function ProcessIncomes(){
	for(var beforeTax = 1000; beforeTax <= 500000; beforeTax += 1000){
		seriesBeforeTax.data.push(beforeTax);

		var singleTax = CalculateTax(taxBrackets.single, beforeTax);
		var jointTax = CalculateTax(taxBrackets.joint, beforeTax);

		var singleAfterTax = beforeTax - singleTax;
		var jointAfterTax = beforeTax - jointTax;

		singleTaxAmount.data.push(singleTax);
		jointTaxAmount.data.push(jointTax);

		singleSeriesAfterTax.data.push(singleAfterTax);
		jointSeriesAfterTax.data.push(jointAfterTax);
	}
}

function CalculateTax(brackets, income){
	var taxBrackets = GetRelevantTaxBrackets(brackets, income);

	var taxes = 0;

	for(var b in taxBrackets){
		var bracket = taxBrackets[b];

		if(income < bracket.max){
			taxes += (income - bracket.min) * bracket.rate / 100;
		}
		else{
			taxes += (bracket.max - bracket.min) * bracket.rate / 100;
		}
	}

	return Math.round(taxes * 100) / 100;
}

function GetRelevantTaxBrackets(brackets, income){
	var bracketList = [];

	for(var b in brackets){
		if(income >= brackets[b].min){
			bracketList.push(brackets[b]);
		}
	}

	return bracketList;
}

ProcessIncomes();
BuildXAxis();

function findPlotPoint(brackets, incomeVal) {
	for (var bracket in brackets) {
		
	}
}

$(function () {
	$('#container').highcharts({
		chart: {
			zoomType: 'x'
		},
		title: {
			text: 'Income Tax',
			x: -20 //center
		},
		xAxis: {
			// type: 'linear',
			units: xAxis,
			alternateGridColor: '#FDFFD5',
			categories: [ '10%', '15%', '25%', '28%', '33%', '35%', '39.6%']
			// plotBands: [{
			// 	color: '#FCFFC5',
			// 	from: 0,
			// 	to: 18,
			// 	label: {
			// 		text: "Joint @ 10%"
			// 	}
			// },{
			// 	color: 'white',// '#FCFFC5',
			// 	from: 18,
			// 	to: 74,
			// 	label: {
			// 		text: "Joint @ 15%"
			// 	}
			// },{
			// 	color: '#FCFFC5',
			// 	from: 74,
			// 	to: 150,
			// 	label: {
			// 		text: "Joint @ 25%"
			// 	}
			// },{
			// 	color: 'white',// '#FCFFC5',
			// 	from: 150,
			// 	to: 229,
			// 	label: {
			// 		text: "Joint @ 28%"
			// 	}
			// },{
			// 	color: '#FCFFC5',
			// 	from: 229,
			// 	to: 410,
			// 	label: {
			// 		text: "Joint @ 33%"
			// 	}
			// },{
			// 	color: 'white',// '#FCFFC5',
			// 	from: 410,
			// 	to: 463,
			// 	label: {
			// 		text: "Joint @ 35%"
			// 	}
			// },{
			// 	color: '#FCFFC5',
			// 	from: 463,
			// 	to: 600,
			// 	label: {
			// 		text: "Joint @ 39.6%"
			// 	}
			// }]
		},
		yAxis: {
			title: {
				text: 'Before-Tax Income'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: 'rgba(100, 100, 100, 0.3)'
			}]
		},
		tooltip: {
			valuePrefix: '$',
			crosshairs: true
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			borderWidth: 0
		},
		series: [
			seriesBeforeTax,
			singleTaxAmount,
			jointTaxAmount,
			singleSeriesAfterTax,
			jointSeriesAfterTax
		]
	});
});
