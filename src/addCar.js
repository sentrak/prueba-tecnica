const { v4 } = require("uuid");
const AWS = require("aws-sdk");

/*Función: "addCar"
 * Esta función nos permite crear un nuevo carro con las variables brand, model, price
 */
const addCar = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { brand, model, price } = JSON.parse(event.body);
    const id = v4();

    /*
     * objeto con la información a llenar
     */
    const newCar = {
      id,
      brand,
      model,
      price,
    };
    //Validación para que los camos sean obligatorios
    if (
      newCar.brand == "" ||
      newCar.model == "" ||
      newCar.price == "" ||
      newCar.brand == null ||
      newCar.model == null ||
      newCar.price == null
    ) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message:
            "Lo sentimos, ha ocurrido un error al intentar agregar un vehiculo, por favor verifique los campos e intente nuevamente",
        }),
      };
    } else {
      await dynamodb
        .put({
          TableName: "Vehicles",
          Item: newCar,
        })
        .promise();
      //Se envia un codigo de estado http 200 haciendo referencia de que todo esta bien.
      return {
        statusCode: 200,
        body: JSON.stringify(newCar),
      };
    }
  } catch (error) {
    //Si llegase a fallar se le envia un codigo http 500 para indicar el error, conjunto un json diciendo que existe un error
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          "Lo sentimos, ha ocurrido un error al intentar agregar un vehiculo, por favor verifique los campos e intente nuevamente",
      }),
    };
  }
};

module.exports = {
  addCar,
};
