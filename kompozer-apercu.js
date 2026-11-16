(function () {
  if (!window.CSS || !CSS.supports || !CSS.supports('display','grid')) return;
  document.documentElement.className = '';
  document.addEventListener('DOMContentLoaded',function () {
    document.querySelectorAll('link[data-site-css]').forEach(function (link) { link.media='all'; });
    document.querySelectorAll('img[data-original]').forEach(function (im) {
      if(im.getAttribute('src')===im.getAttribute('data-kompozer-src')) im.src=im.getAttribute('data-original');
    });
    Array.from(document.querySelectorAll('[data-site-element]')).reverse().forEach(function (old) {
      var el=document.createElement(old.getAttribute('data-site-element'));
      Array.from(old.attributes).filter(function(a){return a.name!=='data-site-element';}).forEach(function(a){el.setAttribute(a.name,a.value);});
      while(old.firstChild) el.append(old.firstChild);
      old.replaceWith(el);
    });
    document.querySelectorAll('a.affiche-video-kompozer').forEach(function (poster) {
      var video=document.createElement('video');
      video.className=poster.className.replace(' affiche-video-kompozer','');
      video.controls=true;
      video.playsInline=true;
      video.preload='metadata';
      video.poster=poster.querySelector('img').src;
      video.src=poster.href;
      video.addEventListener('play',function () { video.classList.add('tele-en-lecture'); });
      poster.replaceWith(video);
    });
    Array.from(document.querySelectorAll('[data-detail]')).reverse().forEach(function (el) {
      var details=document.createElement('details'), summary=document.createElement('summary');
      details.className=el.className.replace(/(?:^|\s)kompozer-detail\b/g,'');
      Array.from(el.attributes).filter(function(a){return a.name!=='class'&&a.name!=='data-detail';}).forEach(function(a){details.setAttribute(a.name,a.value);});
      var heading=el.firstElementChild;
      if (heading && heading.hasAttribute('data-summary')) {
        summary.className=heading.className;
        while(heading.firstChild) summary.append(heading.firstChild);
        heading.remove();
      }
      details.append(summary);
      while(el.firstChild) details.append(el.firstChild);
      el.replaceWith(details);
    });
    document.querySelectorAll('form').forEach(function(form) {
      form.addEventListener('submit',function(event){event.preventDefault();});
    });
  });
}());
