import findUsers from "../prisma/queries/appQueries.js";

export default async function getUser(req, res) {
  try {
    const users = await findUsers();

    return res.status(201).json({
      message: `users ${users}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
