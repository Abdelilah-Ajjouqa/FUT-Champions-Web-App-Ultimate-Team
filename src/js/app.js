const api = `https://fut.codia-dev.com/players.json`;
let allPlayers = [];

const players = async () => {
    const response = await fetch(api);
    const data = await response.json();
    players = data;
    displayAllPlayers(players);
    playerToChanging(players);
}

// popupPlayers.addEventListener('click', (data, positionFilter = null) => {
//     // forEach(data.players)
//     const playerCart = document.createElement('section');
//     playerCart.className ='fixed w-full h-full top-0 left-0 justify-center items-center backdrop-blur-sm bg-black/40 p-16';
//     playerCart.id = 'playersChanging';
//     playerCart.innerHTML = `
//     <form class="grid md:grid-cols-3 lg:grid-cols-4 w-5/6 mx-auto bg-slate-700 rounded-md backdrop-blur-sm">
//     <ul class="bg-[url(../images/players_background.webp)] bg-no-repeat bg-center bg-contain w-40 h-40 text-white text-center pt-[10px] mx-auto hover:scale-110 hover:duration-300">
//                 <li class="bg-[url(${data.photo})] bg-center bg-no-repeat bg-contain w-40 h-[90px]"></li>
//                     <div class="leading-5">
//                         <p class="text-nowrap text-ellipsis overflow-hidden mx-auto w-16">${data.name}</p>
//                         <p>${data.rating} &nbsp; ${data.position}</p>
//                     </div>
//             </ul>
//     </form>
//     `;
// });
// console.log(popupPlayers);

function playerToChanging(players, positionFilter = null) {
    // forEach(players.players)
    const playerCart = document.createElement('section');
    playerCart.className ='fixed w-full h-full top-0 left-0 justify-center items-center backdrop-blur-sm bg-black/40 p-16';
    playerCart.id = 'playersChanging';
    
    playerCart.innerHTML = `
    <form class="grid md:grid-cols-3 lg:grid-cols-4 w-5/6 mx-auto bg-slate-700 rounded-md backdrop-blur-sm">
    <ul class="bg-[url(../images/players_background.webp)] bg-no-repeat bg-center bg-contain w-40 h-40 text-white text-center pt-[10px] mx-auto hover:scale-110 hover:duration-300">
                <li class="bg-[url(${players.photo})] bg-center bg-no-repeat bg-contain w-40 h-[90px]"></li>
                    <div class="leading-5">
                        <p class="text-nowrap text-ellipsis overflow-hidden mx-auto w-16">${players.name}</p>
                        <p>${players.rating} &nbsp; ${players.position}</p>
                    </div>
            </ul>
    </form>
    `;
    const father = document.getElementById("popup");
    father.appendChild(playerCart);
    
}

// const displayAllPlayers = (players) => {
//     const playerToChange = document.querySelectorAll("#playerToChanging");

//     playerToChange.forEach(player => {
//         player.addEventListener("click", () => {
//             document.querySelector("#playersChanging").classList.remove("hidden");
//         });
//     });
// }
// displayAllPlayers();
playerToChanging();