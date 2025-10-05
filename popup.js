/* eslint linebreak-style: ['error', 'windows'] */
/* GLOBALS */
const bet = document.getElementById('bet');
const per = document.getElementById('per');
const stopWin = document.getElementById('stopWin');
const deposit = document.getElementById('deposit');
const minBankBal = document.getElementById('minBankBal');

/**
 * @description load saved data
 */
function loadData() {
  chrome.storage.local.get(['bet', 'per', 'stopWin', 'deposit', 'minBankBal'],
      (val) => {
        bet.value = val.bet;
        per.value = val.per;
        stopWin.value = val.stopWin;
        deposit.value = val.deposit;
        minBankBal.value = val.minBankBal;
      });
}

/**
 * @description save data
 */
function saveData() {
  chrome.storage.local.set({
    bet: bet.value,
    per: per.value,
    stopWin: stopWin.value,
    deposit: deposit.value,
    minBankBal: minBankBal.value,
  });
}

// listen for openDice to be clicked
document.getElementById('openDice').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.update(tabs[0].id, {url: 'https://stake.us/casino/games/dice'});
  });
});

// update button
document.getElementById('update').addEventListener('click', () => {
  // save contents
  saveData();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'update',
      contents: {
        bet: bet.value,
        per: per.value,
        stopWin: stopWin.value,
        deposit: deposit.value,
        minBankBal: minBankBal.value,
      },
    });
  });
});

// default button
document.getElementById('default').addEventListener('click', () => {
  bet.value = GameParams.betCoefficent;
  per.value = GameParams.betVariable;
  stopWin.value = VaultDefaults.stopWin;
  deposit.value = VaultDefaults.depositAmount;
  minBankBal.value = GameParams.minBankBal;
  saveData();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'default',
      contents: {
        bet: bet.value,
        per: per.value,
        stopWin: stopWin.value,
        deposit: deposit.value,
        minBankBal: minBankBal.value,
      },
    });
  });
});

// play button
// update button
document.getElementById('play').addEventListener('click', () => {
  // save contents
  saveData();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'play',
      contents: {
        bet: bet.value,
        per: per.value,
        stopWin: stopWin.value,
        deposit: deposit.value,
        minBankBal: minBankBal.value,
      },
    });
  });
});

loadData();
