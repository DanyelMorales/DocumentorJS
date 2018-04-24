/**
* DocumentorJS
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup,
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <danyelmorales1991 at gmail.com>
*/

module.exports = {
    NOT_FOUND: "Not found {{file}} in {{path}} : {{excerpt}}",
    EXCERPT:{
         REQUIRED_FILE: "Required to know the files to watch and document!"
    },
    CMD: {
        GRUNT : 'grunt watch --gruntfile=%s --configFile=%s --invokedFrom=%s --packagePath=%s'
    }
};
