'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Boitmandment', 'parent_clause', {
                    type: Sequelize.STRING,
                    references: {
                        model: 'Boitmandment',
                        key: 'numeral'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }, {transaction: t}),
                queryInterface.addColumn('Boitmandment', 'user_uuid', {
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
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Boitmandment', 'parent_clause', {transaction: t}),
                queryInterface.removeColumn('Boitmandment', 'user_uuid', {transaction: t})
            ])
        })
    }
};
