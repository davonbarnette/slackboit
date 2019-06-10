/*
 * This file is meant for changeable global variables so that any one method can access fields outside of its own
 * knowledge. If you want to set something that future messages listen to, set it here and listen to it in your
 * function. Take a look at the omaeWaMouShindeiru method in /functions/yeetus.js for an example.
 */

const Store = {
    disabledUntil: 0,
    usersById:null,
    resetCryptoTime: 0,
    listingsById:{},
    bot:null,
};

module.exports = Store;