export class Player {
  constructor(name, avatar, backgroundColor, shadowColor) {
    this.name = name;
    this.avatar = avatar;
    this.backgroundColor = backgroundColor;
    this.shadowColor = shadowColor;
  }
  getName = () => name;
  setName = (name) => (this.name = name);

  getAvatar = () => avatar;
  setAvatar = (avatar) => (this.avatar = avatar);

  getBackgroundColor = () => color;
  setBackgroundColor = (newColor) => (this.backgroundColor = newColor);

  getShadowColor = () => color;
  setShadowColor = (newColor) => (this.shadowColor = newColor);
}
