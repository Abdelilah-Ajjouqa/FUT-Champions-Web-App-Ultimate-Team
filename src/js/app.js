const api = "";
let playersData = [];
let chosingPlayers = [];
let popupPlayers = document.getElementById("popupPlayers");

fetch("/players.json")
    .then(response => response.json())
    .then(data => {
        playersData = data.players || [];
    })
    .catch(error => {
        console.error("Error fetching players data:", error);
    });

// popup players
const appendPlayer = (button, playerSelected) => {
    const position = button.getAttribute("data-position");
    const filteredPlayers = playersData.filter(player => player.position === position);

    popupPlayers.innerHTML = ""; 

    console.log(filteredPlayers);
    popupPlayers.classList.remove("hidden");

    // Add Cancel button
    const cancelButtonContainer = document.createElement("div");
    cancelButtonContainer.className = "flex items-center justify-end";
    cancelButtonContainer.innerHTML = `<button onclick="closePopupPlayers()"><i class="fa-regular fa-circle-xmark"></i></button>`;
    popupPlayers.appendChild(cancelButtonContainer);

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
        popupPlayers.appendChild(playerCard);
    });
};


const closePopupPlayers = () => {
    popupPlayers.classList.add("hidden");
}

// Add click events to terrain
const addPlayerSelectionEvents = () => {
    document.querySelectorAll("#toChange").forEach(button => {
        button.addEventListener("click", () => {
                appendPlayer(button);
        });
    });
};

addPlayerSelectionEvents();