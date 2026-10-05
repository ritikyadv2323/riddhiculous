// Shared State Manager for the Date Experience
const dateState = {
  seat: null,
  seatLabel: '',
  firstAction: null,
  selectedFoods: [],
  selectedDrinks: [],
  triedFirst: null,
  boyGuess: null,

  setSeat(type) {
    this.seat = type;
    if (type === 'window') this.seatLabel = 'window seat';
    else if (type === 'corner') this.seatLabel = 'corner seat';
    else this.seatLabel = 'wherever you want';
  },

  setFirstAction(action) {
    this.firstAction = action;
  },

  toggleFood(item) {
    const idx = this.selectedFoods.indexOf(item);
    if (idx > -1) {
      this.selectedFoods.splice(idx, 1);
    } else {
      this.selectedFoods.push(item);
    }
  },

  toggleDrink(item) {
    const idx = this.selectedDrinks.indexOf(item);
    if (idx > -1) {
      this.selectedDrinks.splice(idx, 1);
    } else {
      this.selectedDrinks.push(item);
    }
  },

  getAllItems() {
    return [...this.selectedDrinks, ...this.selectedFoods];
  }
};

window.dateState = dateState;
