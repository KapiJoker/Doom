const canvasEl = document.getElementById('canvas');
const wadName = new URLSearchParams(location.search).get("wad") || "doom1.wad";
const wadUrl = chrome.runtime.getURL(wadName);

var Module = {
  canvas: canvasEl,
  arguments: ["-iwad", wadName, "-window"],
  
  // TA FUNKCJA NAPRAWIA BŁĄD UNEXPECTED TOKEN '<'
  locateFile: function(path) {
    if (path.endsWith('.wasm')) {
      return chrome.runtime.getURL('doom.wasm');
    }
    if (path.endsWith('.js')) {
      return chrome.runtime.getURL(path);
    }
    return path;
  },
  
  preRun: [function() {
    console.log("Montowanie klasycznego WAD:", wadName);
    Module.FS_createPreloadedFile('/', wadName, wadUrl, true, false);
  }],
  print: function(text) { console.log('[Classic DOOM]', text); },
  printErr: function(text) { console.error('[Classic DOOM ERR]', text); }
};

canvasEl.addEventListener('contextmenu', e => e.preventDefault());