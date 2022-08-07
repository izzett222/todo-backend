'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Tasks",
      "ListId",
      {
        type: Sequelize.UUID,
        references: {
          model: 'Lists',
          key: 'id'
        }
      }
    ) 
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Tasks', 'ListId')
  }
};
