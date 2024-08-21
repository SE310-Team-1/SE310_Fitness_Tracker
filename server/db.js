import knexModule from 'knex';
import knexfile from './knexfile.cjs';

// Determine the environment and select the appropriate configuration
const environment = process.env.NODE_ENV === 'development' ? 'development' : 'test';

const config = knexfile[environment];
const knex = knexModule(config);


// Create a table in the database called "exercises"
knex.schema
  .hasTable('exercises')
  .then((exists) => {
    if (!exists) {
      // If no "exercises" table exists
      // create new, with "name", "muscle", "equipment",
      // and use "id" as a primary identification
      // and increment "id" with every new record (book)
      return knex.schema.createTable('exercises', (table) => {
        table.string('name').primary()
        table.string('muscle_group')
      })
        .then(() => {
          // Log success message
          console.log('Table \'exercises\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('created exercises table')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Create a table in the database called "workouts"
knex.schema
  .hasTable('workouts')
  .then((exists) => {
    if (!exists) {
      // If no "workouts" table exists
      // create new, with only "date" as a column and primary key. this is because we will be storing the exercises in a separate table
      return knex.schema.createTable('workouts', (table) => {
        table.date('date').primary()
      })
        .then(() => {
          // Log success message
          console.log('Table \'workouts\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('created workouts table')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Create a table in the database called "routines"
knex.schema
  .hasTable('routines')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('routines', (table) => {
        table.string('name').notNullable()
        table.date('date').notNullable()

        // Define composite primary key
        table.primary(['name', 'date'])
        table.foreign('date').references('workouts.date');
      })
        .then(() => {
          // Log success message
          console.log('Table \'routines\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  }).then(() => {
    // Log success message
    console.log('created routines table')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })


// Create a table in the database called "exercises_history"
knex.schema
  .hasTable('exercises_history')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('exercises_history', (table) => {
        table.string('name').notNullable();
        table.date('date').notNullable();
        table.integer('sets').notNullable();
        table.float('weight');
        table.integer('reps');
        table.integer('score');

        // Define composite primary key
        table.primary(['name', 'date', 'sets']);

        // Define foreign keys
        table.foreign('name').references('exercises.name');
        table.foreign('date').references('workouts.date');
      })
        .then(() => {
          // Log success message
          console.log('Table \'exercises_history\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('created exercises_history table')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

export default knex;