/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

export function seed(knex) {
  return knex('exercises').del()
    .then(function () {
      return knex('exercises').insert([
        { name: 'Thingimajigs', muscle_group: 'Biceps' },
        { name: 'Pullies', muscle_group: 'Triceps' },
        { name: 'Pushies', muscle_group: 'Quadriceps' }
      ]);
    });
};

