function mutate(mutations) {
    mutations.forEach(function(mutation) {
      console.log(mutation.type);
    });
  }
    
var target = document.querySelector('button#answerbutton');
var observer = new MutationObserver( mutate );
var config = { characterData: false, attributes: false, childList: true, subtree: false };

observer.observe(target, config);