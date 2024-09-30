'use client';
import { useCallback, useEffect, useState } from 'react';
import pRetry from 'p-retry';
import { useRouter } from 'next/navigation';
import RecipeCard from '@/components/RecipeCard';
import { loadRecipes } from '../API/recipe-service/recipes/functions';

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await pRetry(() => loadRecipes(page, ITEMS_PER_PAGE), {
        retries: 5,
        onFailedAttempt: (error) =>
          console.error(`Attempt ${error.attemptNumber} failed. Retrying...`),
      });

      if (response) {
        setRecipes((prevRecipes) => {
          const newRecipes = response.filter(
            (newRecipe) =>
              !prevRecipes.some(
                (prevRecipe) => prevRecipe._id === newRecipe._id
              )
          );
          return [...prevRecipes, ...newRecipes];
        });
        setHasMore(response.length === ITEMS_PER_PAGE);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
      console.error('Error fetching recipes:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      hasMore &&
      !isLoading
    ) {
      fetchRecipes();
    }
  }, [hasMore, isLoading, fetchRecipes]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleRecipeClicked = useCallback(
    (recipeId: string) => {
      alert(recipeId);
      router.push(`/he/recipes/${recipeId}`);
    },
    [router]
  );

  return (
    <div className='flex h-full w-full flex-col items-center justify-start overflow-y-auto px-6 py-8'>
      {/* maybe switch flex-wrap to grid */}
      <section className='flex h-fit w-full flex-row flex-wrap gap-x-8 gap-y-6'>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onClick={handleRecipeClicked}
          />
        ))}
      </section>
      {isLoading && <div className='loader'>Loading...</div>}
      {error && <div className='error'>{error}</div>}
      {!hasMore && <div className='no-more'>No more recipes to load.</div>}
    </div>
  );
};

export default Home;
