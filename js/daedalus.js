(function(){
  if (annyang) {

    var listenSound = new Audio("/aud/listen.mp3");
    listenSound.addEventListener("ended", function() {
      this.src = this.src;
    }, false);

    var searchSound = new Audio("/aud/search.mp3");
    searchSound.addEventListener("ended", function() {
      this.src = this.src;
    }, false);

    var openNewTab = function(dest) {
      if (chrome.tabs)
        chrome.tabs.create({ "url": dest });
      else window.open(dest);
    }

    var listenWolframAlpha = function() {
      listenSound.play();
      annyang.removeCommands(defaultCommandNames);
      annyang.addCommands({ "*query": searchWolframAlpha });
    }

    var searchWolframAlpha = function(query) {
      searchSound.play();
      var dest = "//www.wolframalpha.com/input/?i=" + query;
      openNewTab(dest);
      annyang.removeCommands("*query");
      annyang.addCommands(defaultCommands);
    }

    var listenGoogle = function() {
      listenSound.play();
      annyang.removeCommands(defaultCommandNames);
      annyang.addCommands({ "*query": searchGoogle });
    }

    var searchGoogle = function(query) {
      searchSound.play();
      var dest = "//www.google.com/search?q=" + query;
      openNewTab(dest);
      annyang.removeCommands("*query");
      annyang.addCommands(defaultCommands);
    }

    var listenWikipedia = function() {
      listenSound.play();
      annyang.removeCommands(defaultCommandNames);
      annyang.addCommands({ "*query": searchWikipedia });
    }

    var searchWikipedia = function(query) {
      searchSound.play();
      var dest = "//www.wikipedia.org/wiki/" + query;
      openNewTab(dest);
      annyang.removeCommands("*query");
      annyang.addCommands(defaultCommands);
    }

    var defaultCommands = {
      "wolfram alpha": listenWolframAlpha,
      "google": listenGoogle,
      "wikipedia": listenWikipedia
    }
    
    var defaultCommandNames = [
      "wolfram alpha",
      "google",
      "wikipedia"
    ]

    annyang.init(defaultCommands);
    annyang.start();

  }
})();