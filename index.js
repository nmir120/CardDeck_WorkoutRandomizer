let Deck = require('card-deck');

//https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let pushExercises = [];
let pushCounter = 0;
pushExercises.push("push-ups (or incline push-ups)");
pushExercises.push("pike push-ups (or handstand push-ups)");
pushExercises.push("standing milk jug/dumbell press");
pushExercises.push("milk jug/dumbell lateral raises (or band lateral raises)");

let pullExercises = [];
let pullCounter = 0;
pullExercises.push("doorway pull-ups (or tree branch pull-ups, banded pulldowns)");
pullExercises.push("table/desk inverted rows (or bent-over dumbell rows)");
pullExercises.push("rear delt flyes (with milk jugs or dumbells)");
pullExercises.push("backpack upright row (or anything else with weight)");

let legExercises = [];
let legCounter = 0;
legExercises.push("walking lunges (with a backpack/dumbell for weight if needed)");
legExercises.push("split squats");
legExercises.push("single-leg hip-thrusts");
legExercises.push("Nordic ham-curl (or lying leg curls)");

let isoExercises = [];
let isoCounter = 0;
isoExercises.push("milk jug or dumbell bicep curls");
isoExercises.push("bodyweight skullcrushers against a table-top (or close-grip pushups)");
isoExercises.push("bicycle crunches (or reverse crunches)");
isoExercises.push("standing calf raises (use backpack or other weight to load)");

function getNewDeck() {
	let deck = [];

	for(let i = 0; i < suits.length; i++) {
		for(var j = 0; j < values.length; j++) {
			let card = {value: values[j], suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}

//let myDeck = new Deck([card1]);

//myDeck.cards([card1, card2]);
//myDeck.shuffle();
//myDeck.addToTop();
let workouts = [];
let currentCard;

function randomizeWorkout(numCards) {
    let cards = getNewDeck(); //returns an array of card objects
    let myDeck = new Deck(cards);
    myDeck.shuffle();

    for(let i = 0; i < numCards; i++) {
        currentCard = myDeck.draw();
        addWorkout(currentCard);
    }
    
    console.log("Cards remaining: " + myDeck.remaining());
}

function getRepCount(value) {
    if(value == 'J' || value == 'Q' || value == 'K') {
        return "20 ";
    } else if (value != 'A'){
        value = Number(value);
        return (value + 10) + " ";
    } else {
        return "0 ";
    }

}

function addWorkout(card) {
    let exercise;
    exercise = getRepCount(card.value);

    if(card.value == 'A') {
        exercise = "Rest 2 mins (you can save this for later if you don't need it now)";
    } else if(card.suit == 'hearts') { //leg exercises
        if(legCounter == 4) {
            legCounter = 0;
        }
        exercise += legExercises[legCounter];
        legCounter++;
        //test
        exercise += " [LEGS]";
       
    } else if(card.suit == 'clubs') { //pull exercises
        exercise += pullExercises[pullCounter];
        pullCounter++;
        if(pullCounter == 4) {
            pullCounter = 0;
        }
        //test
        exercise += " [PULL]";

    } else if(card.suit == 'spades') { //push exercises
        exercise += pushExercises[pushCounter];
        pushCounter++;
        if(pushCounter == 4) {
            pushCounter = 0;
        }
        //test
        exercise += " [PUSH]";

    } else { //iso exercises
        exercise += isoExercises[isoCounter];
        isoCounter++;

        if(isoCounter == 4) {
            isoCounter = 0;
        }
        //test
        exercise += " [ISO]";
    }

    //console.log(exercise);
    workouts.push(exercise);
}


randomizeWorkout(20);

console.log("Here is a list of today's exercises: ");
let currentExercise;
for(let i = 0; i < workouts.length; i++) {
    if((i+1) < 10) {
        currentExercise = "0" + (i+1) +  ": " + workouts[i];;
    }
    else {
        currentExercise = (i+1) +  ": " + workouts[i];
    }
    console.log(currentExercise);
}
