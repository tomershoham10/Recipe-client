import { getRecipeById } from '@/app/API/recipe-service/recipes/functions';

const Recipes = async ({ params }: { params: { id: string } }) => {
  const recipeId = params.id;
  try {
    const recipe = await getRecipeById(recipeId);
    return <div>{recipe && recipe._id}</div>;
  } catch (error) {
    console.error('Failed to fetch recipe:', error);
    return <div>Error loading recipe</div>;
  }
};

export default Recipes;
