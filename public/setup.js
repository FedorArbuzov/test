function mutate(mutations) {
    mutations.forEach(function(mutation) {
      console.log(mutation.type);
      if (mutation.target.style.display === 'block' && targetStyle !== 'block'){
        targetStyle = 'block';
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
  }
    
var target = document.querySelector('div#assignmentCorrect');
var targetStyle = target.style.display;
var observer = new MutationObserver( mutate );

observer.observe(target, { attributes : true, attributeFilter : ['style'] });