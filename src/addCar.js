const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addCar = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { brand, model, price } = JSON.parse(event.body);
  const id = v4();

  const newCar = {
    id,
    brand,
    model,
    price,
  };
  await dynamodb
    .put({
      TableName: "Vehicles",
      Item: newCar,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newCar),
  };
};

module.exports = {
  addCar,
};
