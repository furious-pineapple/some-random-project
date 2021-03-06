# Tum Grum Chief

Vue what I have built 😉. This project was initialized with Vue CLI.... So I can't take credit for setting everything up 😅.

## Goals for this project

This is my attempt at putting a Vue.js project together. I'll hopefully have a functional app that uses the most common Vue features, a data store, and routing. Connecting this app to a functional backend would be a big plus, but probably won't be mvp.

#### MVP

Still needs to be done

- [] Find logo image for app
- [] Add pagination or infinite scrolling option
- [] When a user selects a recipe, show a more details view of their selection (what do we want to show)
- [] Architect how backend will be organized? (User verification, move api request to backend, server hosting or lambda, etc)
- [] Fix type definition for app
- [] Update :filteredRecipes to avoid a loop within a loop.
- [] Lazy load images
- [] Add form/field validations where it fits

- [x] Create site that searches for recipes based on the users search criteria
- [x] Get API key
- [x] Create search bar component
- [x] Create card for search results
- [x] Add more than one filter option that is optional
- [x] Add loading icon when we are searching for results

- [x] Switch API to Spoonacular API
  - [x] Register to get API key
  - [x] Update current form to use new api
  - [x] Validate that new api works on front-end.
- [x] Update layout for search results page.

  - [x] Show 3-4 items for lg
  - [x] Show 2 items for md
  - [x] show 1 item for sm

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
