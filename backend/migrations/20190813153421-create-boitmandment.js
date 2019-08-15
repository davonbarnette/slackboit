'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.createTable('Boitmandment', {
                    numeral: {
                        allowNull: false,
                        primaryKey: true,
                        type: Sequelize.STRING
                    },
                    title: {
                        type: Sequelize.STRING
                    },
                    description: {
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
        return queryInterface.dropTable('Boitmandment');
    }
};