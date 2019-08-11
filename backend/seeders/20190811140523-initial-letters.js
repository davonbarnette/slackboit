'use strict';
const uuidv1 = require('uuid/v1');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Letter', [
            {
                uuid: uuidv1(),
                letter: 's',
                word: 'shaking',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                uuid: uuidv1(),
                letter: 'm',
                word: 'my',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                uuid: uuidv1(),
                letter: 'd',
                word: 'damn',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                uuid: uuidv1(),
                letter: 'h',
                word: 'head',
                created_at: new Date(),
                updated_at: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {

    }
};
