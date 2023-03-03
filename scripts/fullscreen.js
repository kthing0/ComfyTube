const pattern = 'https://www.youtube.com/shorts/';
const addButton = () => {
  const menu = document.querySelector('ytd-menu-popup-renderer');
  if (!menu) return;
  const menuItem = document.createElement('ytd-menu-service-item-renderer');
  menuItem.className = 'style-scope ytd-menu-popup-renderer';
  menuItem.setAttribute('role', 'menuitem');
  const formattedString = document.createElement('yt-formatted-string');
  formattedString.className = 'style-scope';
  formattedString.textContent = '';
  menuItem.appendChild(formattedString);
  menuItem.addEventListener('click', () => {
    window.location.href = 'https://youtube.com/watch?v=' + window.location.href.replace(pattern, "");
  });
  menu.appendChild(menuItem);
  observer.disconnect();
};
const observer = new MutationObserver(addButton);
observer.observe(document.documentElement, { childList: true, subtree: true });

const waitUntilLoaded = (selector) => {
  return new Promise((resolve) => {
    const el = document.querySelector(selector);
    if (el) {
      resolve(el);
    } else {
      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          observer.disconnect();
          resolve(el);
        } 
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
};

waitUntilLoaded('ytd-menu-service-item-renderer yt-formatted-string')
.then((formattedStringElem) => {
  formattedStringElem.removeAttribute('is-empty');
  formattedStringElem.classList.remove('yt-formatted-string', 'style-scope');
  formattedStringElem.classList.add('style-scope');

  const isRussian = /(^ru$|^ru-)/.test(document.documentElement.lang);
  if (isRussian) {
    formattedStringElem.textContent = 'Открыть в обычном плеере';
  } else {
    formattedStringElem.textContent = 'Open in default player';
  }

  formattedStringElem.style.marginTop = '-20px';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('transform', 'translate(0, 7)');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M 5.22 3.9 L 18.78 12 L 5.22 20.1 L 5.22 3.9 Z');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  svg.appendChild(path);

  const iconWrapper = document.createElement('div');
  iconWrapper.style.display = 'inline-block';
  iconWrapper.style.marginRight = '16px';
  iconWrapper.appendChild(svg);
  formattedStringElem.prepend(iconWrapper);
});
