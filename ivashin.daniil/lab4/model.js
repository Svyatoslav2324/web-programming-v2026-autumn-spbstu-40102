export class Game {
  constructor(title, platforms, releaseYear) {
    this.title = title;
    this.platforms = [...platforms];
    this.releaseYear = releaseYear;
  }

  addPlatform(platform) {
    if (!this.platforms.includes(platform)) {
      this.platforms.push(platform);
    }
  }

  removePlatform(platform) {
    this.platforms = this.platforms.filter(
      (currentPlatform) => currentPlatform !== platform,
    );
  }

  get platformCount() {
    return this.platforms.length;
  }
}

export function groupGamesByReleaseYear(games) {
  return games.reduce((groups, game) => {
    const year = game.releaseYear;
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year).push(game);
    return groups;
  }, new Map());
}

export function getUniquePlatforms(games) {
  return [...new Set(games.flatMap((game) => game.platforms))];
}

export function findGamesByPlatform(games, platform) {
  return games.filter((game) => game.platforms.includes(platform));
}

export function groupGamesByPlatformCount(games) {
  return games.reduce((groups, game) => {
    const count = game.platformCount;
    if (!groups.has(count)) {
      groups.set(count, []);
    }
    groups.get(count).push(game);
    return groups;
  }, new Map());
}

export function findGamesReleasedAfter(games, year) {
  return games.filter((game) => game.releaseYear > year);
}
