/*global todomvc, angular */
'use strict';
var showBonus = false;

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TourCtrl', function TodoCtrl($scope) {
	$scope.kermitPortableUrl = "https://orangeforge.rd.francetelecom.fr/file/showfiles.php?group_id=4178&release_id=13779";
	$scope.globaldomain = "dev.kermit.rd.francetelecom.fr";
	$scope.publicdomain = "dev.kermit.orange-labs.fr";
	$scope.consoleHome = "https://broker."+$scope.globaldomain+"/console/applications/";
	$scope.defaultAppName="application_name";
	$scope.appName = $scope.defaultAppName;
	$scope.domain = "demo";
	
	$scope.isBonusVisible = false;
	
	$scope.onKonami = function(){
		$scope.startTour('bonus',3);
	}

	$scope.init = function(){
		if($scope.appName == $scope.defaultAppName){
			//Récupère le domaine ex : atelier-demo.dev.kermit.rd.francetelecom.fr
			var host = window.location.host;
			if( host !== ""){
				var nameAndDomain = host.split('.')[0].split('-');
				$scope.appName = nameAndDomain[0];
				$scope.domain = nameAndDomain[1];
			}
		}
		if(!$scope.appName){
			$scope.appName = $scope.defaultAppName;
		}
		console.log("appname = ",$scope.appName);
		console.log("domain = ",$scope.domain);
	};
	
	$scope.appPublicDNS =function(){
		return $scope.appName+"-"+$scope.domain+"."+$scope.publicdomain;
	}
	
	$scope.appHttpUrl = function(){
		return "http://"+$scope.appName+"-"+$scope.domain+"."+$scope.globaldomain;
	};
	
	$scope.newStep = function(tourId, id){
		return {
			title: document.querySelector("[data-tour='"+tourId+"'] [data-tour-step='"+id+"']").title,
			content: document.querySelector("[data-tour='"+tourId+"'] [data-tour-step='"+id+"']").innerHTML,
			target: "header",
			placement: "right",
			showPrevButton : true
		};
	}
	
	$scope.newTour = function(id, nbSteps, onEnd){
		var tour = {
			id: id,
			bubbleWidth : 400,
			bubblePadding : 20,
			i18n : {
				prevBtn:"Prec.",
				nextBtn:"Suite",
				doneBtn:"Fin"
			  },
			steps: []
		};
		
		for(var i = 1; i<=nbSteps; i++){
			tour.steps.push($scope.newStep(id,i));
		};
		
		if(id == 'normal'){
			tour.onNext = function(){
				if(hopscotch.getCurrStepNum() == (nbSteps-1)){
					console.log("bonus is now visible");
					$scope.isBonusVisible = true;
					$scope.$digest();
				};
			};
		};
		
		return tour;
	};
	
	$scope.startTour = function(id, nbSteps){
		hopscotch.endTour();
		hopscotch.startTour($scope.newTour(id,nbSteps));
	};
	
	$scope.init();
	
	$(function(){
		var kKeys = [];
		function Kpress(e){
			kKeys.push(e.keyCode);
			if (kKeys.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
				$(this).unbind('keydown', Kpress);
				$scope.onKonami();
			}
		}
		$(document).keydown(Kpress);
	});
	
});
