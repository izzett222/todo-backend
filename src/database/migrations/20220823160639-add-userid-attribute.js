'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Lists",
      "UserId",
      {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    ) 
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Lists', 'UserId')
  }
};