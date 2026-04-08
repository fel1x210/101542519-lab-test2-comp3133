# Harry Potter Character Application

## Project Overview
This project is an Angular application that interacts with the public [Harry Potter API](https://hp-api.onrender.com) to display characters from the Harry Potter universe. It allows users to view a list of characters, filter them by Hogwarts house, and view detailed information for individual characters.

## Features
- **Character List:** Displays a comprehensive list of Harry Potter characters fetching data from the HP API.
- **Character Filtering:** Includes a filtering component allowing users to filter characters based on their respective Hogwarts houses.
- **Character Details:** Provides an in-depth view of a selected character's details.
- **Optimized Data Fetching:** Utilizes Angular `HttpClient` along with RxJS `shareReplay` to cache API responses, minimizing unnecessary network requests and improving application performance.

## Architecture
The application is built using modern Angular (v21.x) features and follows a modular structure:

### Components
- `CharacterListComponent`: Responsible for rendering the list of characters.
- `CharacterFilterComponent`: Handles the user input for filtering characters by house.
- `CharacterDetailsComponent`: Displays the detailed view of a specific character.

### Services
- `HpApiService`: A centralized service for API interactions. It handles endpoints for:
  - Fetching all characters.
  - Fetching characters by specific houses with built-in caching (`houseCache`).
  - Fetching individual character details by ID with caching (`characterByIdCache`).

### Models
- `Character`: Defines the data structure representing a Harry Potter character.

## Technologies Used
- **Framework:** Angular 21.2.0
- **UI Components:** Angular Material & CDK
- **Languages:** TypeScript, SCSS, HTML
- **Reactive Programming:** RxJS 7.8.0
- **Testing:** Vitest

## Getting Started

To run the application locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.