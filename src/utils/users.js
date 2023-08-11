export const calcRemaingCredits = (budget, players, userId) => {
  let newBudget = budget;
  players.forEach((player) => {
    if (player.owned === userId) {
      newBudget = newBudget - parseInt(player.owned_amount);
    }
  });
  return newBudget;
};

export const calcSpentCredits = (players, userId) => {
  let credits = 0;
  players.forEach((player) => {
    if (player.owned === userId) {
      credits = credits + parseInt(player.owned_amount);
    }
  });
  return credits;
};

export const calcPurchasedPlayersAmount = (players, userId) => {
  let amount = 0;
  players.forEach((player) => {
    if (player.owned === userId) {
      amount += 1;
    }
  });
  return amount;
};

export const calcMaxOffer = (settings, players, userId) => {
  const purchasedPlayers = calcPurchasedPlayersAmount(players, userId);
  const playersLeft =
    parseInt(settings.min_players) - parseInt(purchasedPlayers);
  return (
    parseInt(calcRemaingCredits(settings?.budget, players, userId)) -
    playersLeft -1
  );
};

export const getChipLeader = (budget, players, users) => {
  return users.reduce((max, user) =>
    calcRemaingCredits(budget, players, max.id) >
    calcRemaingCredits(budget, players, user.id)
      ? max
      : user
  );
};
