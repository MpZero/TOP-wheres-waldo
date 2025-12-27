import { findCharacters } from "../prisma/queries/appQueries.js";

export default async function validateCoordinates(req, res) {
  try {
    const { imageId, userX, userY } = req.body;

    console.log(userX);
    console.log(userY);
    console.log(imageId);

    const characters = await findCharacters(Number(imageId));

    // console.log(characters);

    characters.forEach((character) => {
      const hitX =
        userX >= character.x - character.tolerance &&
        userX <= character.x + character.tolerance;
      const hitY =
        userY >= character.y - character.tolerance &&
        userY <= character.y + character.tolerance;

      if (hitX && hitY) {
        console.log(`FOUND: ${character.name}`);
        return res.status(201).json({
          message: `Found!`,
        });
      } else {
        console.log(`keep trying!`);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
