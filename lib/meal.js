import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const meals = db.prepare("SELECT * FROM meals").all();

  return meals;
}

export function getMeal(slug) {
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);

  return meal;
}

export async function saveMeal(meal) {
  const slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extention = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extention}`;

  console.log(fileName);
  

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving Image Failed!");
    }
  });

  meal.image = `/images/${fileName}`

  console.log(meal);

  const stmt = db.prepare(
    "INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  const result = stmt.run(
    meal.title,
    meal.summary,
    meal.instructions,
    meal.image,
    meal.creator,
    meal.creator_email,
    slug
  );
  return result;
}
