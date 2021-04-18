### ROADMAP TO FISHEYE APP CREATION
----


### Structure

- 2 main modules : home module and photographer page module
    - they contain all logic and methods
    - for all components

- Components: custom HTML Elements
    - with as little responsibility as possible 

- Home module makes the call to API with fetch():
    - retrieves all data at once (photographers and media)
    - processes data based on MODELS ( reconnects each photographer with its own media )

    - calls for creation of Homepage composed of corresponding components
    - then passes responsibility to PhotographerPage module

- Photographer Page Module
    - uses data retrieved by HomeModule
    - calls for creation of Photographer pages view composed of corresponding components


- Routing
Because of the 'data-driven' nature of the structure, a routing responsible for calling views was not possible,
Here the solution was, to 'impose' urls on views when needed, once the view is initiated through data calling


### <b>Tools in use</b>

#### Webpack
The use of webpack here has 2 main purposes: 
 - ensure the cross-browsers compatibility
 - Give the project a frame that enables the component-based structure, with a strong decupling of responsabilities.


#### Sass
 In the same way, sass makes it possible to work in a modular manner, and optimize the code for reuse in different parts of the app.

 ---


