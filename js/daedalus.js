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

    var cancelSound = new Audio("/aud/cancel.mp3");
    cancelSound.addEventListener("ended", function() {
      this.src = this.src;
    }, false);

    var openNewTab = function(dest) {
      if (chrome.tabs)
        chrome.tabs.create({ "url": dest });
      else window.open(dest);
    }

    var listenDaedalus = function(root) {
      listenSound.play();
      annyang.removeCommands(startCommandNames);
      annyang.addCommands({
        "nevermind": cancelDaedalus,
        "*query": function(query) {
          searchDaedalus(root + query);
        }
      });
    }

    var searchDaedalus = function(dest) {
      searchSound.play();
      openNewTab(dest);
      annyang.removeCommands([ "nevermind", "*query" ]);
      annyang.addCommands(startCommands);
    }

    var cancelDaedalus = function() {
      cancelSound.play();
      annyang.removeCommands([ "nevermind", "*query" ]);
      annyang.addCommands(startCommands);
    }

    var startCommands = {
      "wolfram alpha": function() {
        listenDaedalus("//www.wolframalpha.com/input/?i=");
      },
      "google": function() {
        listenDaedalus("//www.google.com/search?q=");
      },
      "wikipedia": function() {
        listenDaedalus("//www.wikipedia.org/wiki/");
      }
    }
    
    var startCommandNames = [
      "wolfram alpha",
      "google",
      "wikipedia"
    ]

    annyang.init(startCommands);
    annyang.start();

  }
})();