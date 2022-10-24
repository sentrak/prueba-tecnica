const AWS = require("aws-sdk");

/*Función: "deleteCar"
 * Esta función nos permite eliminar un carro segun su "id".
 */
const deleteCar = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    //validación de que exista un id para eliminar
    if (id == "" || id == null) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message:
            "Lo sentimos, ha ocurrido un error al eliminar el carro, por favor verifique el campo id e intente nuevamente",
        }),
      };
    } else {
      await dynamodb
        .delete({
          TableName: "Vehicles",
          Key: {
            id,
          },
        })
        .promise();

      //Se envia un codigo de estado http 200 haciendo referencia de que todo esta bien.
      return {
        status: 200,
        body: {
          message: "Deleted Car",
        },
      };
    }
  } catch (error) {
    //Si llegase a fallar se le envia un codigo http 500 para indicar el error, conjunto un json diciendo que existe un error
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          "Lo sentimos, ha ocurrido un error al eliminar el carro, por favor verifique los campos e intente nuevamente",
      }),
    };
  }
};

module.exports = {
  deleteCar,
};
