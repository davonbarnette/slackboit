'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.createTable('EatMeDaddy', {
                    uuid: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        primaryKey: true,
                        defaultValue: Sequelize.UUIDV1
                    },
                    type: {
                        type: Sequelize.STRING
                    },
                    location: {
                        type: Sequelize.STRING
                    },
                    name: {
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
        return queryInterface.dropTable('EatMeDaddy');
    }
};