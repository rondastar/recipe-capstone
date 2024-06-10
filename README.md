### Date: June 9, 2024

#### New Features

- API functionality to get ingredient data by ingredient name from MongoDB
- Ingredient lines parsed into quantity and unit
- Unit equivalencies added to calculate between US measurement units, such as teaspoon and cup
- Basic styling added to improve UX

#### Issues Encountered

- Connecting the data in MongoDB with the calculations in the frontend of my app is my current challenge. Ideally, I would like to import only the densities of the ingredients that are actually being converted and not all of the ingredients in the database. That is what I will work on next.

#### Lessons Learned

- Some of the specific methods and nuances of JavaScript are becoming more familiar to me, such as the 'includes' method which can check whether an array contains a given string.
- There's a math.js extension library! I want to play around with it and use it to streamline quantity calculations, but for this version the calculations will be built out in the app.
- I'm getting more comfortable using JSON!

### Date: May 31, 2024

#### New Features

- Textarea for user to enter ingredients
- Function to split lines from the textarea into an array of separate ingredient lines

#### Issues Encountered

- I had looked up an example of how to split lines on Stack Overflow, and their argument for the split function was more complex and accounted for multiple end-line characters - but it didn't work. I tried for a while to get theirs to work since I thought it would be more sophisticated, but ultimately I tried just using "\n" as the argument, and that finally worked! It was such a simple solution.

#### Lessons Learned

- Don't overcomplicate things.
- Deciding how to organize the frontend pieces of this project helped me to understand when to use custom hooks, and I'm learning more about passing variables between components.

### Date: May 16, 2024

#### New Features

- Ingredients and densities (weight per cup) added to database

#### Issues Encountered

- Ingredients can be written out differently or go by different names, so I need to think about how to manage my data so it can be used effectively for recipe conversions.
- Time management in general has been an issue the past couple weeks. It was midterms and it has been easy to get pulled to work that feels more urgent.

#### Lessons Learned

- Right now I have questions that I think will turn into lessons soon. For example, I decided to use only grams per cup in the database to keep the data manageable, and I think that will work well for conversions to other units, but I have yet to see how that will actually work out in practice.

### Date: May 5, 2024 (initial update)

#### Current Features

- Cluster set up in MongoDB
- Schema for Ingredient objects that includes the ingredient name and weight per cup in grams
- Create and Get functionality for ingredient collection in MongoDB

#### Issues Encountered

- Update for ingredient collection is not yet working as expected. There is an error that says that findById is not a valid function for Ingredient.

#### Lessons Learned

- MongoDB and json documents are new to me, so I have been learning a lot about how they function.
