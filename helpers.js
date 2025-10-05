/* eslint linebreak-style: ['error', 'windows'] */
const helpers = {
  /**
 * @description yada
 * @param {*} path
 * @return {*}
 */
  getElementByXPath: function(path) {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
    ).singleNodeValue;
  },

  /**
   * @description Get all HTML elements from an object storing xPaths
   * of said elements
   * the word list is used liberaly here
   * @param {JSObject} list
   * @return {JSObject} HTMLElementObject
   */
  getAllElementsFromList: function(list) {
    const HTMLElementObject = {};
    for (const [key, xPath] of Object.entries(list)) {
      HTMLElementObject[key] = helpers.getElementByXPath(xPath);
    }
    return HTMLElementObject;
  },

  /**
   * @Description this should be used if an element is embedded in
   * a popup or dropdown menu
   * @param {*} xpath
   * @param {*} callback
   */
  waitForElement: function(xpath, callback) {
    const checkExist = setInterval(() => {
      const el = helpers.getElementByXPath(xpath);
      if (el) {
        clearInterval(checkExist);
        callback(el);
      }
    }, 200); // check every 200ms
  },

  /**
   * @description deposit default amount to vault
   * @param {int} depositAmount
   */
  depositToVault: function(depositAmount) {
    // click profile
    helpers.waitForElement(VaultXPaths.profile, (profile) => {
      profile.click();

      // click vault
      helpers.waitForElement(VaultXPaths.vault, (vault) => {
        vault.click();

        // enter amount
        helpers.waitForElement(VaultXPaths.amount, (amount) => {
          amount.value = depositAmount;
          amount.dispatchEvent(new InputEvent('input', {bubbles: true}));

          // click store to vault
          helpers.waitForElement(VaultXPaths.store, (store) => {
            store.click();

            // click done
            helpers.waitForElement(VaultXPaths.done, (done) => {
              done.click();
            });
          });
        });
      });
    });
  },

  addpopupEventListner: function(condition, callback) {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.action === condition) {
        callback(msg.contents);
      }
    });
  },


};
