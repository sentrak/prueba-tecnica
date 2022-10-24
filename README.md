# Prueba Tecnica Santiago Jimenez Raigosa

A quien pueda interesar.
Espero que se encuentre muy bien. En este repositorio encontrará la API quue permite la realización de un CRUD de vehículos. Esta api fue desarrollada en nodeJS conectada a DynamoDB y conectada por medio de
lambdas.


## addCar 🆕

Este metodo POST permite crear un nuevo carro con los atributos brand, model, price el id se genera automaticamente.
url
```
https://74h214aq4a.execute-api.us-east-1.amazonaws.com/cars
```

## getCar 📄

Este metodo GET obtiene un vehiculo segun su "id".
url
```
https://74h214aq4a.execute-api.us-east-1.amazonaws.com/cars/{id}
```

## getAllCars 📃

Este metodo GET nos pertime hacer un listado con todos los vehiculos existentes en la tabal "vehicles".

url:
```
https://74h214aq4a.execute-api.us-east-1.amazonaws.com/cars
```

## updateCar ♻

Este metodo PUT nos permite actualizar la informació de un carro segun su "id".

url:
```
https://74h214aq4a.execute-api.us-east-1.amazonaws.com/cars/{id}
```

## deleteCar ❌

Este metodo DELETE nos permite eliminar un carro segun su "id".

url:
```
https://74h214aq4a.execute-api.us-east-1.amazonaws.com/cars/{id}
```

