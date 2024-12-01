const api = 'https://fut.codia-dev.com/players.json';
let playersData = [];

fetch(api)
    .then(response => response.json())
    .then(data => {
        playersData = data.players || [];
    })
    .catch(error => {
        console.error("Error fetching players data:", error);
    });

// popup players
const filterPlayersPopup = (position, buttonClicked) => {
    const popupContainer = document.getElementById("popup");
    popupContainer.innerHTML = "";

    const filteredPlayers = playersData.filter(player => player.position === position);

    const popupContent = document.createElement("div");
    popupContent.className = "bg-white w-[80%] mx-auto p-5 rounded shadow-lg max-h-[80vh] overflow-y-auto relative";

    if (filteredPlayers.length === 0) {
        popupContent.innerHTML = `<p class="text-center text-gray-600">No players available for this position.</p>`;
    } else {
        filteredPlayers.forEach(player => {
            const playerCard = document.createElement("div");
            playerCard.className = "flex items-center p-3 border-b border-gray-300 cursor-pointer hover:bg-gray-100";

            playerCard.innerHTML = `
                <img src="${player.photo}" alt="${player.name}" class="w-12 h-12 rounded-full mr-4" />
                <div class="flex-1">
                    <h3 class="text-sm font-bold">${player.name}</h3>
                    <p class="text-gray-600 text-sm">Position: ${player.position}</p>
                    <p class="text-gray-600 text-sm">Rating: ${player.rating}</p>
                </div>
            `;

            // Replace clicked button with selected player details
            playerCard.addEventListener("click", () => {
            
            // const toChange = document.getElementById("toBeChanged");
            // toChange.classList.remove("player-infos");
            
                buttonClicked.innerHTML = `
                    <div class="mx-auto text-sm">${player.position}</div>
                    <div class="player-infos">
                        <img src="${player.photo}" alt="${player.name}" class="w-12 h-12 rounded-full">
                    </div>
                    <div class="player-stat relative text-slate-200 text-sm mx-auto top-28">
                        ${player.rating} &nbsp;${player.name}
                    </div>
                `;
                popupContainer.classList.add("hidden");
            });

            popupContent.appendChild(playerCard);
        });
    }

    // Close button for the popup
    const closeButton = document.createElement("button");
    closeButton.className = "bg-red-500 text-white px-3 py-1 rounded absolute top-2 right-2";
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        popupContainer.classList.add("hidden");
    });

    popupContent.appendChild(closeButton);
    popupContainer.appendChild(popupContent);
    popupContainer.classList.remove("hidden");
};

// Add click events to terrain and reserve buttons
const addPlayerSelectionEvents = () => {
    document.querySelectorAll("#toChange").forEach(button => {
        button.addEventListener("click", () => {
            const position = button.querySelector(".text-sm")?.innerText;
            if (position) {
                filterPlayersPopup(position, button);
            } else {
                console.error("Position not found for clicked button.");
            }
        });
    });
};

// Initialize player button events
addPlayerSelectionEvents();