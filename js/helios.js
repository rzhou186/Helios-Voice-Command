(function(){
  if (annyang) {

    var roots = {
      "Google": "//www.google.com/search?q=",
      "Wikipedia": "//www.wikipedia.org/wiki/",
      "Wolfram|Alpha": "//www.wolframalpha.com/input/?i="
    };

    var listenSound = new Audio("/aud/listen.mp3");
    var searchSound = new Audio("/aud/search.mp3");
    var cancelSound = new Audio("/aud/cancel.mp3");

    var openNewTab = function(dest) {
      if (chrome.tabs)
        chrome.tabs.create({ "url": dest });
      else window.open(dest);
    };

    var listenHelios = function() {
      listenSound.play();
      annyang.removeCommands(triggerWord);
      annyang.addCommands(listenCommands);
    };

    var searchHelios = function(dest) {
      searchSound.play();
      openNewTab(dest);
      resetHelios();
    };

    var cancelHelios = function() {
      cancelSound.play();
      resetHelios();
    };

    var resetHelios = function() {
      annyang.removeCommands(listenWords);
      annyang.addCommands(triggerCommand);
    };

    var triggerWord = "helios";
    var triggerCommand = { "helios": listenHelios };

    var listenWords = [ "nevermind", "*query" ];
    var listenCommands = {
      "nevermind": cancelHelios,
      "*query": function(query) {
        searchHelios(roots["Wolfram|Alpha"] + query);
      }
    };
    
    annyang.init(triggerCommand);
    annyang.start();

  }
})();