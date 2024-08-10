import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meal";
import { Suspense } from "react";
import MealsLoadingPage from "./loading-out";


export const metadata = {
  title : "Delicious Meals",
  description : "Choose your favorite recipe and cook it yourself. it is easy and fun",
}

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals , created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. it is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share Your Meals</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={ <MealsLoadingPage/>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
