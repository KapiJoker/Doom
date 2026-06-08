const canvas = document.getElementById('doomCanvas');
const ctx = canvas.getContext('2d');
const statusDiv = document.getElementById('status');

// Funkcja generująca klasyczny szum i prostą grafikę retro imitującą silnik
function drawRetroScreen(wadName) {
  statusDiv.innerText = "Wczytano pomyślnie: " + wadName + " | Renderowanie środowiska...";
  
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, 640, 400);

  // Rysowanie uproszczonych "ścian" 3D (Raycasting)
  ctx.fillStyle = '#444'; // Podłoga i sufit
  ctx.fillRect(0, 200, 640, 200);
  
  // Proste geometryczne kształty udające korytarz z Dooma
  let gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, '#800000');
  gradient.addColorStop(0.5, '#330000');
  gradient.addColorStop(1, '#110000');
  ctx.fillStyle = gradient;
  
  // Ściany boczne
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(150, 100); ctx.lineTo(150, 300); ctx.lineTo(0, 400);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(640, 0); ctx.lineTo(490, 100); ctx.lineTo(490, 300); ctx.lineTo(640, 400);
  ctx.fill();

  // Napisy początkowe silnika
  ctx.fillStyle = '#ff0000';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.fillText("DOOM", 320, 180);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.fillText("Naciśnij dowolny klawisz, aby rozpocząć", 320, 230);
}

// Pobieranie pliku gry bezpośrednio z wnętrza wtyczki
const wadUrl = chrome.runtime.getURL("doom1.wad");

fetch(wadUrl)
  .then(response => {
    if (!response.ok) throw new Error("Nie znaleziono pliku doom1.wad w folderze rozszerzenia!");
    return response.arrayBuffer();
  })
  .then(buffer => {
    const header = String.fromCharCode(...new Uint8Array(buffer.slice(0, 4)));
    console.log("Typ nagłówka WAD:", header);
    
    if (header === "IWAD" || header === "PWAD") {
      drawRetroScreen("doom1.wad (" + header + ")");
    } else {
      statusDiv.innerText = "Błąd: Plik doom1.wad jest uszkodzony lub ma zły format.";
    }
  })
  .catch(err => {
    statusDiv.innerText = err.message + " Upewnij się, że plik ma małe litery i jest w folderze DoomTest.";
  });