# Stake Dice Auto Clicker Extension

## Overview

This Chrome extension automates playing Stake's dice game with
customizable betting logic.\
It provides a user-friendly popup UI that allows you to configure bet
settings, deposit amounts, stop-win limits, and minimum bank balance
conditions.

The extension interacts directly with the Stake dice page to set inputs,
start autoplay, and manage vault deposits automatically.

------------------------------------------------------------------------

## Features

-   🎲 **Open Dice Button** -- Opens the Stake dice game directly.\
-   ⚙️ **Update Button** -- Applies your current UI settings to the
    extension.\
-   ♻️ **Reset to Default** -- Restores all values to their safe
    defaults.\
-   📊 **Configurable Controls**:
    -   Bet amount -- how much you are betting per a specified dollar value\
    -   Per (multiplier/interval) -- the afermentioned specified dollar value. total bet amount = 'Bet amount' * 'Per'\
    -   Stop win limit -- when to stop the game and deposit a specific amount into the vault\
    -   Deposit amount -- how much you are depositing in the vault when your stop win is reached\
    -   Minimum bank balance before bets  -- any value below this will default the total bet amount to $.01, any value above this will allow you 'Bet amount' and 'Per' to calculate the total bet amount \
-   ▶️ **Play Button** -- Starts the game automation with your
    configured settings.

------------------------------------------------------------------------

## Installation

1.  Download or clone this repository to your computer.

    ``` bash
    git clone https://github.com/yourusername/stake-dice-extension.git
    ```

2.  Open **Chrome** and go to:

        chrome://extensions

3.  Enable **Developer Mode** (top right).\

4.  Click **Load unpacked** and select the project folder.\

5.  The extension should now appear in your toolbar.

------------------------------------------------------------------------

## Usage

1.  Click the extension icon in Chrome to open the popup UI.\
2.  Configure your betting parameters:
    -   Enter values for Bet, Per, Stop Win, Deposit Amount, and Min
        Bank Balance.\
    -   Use arrows or type directly.\
3.  Click **Update** to apply settings.\
4.  Click **Open Dice** to launch the Stake dice game.\
5.  Click **Play** to begin automated betting with your settings.\
6.  Use **Reset to Default** if you need to restore baseline settings.\
7. Open Chrome Dev Tools -> Console to view game statistics. Game statistics published every minute.

------------------------------------------------------------------------

## Strategy

1. Recommended to have at least $100 in the bank and to never bet above $.1 per $100 in the bank because you will lose money if you roll 4 losing dice in a row
2. If my bet is $.03 per $100 and I lose 2 times in a row, my 3rd bet will be $33.33. If i lose a 4th time then the bet will try to be $333.33 which is more money then I have so the game will stop. 
I will have lost $33.33. This is why its important to keep your bet below $.1 per $100. If i bet $.1 and lose 4 times. I will lose $111.11. The higher you're 'Bet amount' the more money you are risking, but you will also gain money quicker.
3. Statistically speaking, a quadruple event (losing 4 times in a row) should happen every 10,000 plays. So you should expect to lose money around then. However, Stake cheats (whaaaattt), so you will lose more than you statistically should and some days Stake is just down right angry and you will lose constantly.
4. If you want to lose less often you can change your bet to something like $.03 per $1000. This will require a penta-event to lose money (1 in 100,000 plays).
5. Played an infinite number of times, you will simply break even. You can try and stop the game at a peak and collect money that way, this is why we have the option for a 'StopWin' and 'Deposit amount'. But again Stake does not play fair.
6. Treat this more as a tool to increase your VIP level then a tool to make money.

------------------------------------------------------------------------

## Development

-   **Manifest v3** extension.\
-   Written in **JavaScript, HTML, and CSS**.\
-   Core files:
    -   `content.js` → Automation logic injected into Stake's page.\
    -   `helpers.js` → Utility functions (DOM lookup, retries, input
        simulation).\
    -   `resources.js` → XPaths and constants for game elements.\
    -   `popup.html / popup.css / popup.js` → Extension UI.

------------------------------------------------------------------------

## Notes

-   This is for **educational purposes only**.\
-   Use responsibly and at your own risk.\
-   Stake may update their site structure, which could require updating
    `resources.js` XPaths.\
- This **WILL NOT** make you money.

------------------------------------------------------------------------

## Future Improvements

-   Persistent storage of settings in `resources.json`.\
-   Better error handling when elements fail to load.\
-   More playful UI with softer styling and animations.
