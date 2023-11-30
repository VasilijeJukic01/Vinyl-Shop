'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('songs', [
      {id:"1",name:"Thriller",performer:"Michael Jackson",description:"/", price: 2399, category_id:1},
      {id:"2",name:"You Win Again",performer:"Bee Gees",description:"/", price: 2999, category_id:1},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('songs', null, {});
  }

};