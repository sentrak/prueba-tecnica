const AWS = require("aws-sdk");

const updateCar = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { brand, model, price } = JSON.parse(event.body);
    const result = await dynamodb
      .update({
        TableName: "Vehicles",
        UpdateExpression: "set brand = :brand, model = :model, price = :price",
        ExpressionAttributeValues: {
          ":brand": brand,
          ":model": model,
          ":price": price,
        },
        Key: { id },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      status: 200,
      body: JSON.stringify({
        message: "Carro actualizado",
      }),
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateCar,
};
