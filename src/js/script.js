const api = `https://fut.codia-dev.com/players.json`

const players = async () => {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data)
}
players();

// btn add new player
const btnAddPlayer = document.getElementById('addNewPlayer');
btnAddPlayer.addEventListener('click', () => {
    document.querySelector("#addForme").classList.remove('hidden');
})

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
        rating: parseInt(playerRating.value), //to return just numbers
    }
    playerCart.push(playerInfo);

    displayCart(playerInfo);

    document.getElementById("addForme").classList.add('hidden');
}) 

    // display player cart
function displayCart(playerInfo) {
    let background;
    let reservePlayersContainer = document.querySelector(".reserve-players .players");

    if (playerInfo.rating > 0 && playerInfo.rating <= 50) {
        background = "url(./src/images/badge_gold.webp)";
    } else if (playerInfo.rating >= 51 && playerInfo.rating <= 74) {
        background = "url(./src/images/badge_total_rush.webp)";
    } else if (playerInfo.rating >= 75 && playerInfo.rating <= 99) {
        background = "url(./src/images/players_background.webp)";
    }

    const cartPlayer = document.createElement('div');
    cartPlayer.className = "mt-5 player-infos py-10";
    cartPlayer.style.backgroundImage = background;
    cartPlayer.style.backgroundSize = "cover";
    cartPlayer.style.backgroundPosition = "center";
    cartPlayer.style.width = "100px";
    cartPlayer.style.height = "130px";
    cartPlayer.style.position = "relative";

    cartPlayer.innerHTML = `
        <p class="text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold">${playerInfo.rating}</p>
        <p class="text-xs absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center text-white">${playerInfo.name}</p>
        <p class="text-xs absolute top-2 left-1/2 transform -translate-x-1/2 text-center text-white">${playerInfo.position}</p>
    `;

    reservePlayersContainer.appendChild(cartPlayer);
}
