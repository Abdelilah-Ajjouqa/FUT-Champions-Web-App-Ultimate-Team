fetch("/players.json")
    .then((response) => response.json())
    .then((data) => {
        playersData = data.players || [];
    })
    .catch((error) => {
        console.error("Error fetching players data:", error);
});

