const statusEl = document.getElementById('status');
const canvasEl = document.getElementById('canvas');

var Module = {
  canvas: canvasEl,
  
  // Ta funkcja tłumaczy wewnętrzne zapytania silnika na bezpieczne linki rozszerzenia
 locateFile: function(path) {
    if (path.endsWith('.wasm')) {
      return chrome.runtime.getURL('d3wasm.wasm');
    }
    // Obsługa skryptów dema
    if (path.startsWith('demo_') && path.endsWith('.js')) {
      return chrome.runtime.getURL(path);
    }
    // NOWOŚĆ: Obsługa pliku z pakietem danych .data
    if (path.endsWith('.data')) {
      return chrome.runtime.getURL(path);
    }
    return path;
  },
  
  setStatus: function(text) {
    if (!text) {
      statusEl.style.display = 'none';
      canvasEl.style.display = 'block';
      return;
    }
    statusEl.innerHTML = text;
    console.log('[Emscripten Status]', text);
  },
  
  print: function(text) { console.log('[DOOM stdout]', text); },
  printErr: function(text) { console.error('[DOOM stderr]', text); }
};

canvasEl.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});