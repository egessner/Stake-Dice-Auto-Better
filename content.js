/* eslint linebreak-style: ['error', 'windows'] */
/* MUTABLE GLOBALS - init as defaults*/
let bet = GameParams.betCoefficent;
let per = GameParams.betVariable;
let stopWin = VaultDefaults.stopWin;
let deposit = VaultDefaults.depositAmount;
let minBankBal = GameParams.minBankBal;
let monitorTag;

console.log('booting Stake dice clicker');

/**
 * @description calculate how much to bet given our strat
 * @return {*}
 */
function calcBet() {
  const bank = helpers.getElementByXPath(DiceXPaths.bank);
  const bankValue = parseFloat(bank.innerText.replaceAll(',', ''));
  if (bankValue >= minBankBal) {
    const m = Math.round(bankValue / per);
    return m * bet;
  } else {
    return .01;
  }
}

/**
 * @description set winnings game param
 */
function setWinnings() {
  // set winnings to 1.1 (the range is actually 10)
  helpers.waitForElement(DiceXPaths.winnings, (winnings) => {
    winnings.value = 1.1;
    winnings.dispatchEvent(new InputEvent('input', {bubbles: true}));
  });
}

/**
 * @description set amount bet
 */
function setBet() {
  helpers.waitForElement(DiceXPaths.principle, (principle) => {
    // calc bet
    const bet = calcBet();
    console.log(`setting bet to: ${bet}`);
    // set bet
    principle.value = bet;
    principle.dispatchEvent(new InputEvent('input', {bubbles: true}));
  });
}

/**
 * @description set increase by game param
 */
function setIncreaseBy() {
  // click increase by
  helpers.waitForElement(DiceXPaths.increaseBy, (increaseBy) => {
    increaseBy.click();
    // type 1000 in increase by
    helpers.waitForElement(DiceXPaths.lossMulti, (lossMulti) => {
      lossMulti.value = 1000;
      lossMulti.dispatchEvent(new InputEvent('input', {bubbles: true}));
    });
  });
}

/**
 * @description check if the bank has hit its "stop win"
 * @return {boolean}
 */
function checkBank() {
  const bank = helpers.getElementByXPath(DiceXPaths.bank);
  const bankValue = parseFloat(bank.innerText.replace(',', ''));
  if (bankValue > stopWin) {
    return true;
  }
  return false;
}

/**
 * @description return current day, hour, minute, sec
 * @return {String}
 */
function getTime() {
  const now = new Date();
  const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'];
  const curDay = daysArr[now.getDay()];
  const curHour = now.getHours();
  const curMinute = now.getMinutes() >= 10? now.getMinutes() :
   '0' + now.getMinutes();
  const curSec = now.getSeconds() >= 10? now.getSeconds() :
   '0' + now.getSeconds();
  return `Current time: ${curDay} ${curHour}:${curMinute}:${curSec}`;
}

/**
 * @description pause the game
 */
function pauseGame() {
  if (!isGamePaused()) {
    helpers.getElementByXPath(DiceXPaths.startButton).click();
  }
}

/**
 * @description resume the dice game
 */
function resumeGame() {
  if (isGamePaused()) {
    helpers.getElementByXPath(DiceXPaths.startButton).click();
  }
}

/**
 * @description check if game is paused
 * @return {boolean}
 */
function isGamePaused() {
  const curState = helpers.getElementByXPath(DiceXPaths.startButton).innerText;
  return curState !== 'Stop Autoplay';
}

/**
 * @description Monitor the game, updating bets, cashing out to the vault
 * and ensuring the game is always being played
 */
function monitor() {
  // grab what we need
  const bank = helpers.getElementByXPath(DiceXPaths.bank);
  const bankValue = parseFloat(bank.innerText.replace(',', ''));
  const principle = helpers.getElementByXPath(DiceXPaths.principle).value;

  console.log(`\n${getTime()}`);
  console.log(`Current Principle bet: ${principle}`);
  console.log(`Current Bank Value: ${bankValue}`);

  if (checkBank()) { // check if we need to deposit to vault
    pauseGame();
    helpers.depositToVault(deposit);
  }

  if (principle != calcBet()) { // check if bet needs to be reCalculated
    pauseGame();
    setWinnings();
    setBet();
    setIncreaseBy();
  }
  setTimeout(() => {
    resumeGame();
  }, 2000); // resume after 2 seconds
}

/**
 * @description init the stake game to our default strat
 */
function init() {
  setTimeout(() => {
    /* click 'Auto' */
    helpers.waitForElement(DiceXPaths.auto, (auto) => {
      auto.click();
    });

    /* click 'Advanced' */
    helpers.waitForElement(DiceXPaths.advanced, (advanced) => {
      advanced.click();
      advanced.dispatchEvent(new InputEvent('input', {bubbles: true}));
    });

    setWinnings();
    setBet();
    setIncreaseBy();

    /* click Settings cog wheel */
    helpers.waitForElement(DiceXPaths.settings, (settings) => {
      settings.click();
    });

    /* click 'Instant Play' */
    helpers.waitForElement(DiceXPaths.instaPlay, (instaPlay) => {
      instaPlay.click();
    });
  }, 5000); // give 5 sec for the web page to load
}
init();

/**
 * @description update params via popup params
 * @param {JSONObject} contents
 */
function updateParams(contents) {
  pauseGame();
  bet = contents.bet;
  per = contents.per;
  stopWin = contents.stopWin;
  deposit = contents.deposit;
  minBankBal = contents.minBankBal;
  setBet();
}
helpers.addpopupEventListner('update', updateParams);
helpers.addpopupEventListner('default', updateParams);

/**
 * @description start the game, eventually stop it too
 * @param {JSONObject} contents
 */
function play(contents) {
  if (isGamePaused()) {
    updateParams(contents);
    resumeGame();
    clearInterval(monitorTag);
    monitorTag = setInterval(monitor, GameParams.monitorFrequency);
  } else {
    pauseGame();
    clearInterval(monitorTag);
    monitorTag = null;
  }
}
helpers.addpopupEventListner('play', play);
