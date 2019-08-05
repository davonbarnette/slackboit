'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.createTable('User', {
                    uuid: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        primaryKey: true,
                    },
                    display_name: {
                        type: Sequelize.STRING
                    },
                    first_name: {
                        type: Sequelize.STRING
                    },
                    last_name: {
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
        return queryInterface.dropTable('User');
    }
};