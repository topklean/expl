// Define the tour!
var tour = {
  id: "hello-hopscotch",
  steps: [
	{
	  title: "Cloner le code sur votre PC",
	  content: "Pour cloner le code sur votre PC, lancer Kermit-portable puis faites<br/><br/><code>rhc git-clone &lt;APP&gt;</code><br/><br/>Il se peut qu'une erreur du type <i>'Error while adding config values to git - error: could not lock config file .git/config: No such file or directory'</i> apparaisse, ignorez-la.",
	  target: "header",
	  placement: "right"
	},
	{
	  title: "",
	  content: "This is the header of my page.",
	  target: "header",
	  placement: "right"
	},
  ]
};

// Start the tour!
hopscotch.startTour(tour);