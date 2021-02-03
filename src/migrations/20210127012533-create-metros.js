'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Metros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idLinea: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lineas',
          key: 'id'
        }
      },
      vagones: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      },
      capacidad: {
        type: Sequelize.INTEGER
      },
      modelo: {
        type: Sequelize.STRING
      },
      asientos: {
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Metros');
  }
};