window.addEventListener('load', function() {
  if (window.location.href.includes('youtube.com/watch?v=')){
    setTimeout(function() {
      const targetNode = document.querySelector('.ytp-pip-button.ytp-button');

      const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length) {
            targetNode.style.display = 'initial';
            observer.disconnect();
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(document.body, {childList: true, subtree: true});
    }, 1000); // 
  }
});
