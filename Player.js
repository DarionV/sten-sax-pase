export class Player {
  constructor(name, avatar, backgroundColor, shadowColor) {
    this.name = name;
    this.avatar = avatar;
    this.backgroundColor = backgroundColor;
    this.shadowColor = shadowColor;
    this._score = 0;
    this._selection = 0;
  }
  getName = () => this.name;
  setName = (name) => (this.name = name);

  getAvatar = () => this.avatar;
  setAvatar = (avatar) => (this.avatar = avatar);

  getBackgroundColor = () => this.backgroundColor;
  setBackgroundColor = (newColor) => (this.backgroundColor = newColor);

  getShadowColor = () => this.shadowColor;
  setShadowColor = (newColor) => (this.shadowColor = newColor);

  get selection() {
    return this._selection;
  }

  set selection(newSelection) {
    this._selection = newSelection;
  }

  get score() {
    return this._score;
  }

  increaseScore = () => {
    this._score++;
  };

  resetScore = () => {
    this._score = 0;
  };
}
