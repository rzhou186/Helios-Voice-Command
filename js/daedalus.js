(function(){
  if (annyang) {
    var engines = {
      "google": "//www.google.com/search?q=",
      "wikipedia": "//www.wikipedia.org/wiki/",
      "wolfram alpha": "//www.wolframalpha.com/input/?i="
    }

    var listenSound = new Audio("/aud/listen.mp3");
    var searchSound = new Audio("/aud/search.mp3");
    var cancelSound = new Audio("/aud/cancel.mp3");

    var openNewTab = function(dest) {
      if (chrome.tabs)
        chrome.tabs.create({ "url": dest });
      else window.open(dest);
    }

    var resetDaedalus = function() {
      annyang.removeCommands([ "nevermind", "*query" ]);
      annyang.addCommands(startCommands);
    }

    var listenDaedalus = function(engine) {
      listenSound.play();
      annyang.removeCommands(startCommandNames);
      annyang.addCommands({
        "nevermind": cancelDaedalus,
        "*query": function(query) {
          searchDaedalus(engine + query);
        }
      });
    }

    var searchDaedalus = function(dest) {
      searchSound.play();
      openNewTab(dest);
      resetDaedalus();
    }

    var cancelDaedalus = function() {
      cancelSound.play();
      resetDaedalus();
    }

    var startCommands = {}
    for (var engine in engines) {
      startCommands[engine] = function() {
        listenDaedalus(engines[engine]);
      }
    }
    var startCommandNames = Object.keys(engines);
    
    annyang.init(startCommands);
    annyang.start();
  }
})();