// type Params = {
//   params: {
//     id: string;
//   };
// };

import { BucketsNames, getFileByName } from '@/app/API/files-service/functions';
import { getRecipeById } from '@/app/API/recipe-service/recipes/functions';
import Image from 'next/image';

async function fetchRecipe(id: string): Promise<RecipeType | null> {
  try {
    console.log('fetchRecipe', id);
    const response = await getRecipeById(id);
    return response;
  } catch (error) {
    throw new Error(`error getting recipe by id - ${error}`);
  }
}
const getFile = async (recipeId: string, objectName: string): Promise<Blob> => {
  try {
    const encodedObjectName = encodeURIComponent(objectName);
    const response = await fetch(
      `http://localhost:4002/api/files/getFileByName/${BucketsNames.RECIPES}/${recipeId}/${encodedObjectName}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw new Error(`error getting recipe picture - ${error}`);
  }
};

const Recipes = async ({ params }: { params: { id: string } }) => {
  const recipe = await fetchRecipe(params.id);
  if (!recipe) {
    return <p>recipe not found</p>;
  }
  const blob = await getFile(recipe._id, recipe.picture);
  const buffer = await blob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const src = `data:${blob.type};base64,${base64}`;
  return (
    <section className='overflow-y-auto'>
      {recipe && (
        <div>
          {blob && (
            <div className='relative h-72 w-full'>
              <Image src={src} alt='File' layout='fill' objectFit='cover' />
            </div>
          )}

          <h1>{recipe.name}</h1>
          <h2>{recipe.description}</h2>
          <h2>
            {recipe.categories.map((cat) => (
              <p key={cat}>{cat}</p>
            ))}
          </h2>
          <h3>
            ingredients
            {recipe.ingredientsSections &&
              recipe.ingredientsSections.map((ingSection) => (
                <section key={ingSection.index}>
                  <p>{ingSection.header}</p>
                  <section>
                    {ingSection.quantifiedIngredients.map((quntIng) => (
                      <p key={quntIng.index}>
                        {quntIng.index}
                        <br />
                        {quntIng.ingredientId}
                      </p>
                    ))}
                  </section>
                </section>
              ))}
          </h3>

          <h3>
            steps
            {recipe.stepsSections &&
              recipe.stepsSections.map((stepSection) => (
                <section key={stepSection.index}>
                  <p>{stepSection.header}</p>
                  <section>
                    {stepSection.steps &&
                      stepSection.steps.map((step) => (
                        <p key={step.index}>
                          {step.index}
                          <br />
                          {step.info}
                        </p>
                      ))}
                  </section>
                </section>
              ))}
          </h3>
        </div>
      )}
    </section>
  );
};

export default Recipes;
