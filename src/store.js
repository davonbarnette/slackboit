/*
 * This file is meant for global variables so that the Messenger class can access fields outside of its own knowledge.
 * If you want to set something that future messages listen to, set it here and listen to it in your function. Take a
 * look at the omaeWaMouShindeiru function in messenger.js for an example.
 */

const Store = {
    disabledUntil: 0,
};

module.exports = Store;