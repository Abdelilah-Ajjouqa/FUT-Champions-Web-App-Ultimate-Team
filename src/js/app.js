let playersData = [];
let chosingPlayers = [];
let popupPlayers = document.getElementById("popupPlayers");

fetch("/players.json")
    .then((response) => response.json())
    .then((data) => {
        playersData = data.players || [];
    })
    .catch((error) => {
        console.error("Error fetching players data:", error);
    })

// Add click events to terrain
const addPlayerSelectionEvents = () => {
    document.querySelectorAll("#toChange").forEach((button) => {
        button.addEventListener("click", () => {
            appendPlayer(button);
        });
    });
}

// popup players
const appendPlayer = (button) => {
    const position = button.getAttribute("data-position");
    const filteredPlayers = playersData.filter(
        (player) => player.position === position
    );
    popupPlayers.innerHTML = "";

    // console.log(filteredPlayers);
    popupPlayers.classList.remove("hidden");

    // Add Cancel button
    const cancelButtonContainer = document.createElement("div");
    cancelButtonContainer.className = "flex items-center justify-end";
    cancelButtonContainer.innerHTML = `<button onclick="closePopupPlayers()"><i class="fa-regular fa-circle-xmark"></i></button>`;
    popupPlayers.appendChild(cancelButtonContainer);

    filteredPlayers.forEach((player) => {
        const playerCard = document.createElement("div");
        playerCard.data = player.name;
        playerCard.dataset.playerName = playerCard.data;
        playerCard.id = "toChange";
        playerCard.className =
            "flex items-center p-3 border-b rounded-md border-gray-300 cursor-pointer hover:bg-slate-600 hover:bg-opacity-80";

        playerCard.addEventListener("click", () => {
            playerSelected(player, button);
        });

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
}

// closing popup
const closePopupPlayers = () => {
    popupPlayers.classList.add("hidden");
}

// changement de joueurs
function playerSelected(selectedPlayer, targetButton) {
    let newInfo;
    const newCard = document.createElement("div");

    newCard.addEventListener("click", () => {
        appendPlayer(newCard);
    });

    newCard.id = targetButton.id;
    newCard.dataset.position = targetButton.getAttribute("data-position");
    newCard.className =
        "cursor-pointer hover:scale-110 hover:duration-300 bg-[url(./src/images/players_background.webp)] bg-contain bg-center bg-no-repeat flex flex-col items-center text-white text-center text-xs rounded-lg h-40 w-40";
    newCard.innerHTML = `
    <div class="mt-[15px] w-[100px] h-[90px] bg-cover bg-center bg-no-repeat bg-[url(${selectedPlayer.photo})] flex flex-col justify-end items-center text-[white] [text-shadow:1px_1px_2px_black]">
        </div>
        <div class="leading-[15px]">
            <div class="text-ellipsis w-16 text-nowrap overflow-hidden">${selectedPlayer.name}</div>
            <div class="text-xs text-center text-white">${selectedPlayer.position} &nbsp;&nbsp; ${selectedPlayer.rating}</div>
        </div>
    `;

    // detect the repeat
    // let alreadyChoosen = false;
    // chosingPlayers.forEach(player => {
    //     if(player.name == selectedPlayer.name && player.rating == selectedPlayer.rating){
    //         alreadyChoosen = true;
    //         return;
    //     }
    // })
    // if(alreadyChoosen){
    //     return;
    // }

    // detect the repeat-2
    let alreadyChoosen = false;
    chosingPlayers.forEach(player => {
        if (player.name == selectedPlayer.name && player.rating == selectedPlayer.rating) {
            alert("this player already in the terrain");
            alreadyChoosen = true;
            return;
        }
    });
    if (alreadyChoosen) {
        return
    }
    targetButton.replaceWith(newCard);
    popupPlayers.classList.add("hidden");

    newInfo = {
        photo: selectedPlayer.photo,
        name: selectedPlayer.name,
        position: selectedPlayer.position,
        rating: selectedPlayer.rating
    };
    chosingPlayers.push(newInfo);



}

const addPlayerForm = document.querySelector("#addPlayerForm");
const newPlayerName = document.getElementById("newPlayerName");
const newPlayerPosition = document.getElementById("newPlayerPosition");
const newPlayerRating = document.getElementById("newPlayerRating");
const plusBtn = document.querySelector("#addForme");

// add New Player
function addNewPlayer() {
    const plusBtn = document.querySelector("#addForme");
    plusBtn.classList.remove("hidden");
}

// save infos from theforme
addPlayerForm.addEventListener("click", (e) => {
    e.preventDefault();

    if (newPlayerRating.value < 50 || newPlayerRating.value > 99) {
        alert("please enter an numeber between 50 and 99");
    } else {
        let infosObject = {
            photo:'../src/images/player.png',
            name: newPlayerName.value,
            position: newPlayerPosition.value,
            rating: newPlayerRating.value
        }
        playersData.push(infosObject);

        console.log(infosObject);
        plusBtn.classList.add("hidden");
    }
});
addPlayerSelectionEvents();