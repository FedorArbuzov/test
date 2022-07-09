window.editor = CodeMirror.fromTextArea(document.getElementById("textareaCode"), {
    mode: "text/html",
    htmlMode: true,
    lineWrapping: true,
    smartIndent: false,
    addModeClass: true
  });

document.querySelector('#showCorrectBtn').style.display = 'none';

let codeMirrors = document.querySelectorAll('.CodeMirror-wrap')
codeMirrors[1].style.display = 'none';

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
      console.log(mutationRecord.target);
      console.log(mutationRecord.target.style.display);
      if (mutationRecord.target.style.display === 'block' && targetStyleDisplayInitial !== 'block'){
        targetStyleDisplayInitial = 'block';
        // процедура зачисления баллов и тд
        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(prop),
        });
        // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
        let page = params.page; // "some_value"
        fetch(`/success-submit/${page}/${localStorage.getItem('telegramID')}`).then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log(data);
        }).catch(function() {
          console.log("Booo");
        });
      }
    });    
});

var target = document.getElementById('codeCheckCorrect');
var targetStyleDisplayInitial = target.style.display;
observer.observe(target, { attributes : true, attributeFilter : ['style'] });