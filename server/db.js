import knexModule from 'knex';
import knexfile from './knexfile.cjs';

// Determine the environment and select the appropriate configuration
const environment = process.env.NODE_ENV === 'development' ? 'development' : 'test';

const config = knexfile[environment];
const knex = knexModule(config);

// Create a table in the database called "user"
knex.schema
  .hasTable('users')
  .then((exists) => {
    if (!exists) {
      // Create new "users" table with "username" and "password"
      return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); 
        table.string('username').notNullable().unique(); 
        table.string('password').notNullable(); 
      })
        .then(() => {
          console.log('Table \'users\' created');
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log('Users table created');
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });
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
        table.increments('id').primary();
        table.string('name')
        table.string('muscle_group')
        table.integer('user_id').unsigned().notNullable()
        table.integer('routine_id').unsigned().notNullable(),

        table.foreign('user_id').references('users.id');
        table.foreign('routine_id').references('routine.id');
        
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
        // table.increments('id').primary();
        table.date('date');
        table.integer('user_id').unsigned().notNullable().primary();

        // Set up foreign key relationship to "users"
        table.foreign('user_id').references('users.id');
        
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
        table.increments('id').primary();
        table.string('name').notNullable();
        // table.date('date').notNullable();
        table.integer('user_id').unsigned().notNullable();
        // table.integer('workout_id').unsigned().notNullable();

        //foreign key relationships
        table.foreign('user_id').references('users.id');
        table.foreign('workout_id').references('workouts.id');
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
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('workout_id').unsigned().notNullable();
        table.date('date').notNullable();
        table.integer('sets').notNullable();
        table.float('weight');
        table.integer('reps');
        table.integer('score');
        table.integer('user_id').unsigned().notNullable();
        
        // Define foreign keys
        table.foreign('name').references('exercises.name');
        table.foreign('workout_id').references('workouts.id');
        table.foreign('user_id').references('users.id');
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

  // Create a join table between "workouts" and "routines"
knex.schema
.hasTable('workout_routines')
.then((exists) => {
  if (!exists) {
    return knex.schema.createTable('workout_routines', (table) => {
      table.increments('id').primary(); // Primary key for the join table
      table.integer('workout_id').unsigned().notNullable();
      table.integer('routine_id').unsigned().notNullable();

      // Foreign key relationships
      table.foreign('workout_id').references('workouts.id');
      table.foreign('routine_id').references('routines.id');

      // Ensure a unique combination of workout and routine
      table.unique(['workout_id', 'routine_id']);
    })
      .then(() => {
        console.log('Table \'workout_routines\' created');
      })
      .catch((error) => {
        console.error(`There was an error creating table: ${error}`);
      });
  }
})
.then(() => {
  console.log('created workout_routines table');
})
.catch((error) => {
  console.error(`There was an error setting up the database: ${error}`);
});



  

export default knex;