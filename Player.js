export class Player {
  constructor(name, avatar, backgroundColor, shadowColor) {
    this.name = name;
    this.avatar = avatar;
    this.backgroundColor = backgroundColor;
    this.shadowColor = shadowColor;
  }
  getName = () => this.name;
  setName = (name) => (this.name = name);

  getAvatar = () => avatar;
  setAvatar = (avatar) => (this.avatar = avatar);

  getBackgroundColor = () => this.backgroundColor;
  setBackgroundColor = (newColor) => (this.backgroundColor = newColor);

  getShadowColor = () => this.shadowColor;
  setShadowColor = (newColor) => (this.shadowColor = newColor);
}
