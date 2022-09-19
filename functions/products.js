const sanityClient = require("@sanity/client");
require("dotenv").config();

exports.handler = async (event) => {
  const client = sanityClient({
    projectId: "as75cbjv",
    dataset: "production",
    useCdn: true,
    token: process.env.TOKEN,
    apiVersion: "2022-08-10"
  });

  try {
    const products = await client.fetch(
      `*[_type == "product" && "chocolate" in tags]`
    );
    const res = await products;
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    };
  } catch (error) {
    console.log(error);
  }
};
