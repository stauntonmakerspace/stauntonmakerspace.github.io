let galleries = document.querySelectorAll(".c-gallery")

let shuffleTiles = (tileContainer) => {
    let tiles = Array.from(tileContainer.children)
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]]
    }
    tiles.forEach(tile => tileContainer.appendChild(tile))
}

let paginateCards = (showCards, paginateCardAmount, tiles, totalTiles, button) => {
    for (let x = showCards; x < (showCards + paginateCardAmount); x++)
        tiles[x]?.classList.remove("c-gallery__tiles__tile--hidden")   

    showCards += paginateCardAmount

    if (totalTiles <= showCards)
        button.style.display = "none"

    return showCards
}

galleries.forEach(gallery => {
    let tileContainer = gallery.querySelector('.c-gallery__tiles')
    shuffleTiles(tileContainer)
    let tiles = tileContainer.children;
    let totalTiles = tiles.length;
    let button = gallery.querySelector('.c-gallery__button')
    let paginateCardAmount = window.innerWidth >= 769 ? 6 : 3
    let showCards = paginateCards(0, paginateCardAmount, tiles, totalTiles, button)

    gallery.querySelector('.c-button').addEventListener("click", e => {
        showCards = paginateCards(showCards, paginateCardAmount, tiles, totalTiles, button)
    });
});