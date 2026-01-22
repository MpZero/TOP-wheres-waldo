import {
  findCharacters,
  findUsers,
  createUser,
} from "../prisma/queries/appQueries.js";

async function getCharacters(req, res) {
  const characters = await findCharacters(1);
  return res.status(201).json({ characters });
}

async function validateCoordinates(req, res) {
  try {
    const { imageId, userX, userY } = req.body;

    const characters = await findCharacters(Number(imageId));

    characters.forEach((character) => {
      const hitX =
        userX >= character.x - character.tolerance &&
        userX <= character.x + character.tolerance;
      const hitY =
        userY >= character.y - character.tolerance &&
        userY <= character.y + character.tolerance;

      if (hitX && hitY) {
        return res.status(201).json({
          id: character.id,
        });
      } else {
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function getScores(req, res) {
  const scores = await findUsers();
  return res.status(201).json({
    scores,
  });
}

async function postScore(req, res) {
  const { time, user } = req.body;
  const users = await createUser(time, user);

  if (users) {
    return res.status(201).json({
      message: `postScore`,
    });
  }
}

export { validateCoordinates, postScore, getScores, getCharacters };
