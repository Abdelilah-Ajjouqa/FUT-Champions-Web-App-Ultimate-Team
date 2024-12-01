const api = `https://fut.codia-dev.com/players.json`;
let allPlayers = [];

const players = async () => {
    const response = await fetch(api);
    const data = await response.json();
    allPlayers = data;
    displayAllPlayers(allPlayers);
}

function displayAllPlayers(players) {
    const reservePlayersContainer = document.querySelector(".reserve-players .players");
    players.forEach(player => {
        const cartPlayer = createPlayerCard(player);
        reservePlayersContainer.appendChild(cartPlayer);
    });
}

function createPlayerCard(playerInfo) {
    const cartPlayer = document.createElement('div');
    cartPlayer.className = "player-card player-before-re";
    cartPlayer.innerHTML = `
        <div class="mx-auto text-sm">${playerInfo.position}</div>
    `;
    cartPlayer.addEventListener('click', () => showPlayerPopup(playerInfo));
    return cartPlayer;
}

function showPlayerPopup(playerInfo) {
    const popup = document.createElement('div');
    popup.className = 'player-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>${playerInfo.name}</h2>
            <p>Position: ${playerInfo.position}</p>
            <p>Rating: ${playerInfo.rating}</p>
            ${playerInfo.club ? `<p>Club: ${playerInfo.club}</p>` : ''}
            ${playerInfo.nationality ? `<p>Nationality: ${playerInfo.nationality}</p>` : ''}
            <button id="closePopup">Close</button>
        </div>
    `;
    document.body.appendChild(popup);

    const closeButton = popup.querySelector('#closePopup');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

players();

// btn add new player
const btnAddPlayer = document.getElementById('addNewPlayer');
btnAddPlayer.addEventListener('click', () => {
    document.querySelector("#addForme").classList.remove('hidden');
});

const returnAddPlayer = document.getElementById('removeFormeAddNewPlayer');
returnAddPlayer.addEventListener('click', () => {
    document.querySelector("#addForme").classList.add('hidden');
});

// save info from form "add new player"
const formAddNewPlayer = document.querySelector("#addPlayerForm");
const playerName = document.querySelector("#playerName");
const playerPosition = document.querySelector("#playerPosition");
const playerRating = document.querySelector("#playerRating");

let playerCart = [];

formAddNewPlayer.addEventListener('submit', (e) => {
    e.preventDefault();

    let playerInfo = {
        id: Date.now(),
        name: playerName.value,
        position: playerPosition.value,
        rating: parseInt(playerRating.value),
    }
    playerCart.push(playerInfo);

    displayCart(playerInfo);

    document.getElementById("addForme").classList.add('hidden');

    // Clear form
    playerName.value = '';
    playerPosition.value = '';
    playerRating.value = '';
});


// display player cart
function displayCart(playerInfo) {
    const reservePlayersContainer = document.querySelector(".reserve-players .players");
    if (playerInfo.rating) {
        const cartPlayer = createPlayerCard(playerInfo);
        reservePlayersContainer.appendChild(cartPlayer);
    }
}
