import pRetry from 'p-retry';
import Image from 'next/image';
import Chips from '@/components/Chip';

import { BucketsNames } from '@/app/API/files-service/functions';
import { decimalToFraction } from '@/app/utils/decimalToFraction';
import { getRecipeById } from '@/app/API/recipe-service/recipes/functions';
import { getAllIngredients } from '@/app/API/recipe-service/ingredients/functions';

// #region fetching data from server

const fetchRecipe = async (id: string): Promise<RecipeType | null> => {
  try {
    console.log('fetchRecipe', id);
    const response = await pRetry(() => getRecipeById(id), {
      retries: 5,
      onFailedAttempt: (error) =>
        console.error(
          `fetchRecipe Attempt ${error.attemptNumber} failed. Retrying...`
        ),
    });
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
        <div className='h-full w-full pt-12'>
          <header className='flex w-full flex-col items-center justify-center gap-3'>
            <h1 className='text-5xl font-bold'>{recipe.name}</h1>
            <h2 className='text-4xl'>{recipe.description}</h2>
            <section className='flex flex-row gap-3'>
              <Chips
                values={[recipe.difficultyLevel, ...recipe.categories]}
                editMode={false}
              />
            </section>
            {blob && (
              <div className='relative ml-2 h-fit w-fit overflow-hidden'>
                <Image
                  src={src}
                  alt='recipe image'
                  width={1024}
                  height={768}
                  className='mx-auto h-auto w-[70%] rounded-md'
                />
              </div>
            )}
          </header>

          <section className='mx-auto flex w-[70%] flex-col pb-12 pt-3'>
            <section className='mb-4 w-full border-b-2 border-recipeBrown-dark pb-3'>
              {/* <p className='text-4xl font-bold'>ingredients</p> */}
              {recipe.ingredientsSections &&
                recipe.ingredientsSections.map((ingSection) => (
                  <section key={ingSection.index} className='mb-3'>
                    <p className='text-3xl font-bold'>{ingSection.header}</p>
                    <ul className='flex flex-col gap-1 text-2xl'>
                      {ingSection.quantifiedIngredients.map((quntIng) => (
                        <li key={quntIng.index} className='flex flex-row gap-1'>
                          {ingredientsList &&
                            ingredientsList.find(
                              (ing) => ing._id === quntIng.ingredientId
                            ) && (
                              <>
                                <p
                                  className='inline-block'
                                  style={{
                                    unicodeBidi: 'isolate',
                                    direction: 'ltr',
                                  }}
                                >
                                  {decimalToFraction(quntIng.quantity)}
                                </p>
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
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
            </section>

            <section>
              {/* <p className='text-4xl font-bold'>steps</p> */}

              {recipe.stepsSections &&
                recipe.stepsSections.map((stepSection) => (
                  <section key={stepSection.index}>
                    <p className='text-3xl font-bold'>{stepSection.header}</p>
                    <ul
                      className='flex list-inside flex-col gap-3 text-2xl'
                      style={{ listStyleType: 'disc' }}
                    >
                      {stepSection.steps &&
                        stepSection.steps.map((step) => (
                          <li key={step.index} className='flex flex-row gap-2'>
                            <span>{step.index + 1}.</span>
                            <p>{step.info}</p>
                          </li>
                        ))}
                    </ul>
                  </section>
                ))}
            </section>
          </section>
        </div>
      )}
    </section>
  );
};

export default Recipes;
