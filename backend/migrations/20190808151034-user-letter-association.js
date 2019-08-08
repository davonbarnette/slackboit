'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Letter', 'user_uuid', {
                    type: Sequelize.STRING,
                    references: {
                        model: 'User',
                        key: 'uuid'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }, {transaction: t})
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t)=> {
            return Promise.all([
                queryInterface.removeColumn('Letter', 'user_uuid')
            ])
        })
    }
};
