![Tests](https://github.com/abbathaw/warehouse-app/actions/workflows/test.yml/badge.svg)

# Warehouse API Frontend

A React application that renders a warehouse UI application to handle updating inventory and sales. The frontend allows the user to list the available products and quantities, and the articles in each product. The user should be able to register a sale, and the inventory would be updated accordingly.

Built with Vitejs, React, react-router, and Tanstack Query. Styling is done with scss.

## Demo

## Screenshots

## Run locally

- Clone the Repository
- (Optional) add .env file and add the values in sample.env. It's optional because all current used .env values have the same default in this application.
- `npm ci`
- `npm run dev`
- App should open in `http://localhost:3000`

To run the tests, `npm run test`

### Decisions

#### Vite

This is now the recommended approach for react single page applications. It provides very fast server start and HMR. It also features a lot of plugins and fully typed APIs.

#### React router

This is a small app, however, adding the react-router to application is beneficial for url and browser history.

#### Tanstack Query

React Query automatically handles caching, background fetching, and refetching of data, ensuring that the application remains up-to-date and responsive despite the unstable nature of the API. Its built-in error and retry handling mechanisms gracefully handle API failures and inconsistencies, reducing the need for extensive custom error handling.

For example, when fetching data, it will retry 3 times. When mutating data, we are retrying at least once or twice depending on the API. In some cases, if the response status was 404 or 400 we immediately stop any further retries.

### Improvement List for a better production ready app

- Support for pagination, search and filtering. The UI requests will slow down if we have a very big array of articles and products.
- The update of the inventory (after creating a new sale) should be a backend responsibility so it can handle atomic and consistent updates and rollback transactions. I guess this use case implementation on the frontend is ok for this simple app.
- Extra testing implementations to increase test coverage on the components and support wider test cases.
