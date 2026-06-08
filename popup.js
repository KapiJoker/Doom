// Klasyk 1 i 2 kieruje do game_classic.html z odpowiednim parametrem ?wad=
document.getElementById("doom1").onclick = () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("game_classic.html?wad=doom1.wad") });
};

document.getElementById("doom2").onclick = () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("game_classic.html?wad=doom2.wad") });
};

// Doom 3 kieruje do dedykowanego game_d3.html
document.getElementById("doom3").onclick = () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("game_d3.html") });
};