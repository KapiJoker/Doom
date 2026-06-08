const statusEl = document.getElementById('status');
const canvasEl = document.getElementById('canvas');

var Module = {
  canvas: canvasEl,
  locateFile: function(path) {
    if (path.endsWith('.wasm')) return chrome.runtime.getURL('d3wasm.wasm');
    if (path.startsWith('demo_') && path.endsWith('.js')) return chrome.runtime.getURL(path);
    if (path.endsWith('.data')) return chrome.runtime.getURL(path);
    return path;
  },
  setStatus: function(text) {
    if (!text) {
      statusEl.style.display = 'none';
      canvasEl.style.display = 'block';
      return;
    }
    statusEl.innerHTML = text;
  },
  print: function(text) { console.log('[Doom 3]', text); },
  printErr: function(text) { console.error('[Doom 3 ERR]', text); }
};

canvasEl.addEventListener('contextmenu', e => e.preventDefault());