# Warehouse API Frontend

A React application that renders a warehouse UI application to handle updating inventory and sales.

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

### Improvement List for a production ready app

- Improved parallel fetching for paginated requests (for faster requests when opening a season page)
- Replace the svg and icons library dependencies with local svg icons to improve performance
- SEO and accessibility improvements
- integration testing
