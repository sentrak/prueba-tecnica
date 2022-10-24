const AWS = require("aws-sdk");

const deleteCar = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamodb
    .delete({
      TableName: "Vehicles",
      Key: {
        id,
      },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: 'Deleted Car'
    }
  };
};

module.exports = {
  deleteCar,
};