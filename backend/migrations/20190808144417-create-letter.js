'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.createTable('Letter', {
                    uuid: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        primaryKey: true,
                        defaultValue: Sequelize.UUIDV1
                    },
                    letter: {
                        type: Sequelize.STRING
                    },
                    word: {
                        type: Sequelize.STRING
                    },
                    created_at: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updated_at: {
                        allowNull: false,
                        type: Sequelize.DATE
                    }
                }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Letter');
    }
};
