import { gql } from '@apollo/client';

export const GET_MEALS = gql`
    query GetMeals(
        $categories: [String]
        $areas: [String]
        $offset: Int!
        $sortField: String
    ) {
        meals(
            categories: $categories
            areas: $areas
            offset: $offset
            sortField: $sortField
        ) {
            idMeal
            strMeal
            strCategory
            strArea
            strInstructions
            strMealThumb
            strIngredient1
            strIngredient2
            strIngredient3
            strIngredient4
            strIngredient5
            strIngredient6
            strIngredient7
            strIngredient8
            strIngredient9
            strIngredient10
            strIngredient11
            strIngredient12
            strIngredient13
            strIngredient14
            strIngredient15
            strIngredient16
            strIngredient17
            strIngredient18
            strIngredient19
            strIngredient20
            strMeasure1
            strMeasure2
            strMeasure3
            strMeasure4
            strMeasure5
            strMeasure6
            strMeasure7
            strMeasure8
            strMeasure9
            strMeasure10
            strMeasure11
            strMeasure12
            strMeasure13
            strMeasure14
            strMeasure15
            strMeasure16
            strMeasure17
            strMeasure18
            strMeasure19
            strMeasure20
            rating
        }
    }
`

export const GET_MEAL_TITLES = gql`
    query GetMealTitles {
        mealTitles
    }
`