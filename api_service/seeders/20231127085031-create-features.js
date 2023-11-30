'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('features', [
      {id:"1",name:"Limited Edition"},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('features', null, {});
  }
};
