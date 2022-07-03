var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        console.log('style changed!');
    });    
});

var target = document.getElementById('codeCheckCorrect');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });