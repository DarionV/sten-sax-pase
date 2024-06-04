class Player {
  constructor(name, avatar, color) {
    this.name = name;
    this.avatar = avatar;
    this.color = color;
  }
  getName = () => name;
  setName = (name) => (this.name = name);

  getAvatar = () => avatar;
  setAvatar = (avatar) => (this.avatar = avatar);

  getColor = () => color;
}

const menuRenderer = (function () {
  const playerAvatarContainer = document.querySelector(
    ".js-player-avatar-container"
  );
  const playerAvatar = document.querySelector(".js-player-avatar");
  const computerAvatarContainer = document.querySelector(
    ".js-computer-avatar-container"
  );

  function renderPlayerAvatar(avatar, color) {
    renderAvatar(playerAvatarContainer, playerAvatar, avatar, color);
  }

  function renderComputerAvatar(avatar, color) {
    renderAvatar(computerAvatarContainer, avatar, color);
  }

  function renderAvatar(container, img, avatar, color) {
    img.src = avatar;
    container.style.backgroundColor = color;
  }

  function updatePlayerAvatarColors(backgroundColor, shadowColor) {
    updateAvatarColors(playerAvatarContainer, backgroundColor, shadowColor);
  }

  function updateComputerAvatarColors() {
    updateAvatarColors(computerAvatarContainer, backgroundColor, shadowColor);
  }

  function updateAvatarColors(container, backgroundColor, shadowColor) {
    container.style.backgroundColor = backgroundColor;
    container.style.boxShadow = "0px 10px 0px" + shadowColor;
  }

  const getPlayerAvatar = () => playerAvatar.getAttribute("src");

  return {
    renderPlayerAvatar,
    renderComputerAvatar,
    getPlayerAvatar,
    updatePlayerAvatarColors,
    updateComputerAvatarColors,
  };
})();

const menuController = (function () {
  const playButton = document.querySelector("js-play-button");

  const playerAvatarPrevButton = document.querySelector(
    ".js-player-avatar-prev-button"
  );
  const playerAvatarNextButton = document.querySelector(
    ".js-player-avatar-next-button"
  );
  const computerAvatarNextButton = document.querySelector(
    ".js-computer-avatar-next-button"
  );
  const computerAvatarPrevButton = document.querySelector(
    ".js-computer-avatar-prev-button"
  );

  //   const playerAvatars = [
  //     "images/avatars/bee.png",
  //     "images/avatars/bird.png",
  //     "images/avatars/chicken.png",
  //     "images/avatars/cow.png",
  //     "images/avatars/fish.png",
  //     "images/avatars/pig.png",
  //     "images/avatars/cat.png",
  //     "images/avatars/dog.png",
  //     "images/avatars/koala.png",
  //     "images/avatars/penguin.png",
  //     "images/avatars/monkey.png",
  //   ];

  const playerAvatars = [
    {
      avatar: "images/avatars/bee.png",
      backgroundColor: "#D95B97",
      shadowColor: "#A14F7B",
    },
    {
      avatar: "images/avatars/bird.png",
      backgroundColor: "#64D4F8",
      shadowColor: "#548EB8",
    },
    {
      avatar: "images/avatars/cat.png",
      backgroundColor: "#C8A6D9",
      shadowColor: "#9679A5",
    },
    {
      avatar: "images/avatars/chicken.png",
      backgroundColor: "#D6C56B",
      shadowColor: "#8D8052",
    },
    {
      avatar: "images/avatars/cow.png",
      backgroundColor: "#A1AE86",
      shadowColor: "#6F7A67",
    },
    {
      avatar: "images/avatars/dog.png",
      backgroundColor: "#EC9898",
      shadowColor: "#BC7B7B",
    },
    {
      avatar: "images/avatars/fish.png",
      backgroundColor: "#2CA0E1",
      shadowColor: "#3F598C",
    },
    {
      avatar: "images/avatars/koala.png",
      backgroundColor: "#E5AC68",
      shadowColor: "#916B48",
    },
    {
      avatar: "images/avatars/monkey.png",
      backgroundColor: "#80A17D",
      shadowColor: "#425A37",
    },
    {
      avatar: "images/avatars/penguin.png",
      backgroundColor: "#E4E4E4",
      shadowColor: "#828282",
    },
    {
      avatar: "images/avatars/pig.png",
      backgroundColor: "#AE977C",
      shadowColor: "#644F40",
    },
  ];

  menuRenderer.renderPlayerAvatar("images/avatars/chicken.png");

  const player = new Player("Spelare", menuRenderer.getPlayerAvatar(), "red");

  playerAvatarNextButton.addEventListener("click", () => {
    const nextAvatar = getNextPlayerAvatar();
    menuRenderer.renderPlayerAvatar(nextAvatar.avatar);
    menuRenderer.updatePlayerAvatarColors(
      nextAvatar.backgroundColor,
      nextAvatar.shadowColor
    );
    player.setAvatar(nextAvatar.avatar);
  });

  playerAvatarPrevButton.addEventListener("click", () => {
    const prevAvatar = getPrevPlayerAvatar();
    menuRenderer.renderPlayerAvatar(prevAvatar.avatar);
    menuRenderer.updatePlayerAvatarColors(
      prevAvatar.backgroundColor,
      prevAvatar.shadowColor
    );
    player.setAvatar(prevAvatar.avatar);
  });

  function getNextPlayerAvatar() {
    if (getCurrentImageIndex() === playerAvatars.length - 1)
      return playerAvatars[0];
    else return playerAvatars[getCurrentImageIndex() + 1];
  }
  function getPrevPlayerAvatar() {
    if (getCurrentImageIndex() !== 0)
      return playerAvatars[getCurrentImageIndex() - 1];
    else return playerAvatars[playerAvatars.length - 1];
  }

  function getCurrentImageIndex() {
    for (const avatar of playerAvatars) {
      if (avatar.avatar === menuRenderer.getPlayerAvatar()) {
        return playerAvatars.indexOf(avatar);
      }
    }
  }

  function getPrevComputerAvatar() {}
  function getNextComputerAvatar() {}

  function getNextAvatar() {}
  function getPrevAvatar() {}
})();

// function createPlayer(name, avatar, color) {
//   const getName = () => name;
//   const setName = (name) => (this.name = name);

//   const getAvatar = () => avatar;
//   const setAvatar = (avatar) => (this.avatar = avatar);

//   const getColor = () => color;

//   return { getName, setName, getAvatar, setAvatar, getColor };
// }

const menuLoop = (function () {})();
