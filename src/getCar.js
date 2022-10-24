const AWS = require("aws-sdk");

const getCar = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const result = await dynamodb
    .get({
      TableName: "Vehicles",
      Key: { id },
    })
    .promise();

  const car = result.Item;

  return {
    status: 200,
    body: car,
  };
};

module.exports = {
  getCar,
};