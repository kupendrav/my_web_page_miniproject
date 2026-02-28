import { recipes, getRecipeBySlug, getRelatedRecipes } from '@/data/recipes';
import RecipeDetail from './RecipeDetail';

export function generateStaticParams() {
  return recipes.map(r => ({ slug: r.slug }));
}

export function generateMetadata({ params }) {
  const recipe = getRecipeBySlug(params.slug);
  return {
    title: recipe ? `${recipe.name} — FoodLovers` : 'Recipe Not Found',
    description: recipe?.description || '',
  };
}

export default function RecipePage({ params }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <span style={{ fontSize: 64 }}>🍽️</span>
        <h1 className="heading-md">Recipe not found</h1>
        <a href="/menu/" className="btn btn-primary btn-sm">Browse Recipes</a>
      </div>
    );
  }

  const related = getRelatedRecipes(params.slug, 4);

  return <RecipeDetail recipe={recipe} related={related} />;
}
