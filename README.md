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
8. Recomended to have at least $100 in the bank and to never bet above $.1 per $100 in the bank because you will lose money if you roll 3 losing dice in a row

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
