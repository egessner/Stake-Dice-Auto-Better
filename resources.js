/* eslint linebreak-style: ['error', 'windows'], max-len: ['error', {'code': 200}]*/
// I really wish these things had id's so we didnt have to rely on xPaths
const DiceXPaths = {
  auto: '//*[@id="main-content"]/div[1]/div/div/div/div/div[1]/div[1]/div[1]/div/div/div/div/button[2]',
  advanced: '//*[@id="main-content"]/div[1]/div/div/div/div/div[1]/div[1]/div[2]/div/div/div/label/span',
  winnings: '//*[@id="main-content"]/div[1]/div/div/div/div/div[1]/div[2]/div/div/div[3]/label[1]/div/div/input',
  principle: '//*[@id="main-content"]/div[1]/div/div/div/div/div[1]/div[1]/div[2]/label[1]/div/div[1]/input',
  bank: '//*[@id="navigation-container-header"]/div[2]/div/div/div/div/button/div/div/span[1]/span',
  increaseBy: '//*[@id="main-content"]/div[1]/div/div/div/div/div[1]/div[1]/div[2]/div/div[2]/div[2]/div/div/button[2]',
  lossMulti: '//*[@id="main-content"]/div[1]/div/div/div/div/div[1]/div[1]/div[2]/div/div[2]/div[2]/div/label/div/div/input',
  settings: '//*[@id="main-content"]/div[1]/div/div/div/div/div[2]/div[1]/div[1]/div/button',
  instaPlay: '/html/body/div[6]/div/div/div[2]/div/button[1]',
  startButton: '//*[@id="main-content"]/div[1]/div/div/div/div/div[1]/div[1]/div[3]/button',
};

const VaultXPaths = {
  profile: '//*[@id="navigation-container-header"]/section/div/div/button',
  vault: '/html/body/div[6]/div/div/div[2]/div/button[2]',
  amount: '//*[@id="svelte"]/div[1]/div[2]/div[2]/div/div[1]/div/form/label/div/div[1]/input',
  store: '//*[@id="svelte"]/div[1]/div[2]/div[2]/div/div[1]/div/form/div/button',
  done: '//*[@id="svelte"]/div[1]/div[2]/div[2]/div/div[1]/div/div[2]/div[3]/button[1]',
};

const VaultDefaults = {
  depositAmount: 200,
  stopWin: 300,
};

const GameParams = {
  monitorFrequency: 60000, // every minute
  betCoefficent: .03,
  betVariable: 100, // in this case, .03 cents will be bet per $100 in the bank
  minBankBal: 100, // if we get below this, bet is .01
};
