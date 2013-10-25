// Define the tour!
var kermitPortableUrl = "https://orangeforge.rd.francetelecom.fr/file/showfiles.php?group_id=4178&release_id=13779";
var globaldomain = "dev.kermit.rd.francetelecom.fr";
var consoleHome = "https://broker."+globaldomain+"/console/applications/";

var defaultAppName="application_name";
var appName = defaultAppName;

function getAppName(){
	if(appName == defaultAppName){
		var domainMatchs = /:////([^//]+)/.exec(window.location.href);
		if(domainMatchs){
			appName = domainMatchs[1];
		}
	}
	if(!appName){
		appName = defaultAppName;
	}
	console.log("Domain = ",appName);
	return appName;	
}

function getDomain(){
	return "demo";
}

function getAppUrl(){
	return "http://"+getAppName()+"-"+getDomain()+"."+globaldomain;
}

var tour = {
  id: "hello-hopscotch",
  bubbleWidth : 400,
  bubblePadding : 20,
  steps: [
	{
	  title: "Cloner le code sur votre PC",
	  content: "Pour cloner le code sur votre PC, lancer <a href='"+kermitPortableUrl+"'>Kermit-portable</a> puis faites<br/><br/>"+
				"<code>rhc git-clone "+getAppName()+"</code><br/><br/>"+
				"Remarque : Il se peut qu'une erreur apparaisse<br/><i>Error while adding config values to git - error: could not lock config file .git/config: No such file or directory</i><br/>Ignorez-la.<br/><br/>"+
				"Pour valider cette &eacutetape faites <br/><br/>"+
				"<code>cd "+getAppName()+"</code>",
	  target: "header",
	  placement: "right",
	  showPrevButton : true
	},
	{
	  title: "S'amuser avec l'application",
	  content: "Essayez d'ajouter une t&acirc;che du type<br/><br/><b>'R&eacutesilier mon abonnement Orange'</b>&nbsp;<br/><br/>"+
			   "Ca ne marche pas ?<br/>"+
			   "Vous pouvez regarder ce qu'il se passe dans les logs de l'application pendant que vous faites l'ajout<br/><br/>"+
			   "<code>rhc tail "+getAppName()+"</code><br/><br/>"+
			   "<img style='width:360px' src='errorlogs.png'/>",
	  target: "header",
	  placement: "right",
	  showPrevButton : true
	},
	{
	  title: "S'amuser avec l'application (soluce)",
	  content: "Vous n'avez pas compris l'&eacute;tape pr&eacute;c&eacute;dente  ? <br/><br/>"+
				"Vous pouvez regarder directement dans le code du fichier<br/>"+
				"<b>src/main/java/com/orange/todolist/TodoStorage.java</b><br/> la méthode <code>validate</code> pour mieux comprendre",
	  target: "header",
	  placement: "right",
	  showPrevButton : true
	},
	{
	  title: "Je persiste, tu persistes, ...",
	  content: "Actuellement, les todos ne sont sauvegardés que pendant la durée de vie de l'application.<br/><br/>"+
	  "<span style='color:red;'>Si vous la redémarrer, vous perdez vos données.</span><br/><br/>"+
	  "Pour pallier à ce problème ajoutons le support <b>MySQL</b> pour persister ces todos",
	  target: "header",
	  placement: "right",
	  showPrevButton : true
	},
	{
	  title: "Support MySQL",
	  content: "Pour ajouter un service MySQL à l'application il faut demander à Kermit de lui associer une 'cartridge' MySQL<br/><br/>"
				+"Allez sur la <a href='https://broker.dev.kermit.rd.francetelecom.fr/console/applications/"+getAppName()+"'>page de votre projet</a><br/>"
				+"<ol>"
				+"<li>Add Cartridge</li>"
				+"<li>Select <b>MySQL 5.1</b></li>"
				+"<li>Add Cartridge</li>"
				+"<li>Wait</li>"
				+"<li>Done</li>"
				+"</ol>"
				+"<video src='screecast.avi'></video>",
				
	  target: "header",
	  placement: "right",
	  showPrevButton : true
	},
	{
	  title: "Modifier le code pour MySQL",
	  content: "Ajouter une cartridge ne suffit pas pour stoquer les todos dans mysql<br/>"
				+"Il va falloir modifier le code (un peu)<br/><br/>"
				+"Dans la méthode <b>getStorageService</b> de la classe <b>src/main/java/com/orange/todolist/TodosServlet.java</b><br/><br/>"
				+"Commentez l'utilisation de <b>TodoStorageInMemory</b> et décommentez la suite de la méthode (utilisation de <b>TodoStorageJDBCMysql</b>)<br/><br/>"
				+"Sauvegardez vos modifications dans git<br/><br/>"
				+"<code>git commit -am \"Passage a MySQL\"",
				
	  target: "header",
	  placement: "right",
	  showPrevButton : true
	},
	{
	  title: "Redéployer le code",
	  content: "Popur redéployer le code :<br/>"
				+"<code>git push</code><br/><br/>"
				+"Rendez-vous sur <a href='"+getAppUrl()+"'>Votre application</a><br/><br/>"
				+"Under the hood :"
				+"<ul><li>le code est envoyé sur le serveur</li><li>JBoss est coupé</li><li>un build maven est lancé</li><li>Jboss est redémarré</li><li>votre application est prête</li></ul>",
	  target: "header",
	  placement: "right",
	  showPrevButton : true
	},
  ]
};

// Start the tour!
hopscotch.startTour(tour);