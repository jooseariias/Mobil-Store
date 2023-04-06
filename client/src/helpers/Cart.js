export const PostProductLocalStorage = (obj) => {
    
    // PRIMERO COMPROBAMOS SI EL CARRITO EXISTE EN EL LOCAL STORAGE

    if(window.localStorage.getItem('carrito-ls')){

        // EL CARRITO YA ESTÁ CREADO, DEBEMOS COMPROBAR SI EL PRODUCTO YA ESTÁ EN EL CARRITO

        const carrito = JSON.parse(window.localStorage.getItem('carrito-ls'));

        for(let i=0; i<carrito.productcarts.length; i++){

            if(obj.id === carrito.productcarts[i].id){
                console.log("llegué")
                return{
                    icon: "error",
                    title: 'Something went wrong',
                    text: 'The product is already in your cart'
                }
            }
        }

        // MODIFICAMOS EL TOTAL DE PRODUCTOS EN EL CARRITO Y SU VALOR TOTAL

        carrito.quantity = carrito.quantity + 1;
        carrito.totalValue = carrito.totalValue + obj.price

        // AGREGAMOS EL NUEVO PRODUCTO AL ARREGLO DE PRODUCTOS EN EL CARRITO Y VOLVEMOS A METERLO EN EL LOCAL STORAGE

        carrito.productcarts.push(obj);
        window.localStorage.setItem('carrito-ls', JSON.stringify(carrito));

        return{
            icon: 'success',
            title: 'Congratulations!',
            text: 'The product was added to your cart',
        }
    }

    else{

        // EL USUARIO EN ESTE PUNTO NO TIENE CARRITO, PRIMERO LO CREAMOS Y LE METEMOS EL PRIMER PRODUCTO

        const carrito = {
            totalValue: obj.price,
            quantity: 1,
            productcarts: [obj]
        }

        window.localStorage.setItem('carrito-ls', JSON.stringify(carrito));

        return{
            icon: 'success',
            title: 'Congratulations!',
            text: 'The product was added to your cart',
        }
    }
}

export const DeleteProductLocalStorage = (id) => {

    // PRIMERO NOS TRAEMOS EL CARRITO DE PRODUCTOS

    const carrito = JSON.parse(window.localStorage.getItem('carrito-ls'));

    // BORRAMOS DE LA LISTA EL PRODUCTO QUE COINCIDA CON EL PARÁMETRO QUE RECIBIMOS

    for(let i=0; i<carrito.productcarts.length; i++){
        if(id === carrito.productcarts[i].id){

            console.log("entré")

            // AHORA MODIFICAMOS LOS PARÁMETROS DE BORRAR UN PRODUCTO
            carrito.quantity = carrito.quantity - 1;
            carrito.totalValue = carrito.totalValue - carrito.productcarts[i].price;
            carrito.productcarts.splice(i, 1);
        }
    }


    window.localStorage.setItem('carrito-ls', JSON.stringify(carrito));

    return{
        icon: 'sucess',
        title: 'Congratulations',
        text: 'The product was deleted to your cart'
    }
}

