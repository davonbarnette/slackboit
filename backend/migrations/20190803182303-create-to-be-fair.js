'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.createTable('ToBeFair', {
                    uuid: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        primaryKey: true,
                        defaultValue: Sequelize.UUIDV1,
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
        return queryInterface.dropTable('ToBeFair');
    }
};