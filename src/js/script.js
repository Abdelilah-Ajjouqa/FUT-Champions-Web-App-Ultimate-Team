const api = `https://fut.codia-dev.com/players.json`

const players = async () => {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data)
}
players();