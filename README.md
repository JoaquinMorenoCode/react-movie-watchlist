# Streaming Availability Web App

This is a React web application that utilizes the Streaming Availability API to fetch and display streaming availability information for movies and series across various streaming platforms. Users can filter movies by country and streaming service, and add movies to a personal watchlist stored in a MySQL database on a server. The app uses Bootstrap for styling.

## Website

Check out the live demo of the app [here](http://your-demo-app-url.com).

*Note: The API has a daily request limit. If the app does not load data, it may be due to reaching the maximum number of requests for the day.*

## Features

- **Browse Streaming Availability**: Search and browse movies and series available on popular streaming services like Netflix, Disney+, Apple TV, Max, and Hulu.
- **Filter by Country**: Filter available content based on your country.
- **Filter by Streaming Service**: Narrow down the list of available shows by selecting a specific streaming service.
- **Watchlist Management**: Add movies and series to a personal watchlist, stored in a MySQL database.

## Usage

1. **Filter Movies/Series**
   - Filter results by selecting a country and/or streaming service.

2. **Add to Watchlist**
   - Click the "Add to Watchlist" button on a movie/series to add it to your watchlist.
   - View your watchlist by navigating to the "Watchlist" page.

## Dependencies

- React
- Fetch (for API requests)
- React Router (for routing)
- Bootstrap (for styling)
- MySQL (for watchlist storage)

---

Enjoy using the Streaming Availability Web App!
