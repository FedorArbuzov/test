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
      if (mutationRecord.target.style.display === 'block'){
        // процедура зачисления баллов и тд
      }
    });    
});

var target = document.getElementById('codeCheckCorrect');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });