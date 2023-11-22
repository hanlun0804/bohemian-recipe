import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Modal } from './Modal'
import Rating from '../molecules/Rating'
import IngredientBox from '../molecules/IngredientBox'
import { setLocalRating, getLocalRating } from '../../utils/localStorageUtil.ts'
import { gql, useMutation, useLazyQuery } from '@apollo/client'

export type RecipeCardProps = {
    idMeal: string
    strMealThumb: string
    imgAlt: string
    strMeal: string
    strCategory: string
    strArea: string
    strInstructions: string
    strIngredient1: string
    strIngredient2: string
    strIngredient3: string
    strIngredient4: string
    strIngredient5: string
    strIngredient6: string
    strIngredient7: string
    strIngredient8: string
    strIngredient9: string
    strIngredient10: string
    strIngredient11: string
    strIngredient12: string
    strIngredient13: string
    strIngredient14: string
    strIngredient15: string
    strIngredient16: string
    strIngredient17: string
    strIngredient18: string
    strIngredient19: string
    strIngredient20: string
    strMeasure1: string
    strMeasure2: string
    strMeasure3: string
    strMeasure4: string
    strMeasure5: string
    strMeasure6: string
    strMeasure7: string
    strMeasure8: string
    strMeasure9: string
    strMeasure10: string
    strMeasure11: string
    strMeasure12: string
    strMeasure13: string
    strMeasure14: string
    strMeasure15: string
    strMeasure16: string
    strMeasure17: string
    strMeasure18: string
    strMeasure19: string
    strMeasure20: string
}

export type ModalRecipeProps = {
    selectedRecipe: RecipeCardProps
    mealId: string
    onClose: () => void
}

const GET_SPECIFIC_MEAL_RATING = gql`
    query GetSpecificMealRating($mealId: String!) {
        specificMealRating(mealId: $mealId)
    }
`

const UPDATE_MEAL_MUTATION = gql`
    mutation UpdateSpecificMealRating($mealId: String!, $rating: [Int]) {
        updateSpecificMealRating(mealId: $mealId, rating: $rating) {
            idMeal
            rating
        }
    }
`

const ModalRecipe: React.FC<ModalRecipeProps> = ({
    selectedRecipe,
    mealId,
    onClose,
}) => {
    const modalRoot = document.getElementById('modal-root')

    const [specificRating, setSpecificRating] = useState<number[]>([])

    const [
        GetSpecificMealRating,
        { data: ratingData, loading: loadingRating, error: errorRating },
    ] = useLazyQuery(GET_SPECIFIC_MEAL_RATING, {
        variables: { mealId: mealId },
        onCompleted: (data) => {
            // Now data.specificMealRating should be directly an array of integers
            setSpecificRating(data.specificMealRating)
        },
    })
    const [updateRating] = useMutation(UPDATE_MEAL_MUTATION)

    const {
        strMealThumb,
        imgAlt,
        strMeal,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strIngredient16,
        strIngredient17,
        strIngredient18,
        strIngredient19,
        strIngredient20,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
        strMeasure16,
        strMeasure17,
        strMeasure18,
        strMeasure19,
        strMeasure20,
    } = selectedRecipe

    function ratingFunction(newValue: number) {
        const localRating = getLocalRating(mealId)
        if (localRating !== 0 && localRating !== newValue) {
            //If the user has already given another rating (will not run if you click the same rating twice to save the climate)
            GetSpecificMealRating({ variables: { mealId } })
            let oldRatings = specificRating

            let found = false // This flag will indicate whether the rating was already removed

            // Remove only the first occurrence of the localRating
            oldRatings = oldRatings.filter((rating) => {
                if (!found && rating === localRating) {
                    found = true // Set the flag to true after removing the rating
                    return false // Remove this rating
                }
                return true // Keep all other ratings
            })

            // Add the new rating
            oldRatings.push(newValue)
            updateRating({
                variables: {
                    mealId: mealId,
                    rating: oldRatings, // Make sure this is an array of integers
                },
            })
                .then((response) => {
                    console.log(
                        'Rating updated',
                        response.data.updateSpecificMealRating
                    )
                })
                .catch((error) => {
                    console.error('Error updating rating', error)
                    console.error('GraphQL Error:', error.graphQLErrors)
                    console.error('Network Error:', error.networkError)
                })
        }

        setLocalRating(mealId, newValue) // Sets the localStorage rating
    }

    useEffect(() => {
        GetSpecificMealRating()
    }, [mealId, GetSpecificMealRating])

    useEffect(() => {
        if (!loadingRating && !errorRating && ratingData) {
            setSpecificRating(ratingData.specificMealRating)
            console.log(
                'Data rating in lazy query:',
                ratingData.specificMealRating
            )
        }
    }, [ratingData, loadingRating, errorRating])

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])
    return ReactDOM.createPortal(
        <div className="modal">
            <Modal onClickOut={onClose}>
                <div className="flex justify-end mb-4">
                    <button className="bg-orange-400" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex">
                    <div className="mx-auto max-w-fit p-4">
                        <div className="flex justify-center h-64 md:h-80 lg:h-96">
                            <img
                                src={strMealThumb}
                                alt={imgAlt}
                                className="w-2/3 h-full object-contain rounded mb-4 "
                            />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-2 text-center">
                            {strMeal}{' '}
                        </h2>
                        <hr className="border-t-2 border-orange-400 mt-8 w-full" />
                        <div className="flex flex-col md:flex-row">
                            <div className="mt-8">
                                <IngredientBox
                                    ingredients={[
                                        strIngredient1,
                                        strIngredient2,
                                        strIngredient3,
                                        strIngredient4,
                                        strIngredient5,
                                        strIngredient6,
                                        strIngredient7,
                                        strIngredient8,
                                        strIngredient9,
                                        strIngredient10,
                                        strIngredient11,
                                        strIngredient12,
                                        strIngredient13,
                                        strIngredient14,
                                        strIngredient15,
                                        strIngredient16,
                                        strIngredient17,
                                        strIngredient18,
                                        strIngredient19,
                                        strIngredient20,
                                    ]}
                                    measures={[
                                        strMeasure1,
                                        strMeasure2,
                                        strMeasure3,
                                        strMeasure4,
                                        strMeasure5,
                                        strMeasure6,
                                        strMeasure7,
                                        strMeasure8,
                                        strMeasure9,
                                        strMeasure10,
                                        strMeasure11,
                                        strMeasure12,
                                        strMeasure13,
                                        strMeasure14,
                                        strMeasure15,
                                        strMeasure16,
                                        strMeasure17,
                                        strMeasure18,
                                        strMeasure19,
                                        strMeasure20,
                                    ]}
                                />
                            </div>

                            <div className="mt-8 ml-8">
                                <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-2">
                                    Steps
                                </h2>
                                <ol className="text-lg mb-4 sm:text-m md:text-l lg:text-xl">
                                    {strInstructions
                                        .split('\n')
                                        .map((step, index) => (
                                            <p className="mb-4" key={index}>
                                                {step}
                                            </p>
                                        ))}
                                </ol>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col items-center pb-8">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                                Leave your rating
                            </h2>
                            <Rating
                                count={5}
                                value={getLocalRating(mealId)}
                                edit={true}
                                onChange={(newValue) =>
                                    ratingFunction(newValue)
                                }
                            />
                            <span className="text-lg">
                                {getLocalRating(mealId)}/5 stars
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>,
        modalRoot!
    )
}

export default ModalRecipe
