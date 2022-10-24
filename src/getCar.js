const AWS = require("aws-sdk");

/*Función: "getCar"
 * Esta función obtiene un vehiculo segun su "id".
 */
const getCar = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;
    //validación de que exista un id para buscar
    if (id == "" || id == null) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message:
            "Lo sentimos, ha ocurrido un error al encontrar el carro, por favor verifique el campo id e intente nuevamente",
        }),
      };
    } else {
      const result = await dynamodb
        .get({
          TableName: "Vehicles",
          Key: { id },
        })
        .promise();

      const car = result.Item;

      //Se envia un codigo de estado http 200 haciendo referencia de que todo esta bien.

      return {
        status: 200,
        body: car,
      };
    }
  } catch (error) {
    //Si llegase a fallar se le envia un codigo http 500 para indicar el error, conjunto un json diciendo que existe un error
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          "Lo sentimos, ha ocurrido un error al querer obtener el carro, por favor verique el campo id e intente nuevamente",
      }),
    };
  }
};

module.exports = {
  getCar,
};
