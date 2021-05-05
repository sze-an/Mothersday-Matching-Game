const gameContent = document.querySelector(".game-content");
let firstFlip = null;
let secondFlip = null;
let flipCount = 0;
const flips = document.querySelector(".flips");
const winModal = document.querySelector(".win-modal");

const allCards = Array.from(gameContent.querySelectorAll(".card"));

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		// eslint-disable-next-line no-param-reassign
		array[i] = array[j];
		// eslint-disable-next-line no-param-reassign
		array[j] = temp;
	}
	return array;
}

const shuffle = () => {
	shuffleArray(allCards);
	allCards.forEach((element) => {
		// shuffling the divs by putting them on the end of the grid randomly
		gameContent.appendChild(element);
	});
};

shuffle();

const resetGame = () => {
	flipCount = 0;
	flips.textContent = flipCount;
	allCards.forEach((el) => {
		el.classList.remove("flipped");
	});
	winModal.style.display = "none";
	setTimeout(() => {
		shuffle();
	}, 500);
};

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", resetGame);

const gameOver = () => {
	console.log("You Won!");
	winModal.style.display = "flex";
};

gameContent.addEventListener("click", (e) => {
	const selectedCard = e.target;
	// console.log(selectedCard);

	const selectedCardIsFlipped = selectedCard.classList.contains("flipped");

	if ((firstFlip && secondFlip) || selectedCardIsFlipped) {
		// checking if the first and second card are already flipped
		// OR we clicked on an already flipped card
		return;
	}

	flipCount += 1;
	flips.textContent = flipCount;

	// we've clicked on a card
	selectedCard.classList.add("flipped");
	if (firstFlip === null) {
		firstFlip = selectedCard;
	} else {
		// this is the second click
		secondFlip = selectedCard;
		const firstFlipImg = firstFlip.querySelector(".card-front");
		const secondFlipImg = secondFlip.querySelector(".card-front");
		if (firstFlipImg.src === secondFlipImg.src) {
			// console.log("it matches!!!!");
			if (gameContent.querySelectorAll(".card.flipped").length === 16) {
				gameOver();
			}
			firstFlip = null;
			secondFlip = null;
		} else {
			// when cards not matching
			setTimeout(() => {
				firstFlip.classList.remove("flipped");
				secondFlip.classList.remove("flipped");
				// reset firstFlip card.
				firstFlip = null;
				secondFlip = null;
			}, 1500);
		}
	}
});
