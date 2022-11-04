import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(undefined);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        "https://food-app-e14a9-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something wend wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
    } catch (error) {
      setHttpError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (httpError) {
    return (
      <section className={classes.meals}>
        <Card>
          <p style={{ textAlign: "center" }}>{httpError}</p>
        </Card>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <Card>
          <p style={{ textAlign: "center" }}>Loading...</p>
        </Card>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
