// project-root/functions/api.js

const path = require("path");
const fs = require("fs").promises;

exports.handler = async (event) => {
  // Path to your JSON file
  const dataPath = path.join(__dirname, "..", "static", "data.json");

  try {
    // Read and parse the JSON file
    const jsonData = JSON.parse(await fs.readFile(dataPath, "utf8"));

    // Extract the path and optional ID from the event
    const path = event.path.split("/").pop(); // e.g., "cars" or "brands"
    const { id } = event.queryStringParameters;

    // Filter data based on the path and optional ID
    let responseData;
    if (id) {
      responseData = jsonData[path].find((item) => item.id === id);
    } else {
      responseData = jsonData[path];
    }

    return {
      statusCode: 200,
      body: JSON.stringify(responseData || { error: "Not found" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
