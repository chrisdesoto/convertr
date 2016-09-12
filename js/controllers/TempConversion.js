conversionControllers.controller('TempConversion', function($scope, materializeInput) {

	//The available units to convert from and to
  $scope.tempUnits = [{name:"Fahrenheit"}, {name: "Celsius"}, {name: "Kelvin"}, {name: "Rankine"}];
	
	//Assigning min values based on the units being converted  
  $scope.minTemp = function () {	  
	  switch($scope.unitsFrom) {
	  	case 'Fahrenheit':
		  	return -459.67;
	  	case 'Celsius':
				return -273.15;
	  	case 'Kelvin':
	  	case 'Rankine':
				return 0;
			default:
				return "";					
	  }
  };
  
  //Assigning max values based on the units being converted
  $scope.maxTemp = function () {	  
	  switch($scope.unitsFrom) {
	  	case 'Fahrenheit':
	  	case 'Rankine':
				return math.bignumber('2.55e+32');
	  	case 'Celsius':
	  	case 'Kelvin':
				return math.bignumber('1.41e+32');
			default:
				return "";						
	  }
  };
  
  //Initialize the coefficient and exponent inputs to null
  $scope.coefficientInput = $scope.exponentInput = null;
  
  //Sets the exponent input to zero if it is null
  $scope.setExponentInput = function () {
  	if ($scope.exponentInput == null) 
  		$scope.exponentInput = 0;
  };
  
  //Initialize the decimal range to 2
  $scope.decimalRange = 2;  
  
  //Determine the proper conversion equation based on the select elements
	$scope.output = function() {
		if ($scope.coefficientInput != null){
			return math.unit($scope.coefficientInput + 'E' + $scope.exponentInput + ' ' + $scope.unitsFrom.toLowerCase()).to($scope.unitsTo.toLowerCase()).toString();
		}
		else {
			return '';	
		}
	};   
	
	//Check if the input value is outside of the possible values for the currently selected unit system
  $scope.checkInput = function () {
		if ($scope.coefficientInput == null || $scope.exponentInput == null) {}
		else {
	  	var evalInput = math.eval($scope.coefficientInput + 'e' + $scope.exponentInput);
	  	if (evalInput < $scope.minTemp()) {
				$scope.coefficientInput = $scope.minTemp();
				$scope.exponentInput = 0;
	  	}
	  	//Else if the value is above the max reassign the value to the max
	  	else if (evalInput > $scope.maxTemp()) {
	  		$scope.coefficientInput = Number($scope.maxTemp().toString().split('e+')[0]);
	  		$scope.exponentInput = Number($scope.maxTemp().toString().split('e+')[1]);
	  	} 
	  }
  };	
	
	//Add the materializeInput service to the current scope for use with angular directives
	$scope.enableInput = function() {
		materializeInput.enableInput();
	};
	
	//Add the materializeInput service to the current scope for use with angular directives
	$scope.resetSelect = function() {
		materializeInput.enableSelect();
		materializeInput.clearDropdown();
	};
	  
});