import pRetry from 'p-retry';
import Image from 'next/image';
import Chips from '@/components/Chip';

import { BucketsNames } from '@/app/API/files-service/functions';
import { getRecipeById } from '@/app/API/recipe-service/recipes/functions';
import { getAllIngredients } from '@/app/API/recipe-service/ingredients/functions';

// #region fetching data from server

const fetchRecipe = async (id: string): Promise<RecipeType | null> => {
  try {
    console.log('fetchRecipe', id);
    const response = await getRecipeById(id);
    return response;
  } catch (error) {
    throw new Error(`error getting recipe by id - ${error}`);
  }
};

const fetchIngredients = async (): Promise<IngredientType[] | null> => {
  try {
    const response = await pRetry(getAllIngredients, {
      retries: 5,
      onFailedAttempt: (error) =>
        console.error(
          `fetchIngredients Attempt ${error.attemptNumber} failed. Retrying...`
        ),
    });
    return response;
  } catch (error) {
    throw new Error(`error fetchIngredients - ${error}`);
  }
};

const getFile = async (recipeId: string, objectName: string): Promise<Blob> => {
  try {
    const encodedObjectName = encodeURIComponent(objectName);

    const response = await pRetry(
      () =>
        fetch(
          `http://localhost:4002/api/files/getFileByName/${BucketsNames.RECIPES}/${recipeId}/${encodedObjectName}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        ),
      {
        retries: 5,
        onFailedAttempt: (error) =>
          console.error(
            `getFile Attempt ${error.attemptNumber} failed. Retrying...`
          ),
      }
    );

    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw new Error(`error getting recipe picture - ${error}`);
  }
};

// #endregion

const Recipes = async ({ params }: { params: { id: string } }) => {
  const [recipe, ingredientsList] = await Promise.all([
    fetchRecipe(params.id),
    fetchIngredients(),
  ]);
  if (!recipe) {
    return <p>recipe not found</p>;
  }
  if (!ingredientsList) {
    return <p>server error</p>;
  }

  const blob = await getFile(recipe._id, recipe.picture);
  const buffer = await blob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const src = `data:${blob.type};base64,${base64}`;

  return (
    <section className='h-full w-full overflow-y-auto'>
      {recipe && (
        <div className='h-full w-full'>
          <header className='flex w-full flex-col items-center justify-center gap-3 pt-12'>
            <h1 className='text-5xl font-bold'>{recipe.name}</h1>
            <h2 className='text-4xl'>{recipe.description}</h2>

            <Chips values={recipe.categories} editMode={false} />
            {blob && (
              <div className='relative ml-2 h-fit w-fit overflow-hidden transition-all duration-200 ease-in'>
                <Image
                  src={src}
                  alt='recipe image'
                  className='rounded-xl py-2'
                  width={900}
                  height={1600}
                />
              </div>
            )}
          </header>

          <section className='px-6'>
            <>
              <p className='text-3xl font-semibold'>ingredients</p>
              {recipe.ingredientsSections &&
                recipe.ingredientsSections.map((ingSection) => (
                  <section key={ingSection.index} className='mb-3'>
                    <p className='text-xl font-semibold'>{ingSection.header}</p>
                    <section className='text-lg'>
                      {ingSection.quantifiedIngredients.map((quntIng) => (
                        <span
                          key={quntIng.index}
                          className='flex flex-row gap-1'
                        >
                          {ingredientsList &&
                            ingredientsList.find(
                              (ing) => ing._id === quntIng.ingredientId
                            ) && (
                              <>
                                <p>{quntIng.quantity}</p>
                                <p>{quntIng.unit}</p>
                                <p>
                                  {
                                    ingredientsList.find(
                                      (ing) => ing._id === quntIng.ingredientId
                                    )!.name
                                  }
                                </p>
                              </>
                            )}
                        </span>
                      ))}
                    </section>
                  </section>
                ))}
            </>
            <>
              <p className='text-3xl font-semibold'>steps</p>

              {recipe.stepsSections &&
                recipe.stepsSections.map((stepSection) => (
                  <section key={stepSection.index} className='mb-3'>
                    <p className='text-xl font-semibold'>
                      {stepSection.header}
                    </p>
                    <section className='text-lg'>
                      {stepSection.steps &&
                        stepSection.steps.map((step) => (
                          <span
                            key={step.index}
                            className='flex flex-row gap-1'
                          >
                            {step.info}
                          </span>
                        ))}
                    </section>
                  </section>
                ))}
            </>
          </section>
        </div>
      )}
    </section>
  );
};

export default Recipes;
