import {Game} from './model.js';

const storageKey = 'games';
const entityList = document.querySelector('[data-testid="entity-list"]');
const entityForm = document.querySelector('[data-testid="entity-form"]');
const initialGames = [
  new Game('Minecraft', ['PC', 'Xbox', 'PS5'], 2011),
  new Game('The Witcher 3', ['PC', 'PS5', 'Xbox'], 2015),
  new Game('Portal', ['PC'], 2007),
  new Game('Hades', ['PC', 'PS5'], 2020),
];

const games = loadGames();

function loadGames() {
  const savedGames = localStorage.getItem(storageKey);

  if (savedGames === null) {
    return initialGames;
  }

  try {
    return JSON.parse(savedGames).map(
      ({title, platforms, releaseYear}) =>
        new Game(title, platforms, releaseYear),
    );
  } catch {
    return initialGames;
  }
}

function saveGames() {
  localStorage.setItem(storageKey, JSON.stringify(games));
}

function waitForChange(action) {
  return new Promise((resolve) => {
    setTimeout(() => {
      action();
      saveGames();
      renderGames();
      resolve();
    }, 100);
  });
}

function createButton(text, className = '') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = text;
  return button;
}

function renderGames() {
  entityList.replaceChildren();

  games.forEach((game, index) => {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.dataset.testid = 'entity-card';
    card.dataset.index = String(index);

    const title = document.createElement('h2');
    title.textContent = game.title;

    const year = document.createElement('p');
    year.textContent = `Год выпуска: ${game.releaseYear}`;

    const platforms = document.createElement('ul');
    platforms.className = 'platform-list';

    if (game.platforms.length === 0) {
      const emptyMessage = document.createElement('li');
      emptyMessage.textContent = 'Платформы не указаны';
      platforms.append(emptyMessage);
    } else {
      game.platforms.forEach((platform) => {
        const platformItem = document.createElement('li');
        platformItem.textContent = platform;
        platforms.append(platformItem);
      });
    }

    const platformControls = document.createElement('div');
    platformControls.className = 'platform-controls';

    const platformInput = document.createElement('input');
    platformInput.type = 'text';
    platformInput.name = 'platform';
    platformInput.placeholder = 'PC, Xbox или PS5';
    platformControls.append(platformInput);

    const platformActions = document.createElement('div');
    platformActions.className = 'card-actions';

    const addPlatformButton = createButton('Добавить платформу');
    addPlatformButton.dataset.action = 'add-platform';
    const removePlatformButton = createButton(
      'Удалить платформу',
      'remove-button',
    );
    removePlatformButton.dataset.action = 'remove-platform';
    platformActions.append(addPlatformButton, removePlatformButton);
    platformControls.append(platformActions);

    const deleteButton = createButton('Удалить игру', 'remove-button');
    deleteButton.dataset.testid = 'delete-entity';

    card.append(title, year, platforms, platformControls, deleteButton);
    entityList.append(card);
  });
}

entityForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(entityForm);
  const title = formData.get('title').trim();
  const releaseYear = Number(formData.get('releaseYear'));

  if (!title || !Number.isInteger(releaseYear)) {
    return;
  }

  await waitForChange(() => {
    games.push(new Game(title, [], releaseYear));
  });
  entityForm.reset();
});

entityList.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  const card = event.target.closest('[data-testid="entity-card"]');

  if (!button || !card) {
    return;
  }

  const index = Number(card.dataset.index);
  const game = games[index];

  if (button.dataset.testid === 'delete-entity') {
    await waitForChange(() => {
      games.splice(index, 1);
    });
    return;
  }

  const platformInput = card.querySelector('[name="platform"]');
  const platform = platformInput.value.trim();

  if (!platform) {
    return;
  }

  if (button.dataset.action === 'add-platform') {
    await waitForChange(() => {
      game.addPlatform(platform);
    });
  }

  if (button.dataset.action === 'remove-platform') {
    await waitForChange(() => {
      game.removePlatform(platform);
    });
  }
});

window.addEventListener('beforeunload', saveGames);
saveGames();
renderGames();
