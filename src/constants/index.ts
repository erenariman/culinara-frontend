export const CATEGORIES = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Appetizer",
    "Salad",
    "Soup",
    "Beverage"
];

export const DIET_TYPES = [
    "None",
    "Vegetarian",
    "Vegan",
    "Keto",
    "Paleo",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Carb"
];

export const DIFFICULTIES = [
    "Easy",
    "Medium",
    "Hard",
    "Expert"
];

export const TIME_FILTERS = [
    { label: "Any Time", value: 0 },
    { label: "Under 15 mins", value: 15 },
    { label: "Under 30 mins", value: 30 },
    { label: "Under 1 hour", value: 60 }
];

export const SORT_OPTIONS = [
    { label: "Newest", value: "created_at:desc" },
    { label: "Oldest", value: "created_at:asc" },
    { label: "Highest Rated", value: "average_rating:desc" },
    { label: "Most Viewed", value: "view_count:desc" },
];
