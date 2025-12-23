import getCoords from "../prisma/queries/appQueries.js";

export default async function checkCoords(req, res) {
  try {
    const { userX, userY } = req.body;

    const coords = await getCoords();

    const wallyX = coords[0].characters[0].x;
    const wallyY = coords[0].characters[0].y;
    const tolerance = coords[0].characters[0].tolerance;

    const hitX = userX >= wallyX - tolerance && userX <= wallyX + tolerance;
    const hitY = userY >= wallyY - tolerance && userY <= wallyY + tolerance;

    if (hitX && hitY) {
      console.log(true);
      return res.status(201).json({
        message: `Found!`,
      });
    } else {
      console.log(false);
      return;
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
