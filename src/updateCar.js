const AWS = require("aws-sdk");

/*Función: "updateCar"
 * Esta función  nos permite actualizar la informació de un carro segun su "id".
 */
const updateCar = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { brand, model, price } = JSON.parse(event.body);
    //Validación para que los camos sean obligatorios
    if (
      brand == "" ||
      model == "" ||
      price == "" ||
      brand == null ||
      model == null ||
      price == null
    ) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message:
            "Lo sentimos, ha ocurrido un error al intentar actualizar este vehiculo, por favor verifique los campos e intente nuevamente",
        }),
      };
    } else {
      await dynamodb
        .update({
          TableName: "Vehicles",
          UpdateExpression:
            "set brand = :brand, model = :model, price = :price",
          ExpressionAttributeValues: {
            ":brand": brand,
            ":model": model,
            ":price": price,
          },
          Key: { id },
          ReturnValues: "ALL_NEW",
        })
        .promise();

      //Se envia un codigo de estado http 200 haciendo referencia de que todo esta bien.
      return {
        status: 200,
        body: JSON.stringify({
          message: "Carro actualizado",
        }),
      };
    }
  } catch (error) {
    //Si llegase a fallar se le envia un codigo http 500 para indicar el error, conjunto un json diciendo que existe un error
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          "Lo sentimos, ha ocurrido un error al querer actualizar el carro, por favor verique los campos e intente nuevamente",
      }),
    };
  }
};

module.exports = {
  updateCar,
};
