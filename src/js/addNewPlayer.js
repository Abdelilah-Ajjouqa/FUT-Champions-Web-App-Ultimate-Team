fetch("/players.json")
    .then((response) => response.json())
    .then((data) => {
        playersData = data.players || [];
    })
    .catch((error) => {
        console.error("Error fetching players data:", error);
});

const selectFormation = document.querySelector('#formationSelect');
const terrain1 = document.querySelector('#terrain-4-4-2');
const terrain2 = document.querySelector('#terrain-4-3-3');
selectFormation.onchange = ()=> {
    if(selectFormation.value === '4-4-2'){
        terrain1.classList.remove('hidden');
        terrain2.classList.add('hidden');
    }else {
            terrain1.classList.add('hidden');
            terrain2.classList.remove('hidden');
    }
}