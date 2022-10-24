const AWS = require("aws-sdk");

/*Función: "getCars"
 * Esta función nos pertime hacer un listado con todos los vehiculos existentes en la tabal "vehicles".
 */
const getCars = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({ TableName: "Vehicles" }).promise();

    const cars = result.Items;

    //Se envia un codigo de estado http 200 haciendo referencia de que todo esta bien.

    return {
      status: 200,
      body: {
        cars,
      },
    };
  } catch (error) {
    //Si llegase a fallar se le envia un codigo http 500 para indicar el error, conjunto un json diciendo que existe un error
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          "Lo sentimos, ha ocurrido un error al querer obtener todos los carros, por favor intente nuevamente",
      }),
    };
  }
};

module.exports = {
  getCars,
};
