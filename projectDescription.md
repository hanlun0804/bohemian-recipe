# P2-2 Delivery instructions

## Link to project - Bohemian Recipe

http://it2810-39.idi.ntnu.no/project2/

# Table of Contents

-   [Installation Instructions for Running Project Locally](#installation-instructions-for-running-project-locally)
-   [Usage Instructions](#usage-instructions)
-   [Running Tests](#running-tests)
-   [Documentation from the Developers](#documentation-from-the-developers)
-   [Detailed explanation of project requirements](#detailed-explanation-of-project-requirements)
    -   [Description of the Project Bohemian Recipe](#description-of-the-project-bohemian-recipe)
    -   [Functional Requirements](#functional-requirements)
    -   [Technical Requirements](#technical-requirements)
    -   [Development and Testing Instructions](#development-and-testing-instructions)
    -   [Choices for Solutions](#choices-for-solutions)
    -   [Testing, Development, and Quality Control](#testing-development-and-quality-control)
    -   [The Work of Each Developer](#the-work-of-each-developer)

## Installation Instructions for Running Project Locally

1. Install Node.js and npm if not already installed.

2. Clone repository locally.

3. Navigate to the project root directory and run `npm install` to install project dependencies.

4. After installation, run `npm start` to start the development server. This will run both the frontend and backend.

5. Open your web browser and access the application at the localhost appearing in the terminal.

## Usage Instructions

1. Welcome to Bohemian Recipe. This webpage can help you access recipes retrieved from TheMealDB. You can now search, filter and sort different types of recipes.

2. Click on one of the cards to display the full recipe.

3. Did you like the recipe? Or maybe the recipe was absolutely ghastly? You can now leave a star feedback inside each recipe, either to encurage or warn fellow foodies.

## Running Tests

1. Please run the application before testing with `npm start`.

2. Make sure you are in the root directory. Run vitest test with `npm test`.

3. To run the E2E testing with Cypress explorer run `npx cypress open`.

4. To run Cypress headlessly run `npx cypress run ` in your terminal.

## Linting and Prettier

To check Prettier `npx prettier . --check`

To run Linting `npm run lint`

## Detailed explanation of project requirements

To see a detailed explanation of how we fulfilled every project requirement, click [here](requirements.md). This explanation is in Norwegian.

# Documentation from the Developers

## Description of the Project Bohemian Recipe

The project involves a web page that retrieves and displays recipes from our database, which is based on the meals from TheMealDB API. The user can search for spesific recipes, or filter and sort them to get recipes that fit their spesific desires.

## Functional Requirements

The user is presented with a search bar with the possibility to search for whatever one might please to eat. The searchbar fetches a list of all meal titles. As this is a relatively small amount of data (6.7 kB), we did not see it as a sustainability issue. These titles are fetched once per time the page is loaded. We also use fuzzy search, which is implemented using fuse.js. Here are some alternatives to loading all the titles once:

-   Fetching smaller datasets based on user's search input. We concluded this would require more data being fetched in total, as we would need to fetch the data often.
-   Display search results as "cards" instead of as a list under the search field. This would have required significantly larger amounts of data, since we would have to load the pictures, which is the absolute biggest part of the dataset. This would not have been a sustainable solution.

You can also use the filter and sorting options. This will affect the whole dataset. Once you have made your selection you are presented with different types of recipes you can interact with. This will be saved in session storage, so your choices will remain the same if the page is refreshed. The webpage will only display 12 recipes at the time, and you have the possibility to browse through pages. We use pagination for this, so the client doesn't load the entire dataset unnecessarily. This is a sustainable choice for loading many objects.

The user can click on a recipe card to display more information and even give a rating. This rating will affect the overall score of each recipe when utilized. This is saved in local storage so the user cannot give multiple ratings to affect the overall score. The rating is displayed on the cards before they are clicked. We had issues with a bug where this rating is not updated before the site is refreshed. We tried to solve this in several ways, but could not find a solution. We concluded that the issue stemmed from the "RecipeCard" component not being updated, since updating the state of the rating was not included in this component. This leads to it not automatically being refreshed when the state is updated. Here are some ways we tried to fix the bug:

-   Both "RecipeCard" and "ModalRecipe" (ModalRecipe is where the rating is updated) are components of the parent component "DisplayRecipes". Therefore we tried to pass the state from "ModalRecipe" to "DisplayRecipes" and then to "RecipeCard". We managed to pass the state to "DisplayRecipes", but passing it to "RecipeCard" did not solve the issue.
-   We tried to use global state management. We strongly believe this is the best way to solve our issue, but could not get it to work. If we had more time to explore solutions we would have explored this route more.

In regards to user accessibility, we have tried to be as consistent in using clear HTML-tags in our work so our web page can be read by screen readers. We have also been careful in our selection of our fonts, colors and shapes. Read more about this, as well as our sustainability choices, in [requirements](requirements.md).

Responsive design has been a focus point during the development. We started developing the web page in Figma with a focus on design and a great user interface and experience. For developing our design further we have taken inspiration from popular recipe pages and focused on simplicity and delicate colours. You can also read more about this in [requirements](requirements.md).

## Technical Requirements

Bohemian Recipe is based on React and programmed in TypeScript. The project is set up with Vite and we have used global state managment in the form of Apollo Client. Here we spesifically used InMemoryCache() to cache data. We have set up our own database using MongoDB where we use GraphQL to make queries and mutations. Regarding our use of components, we have used both self made components in addition to a component from TailwindUI (filterSection). We also decided to try something new and implemented the use of TailwindCSS. This was a unanimous decision based on the fact that the group wanted to learn more about styling. Read more about our technical choices in [requirements](requirements.md).

## Development and Testing Instructions

We have used Node.js v20.5+ and npm v10.2.2 and created the project using vite 4.4 where we used the project type React v8.2.0 and Typescript v5.0.2. Regarding the backend we utilized GraphQL v16.8.1 and Apollo v3.8.6 Through our prosess we have taken advantage of linting and Prettier.

## Choices for Solutions

We used MongoDB, a popular NoSQL database, as we found the most documentation using this service. Furthermore we used GraphQL and Apollo Client, as we found these two to interact beautifully.

## Testing, Development and Quality control

We have utilized linting and usage of Prettier throughout. We included an extensive README-file. We have discussed, explained and referred to our most important choices and solutions in regards, but not limited to, components and API. Comments are now improved in the code. Regarding quality control, we have used coauthoring frequently and held code reviews as a team.

### Testing Using Vitest

In accordance to the project requirements we have set up testing of components using Vitest. In addition we have utilized Cypress for an automatic E2E testing which also tests the API. Regarding organization of Cypress, we decided to divide the testing into different parts to test different functions. Therefore, you will find cypress tests in different files.

Run ‘npm test’ in terminal to run tests
This will trigger testing using vitest using snapshot testing and functional component testing. Using react testing library and some functions from Jest and Chai.

### E2E Test Coverage

We included an automated end-2-end testing, which tests use of filters, intitial load, loading recipes in addition to a test of the API. All in accordance to the requirements.

## The Database

The data in the MongoDB database is based on TheMealDB, and we converted it to a JSON file containing objects, where one object represents one recipe. The JSON file can be found [here](./db/all_meals_cleaned_no_numbers.json).

The files used to populate the database can be found in the [db](./db/) directory. Before adding the data to the database, we added randomly generated ratings for each meal, in order to showcase the full rating functionality.

The db directory no longer serves any function for the project, but we have chosen to keep it in case we need to repopulate the database, or if anyone is curious about our methods.

## The Work of Each Developer

This has been delivered, as requested, on BlackBoard.
