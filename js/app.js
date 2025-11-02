let cliente = {
    mesa:'',
    hora:'',
    pedido:[]
}

const categorias = {
    1: 'Comida',
    2: 'Bebida',
    3: 'Postre'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente(e) {
    e.preventDefault();

    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    // Revisar si hay campos vacíos
    if (mesa === '' || hora === '') {
        imprimirAlerta('Completa el formulario')
        return;
    }
    // Asignar datos del formulario al cliente
        cliente = {...cliente, mesa, hora}
        console.log(cliente)
        // Cerrar modal boostrap
        const modalFormulario = document.querySelector('#formulario'); 
        const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
        modalBootstrap.hide();

        // Mostrar secciones
        mostrarSeccion();

        // Obtener platillos de la API de JSON server
        obtenerPlatillos();
}

function obtenerPlatillos() {

    const url = 'http://localhost:4000/platillos';
    fetch(url)
        .then(resultado => resultado.json())
        .then(datos => MostrarPlatos(datos))

        .catch(error => console.log(error))
}

function MostrarPlatos(platos) {
    const contenido = document.querySelector('#platillos .contenido');
    
    platos.forEach(plato => {

        const {id,nombre,precio,categoria} = plato;

        // Crear el div de plato
        const divPlato = document.createElement('DIV');
        divPlato.classList.add('row', 'py-3', 'border-top');

        const nombrePlato = document.createElement('DIV');
        nombrePlato.classList.add('col-md-4');
        nombrePlato.textContent = nombre;

        const precioPlato = document.createElement('DIV');
        precioPlato.classList.add('col-md-3', 'fw-bold');
        precioPlato.textContent = `$${precio}`;

        const categoriaPlato = document.createElement('DIV');
        categoriaPlato.classList.add('col-md-3', 'fw-bold');
        categoriaPlato.textContent = categorias[categoria];

        const imputAgregar = document.createElement('INPUT');
        imputAgregar.type = 'number';
        imputAgregar.min = 0;
        imputAgregar.value = 0;
        imputAgregar.id = `producto-${id}`;
        imputAgregar.classList.add('form-control');

        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2');
        agregar.appendChild(imputAgregar);

        
        
        contenido.appendChild(divPlato);
        divPlato.appendChild(nombrePlato);
        divPlato.appendChild(precioPlato);
        divPlato.appendChild(categoriaPlato);
        divPlato.appendChild(agregar);

        // Agregar evento de agregar al pedido
        imputAgregar.onchange = function() {
            const cantidad = parseInt(imputAgregar.value);
            agregarPlato({...plato, cantidad});
        }

        
    })
}

function agregarPlato(producto) {
    let { pedido } = cliente;
    

    if (producto.cantidad > 0 ) {
        // Elementos iguales 
        if(pedido.some( articulo =>  articulo.id===producto.id)){

            const pedidoActualizado = pedido.map(articulo => {
                if (articulo.id===producto.id) {
                    articulo.cantidad=producto.cantidad;
                }
                return articulo;
            });

            cliente.pedido=[...pedidoActualizado];
        }else{
            //agregar elemento nuevo 
            cliente.pedido=[...pedido,producto]
        }

    }else{
        //elimiar producto si es 0
        const resultado = pedido.filter( articulo =>  articulo.id !== producto.id)
        cliente.pedido = [...resultado]
    }

    //limpiar html y evitar duplicados
    limpiarHtml()

    //si pedido tiene lo muestra , si no limpia la ventana de Consumo
    if (cliente.pedido.length) {
        //mostrar Consumo
        mostrarConsumo()
    }else{
        mensajePedidoVacio()
    }
}

function mostrarConsumo() {

    const contenido = document.querySelector('#resumen .contenido')

    const resumen = document.createElement('DIV')
    resumen.classList.add('col-md-6','card','py-3','px-3','shadow')

    //Informacion de la Mesa
    const mesa = document.createElement('P')
    mesa.textContent='Mesa:  '
    mesa.classList.add('fw-bold')

    const mesaSpan = document.createElement('SPAN')
    mesaSpan.textContent = cliente.mesa
    mesaSpan.classList.add('fw-normal')

     //Informacion de la Hora
    const hora = document.createElement('P')
    hora.textContent='Hora:  '
    hora.classList.add('fw-bold')

    const horaSpan = document.createElement('SPAN')
    horaSpan.textContent = cliente.hora
    horaSpan.classList.add('fw-normal')

    //agregando al padre
    mesa.appendChild(mesaSpan)
    hora.appendChild(horaSpan)

    //mostrar Consumo iterando array pedidos
    const grupo = document.createElement('UL')
    grupo.classList.add('list-group')

    const {pedido} = cliente
    pedido.forEach(articulos => {

        const { nombre,precio,cantidad,categoria,id } = articulos

        const lista =document.createElement('LI')
        lista.classList.add('list-group-item')

        const nombreEl =document.createElement('H4')
        nombreEl.classList.add('my-4')
        nombreEl.textContent=nombre
        
        const precioEl =document.createElement('p')
        precioEl.classList.add('fw-bold')
        precioEl.textContent='Precio: $'

        const precioSpan = document.createElement('SPAN')
        precioSpan.classList.add('fw-normal')
        precioSpan.textContent= precio

        const subtotalEl =document.createElement('p')
        subtotalEl.classList.add('fw-bold')
        subtotalEl.textContent='Subtotal: $'

        const subTotalSpan = document.createElement('SPAN')
        subTotalSpan.classList.add('fw-normal')
        //calculando subtotal 
        subTotalSpan.textContent= precio * cantidad
        
        const cantidadEl =document.createElement('p')
        cantidadEl.classList.add('fw-bold')
        cantidadEl.textContent='Cantidad: '

        const cantidadSpan = document.createElement('SPAN')
        cantidadSpan.classList.add('fw-normal')
        cantidadSpan.textContent= cantidad


        //btn para eliminar
        const btnEliminar = document.createElement('button')
        btnEliminar.classList.add('btn','btn-danger')
        btnEliminar.textContent='Eliminar Pedido'

        btnEliminar.onclick = function () {
            eliminarProducto(id)
        }

        //agregando spanS
        cantidadEl.appendChild(cantidadSpan)
        precioEl.appendChild(precioSpan)
        subtotalEl.appendChild(subTotalSpan)


        //agregando elementos a Li
        lista.appendChild(nombreEl)
        lista.appendChild(cantidadEl)
        lista.appendChild(precioEl)
        lista.appendChild(subtotalEl)
        lista.appendChild(btnEliminar)

        //agregando lista a Ul
        grupo.appendChild(lista)

        

    });

    //titulo
    const heading = document.createElement('H3')
    heading.textContent='Consumo'
    heading.classList.add('my-4','text-center')


   //agregando a contenido  
    resumen.appendChild(heading)
    resumen.appendChild(mesa)
    resumen.appendChild(hora)
    resumen.appendChild(grupo)
    //agregando a divresumen
    contenido.appendChild(resumen)

    
    //mostrr Formulario Propinas
    formularioPropinas()


    
}

function formularioPropinas() {
    const contenido = document.querySelector('#resumen .contenido')

    const formulario = document.createElement('DIV')
    formulario.classList.add('col-md-6','formulario')

    const divFormulario = document.createElement('DIV')
    divFormulario.classList.add('card','py-3','px-3','shadow')

    const heading = document.createElement('H3')
    heading.classList.add('my-4','text-center')
    heading.textContent='Propinas'

    //input propinas
    // Propina 10%
    const checkBox10 = document.createElement('INPUT');
    checkBox10.type = 'radio';
    checkBox10.name = 'propina';
    checkBox10.value = '10';
    checkBox10.classList.add('form-check-input');
    checkBox10.onclick = calcularPropina;
    
    const checkLabel10 = document.createElement('LABEL');
    checkLabel10.textContent = '10%';
    checkLabel10.classList.add('form-check-label');
    
    const checkDiv10 = document.createElement('DIV');
    checkDiv10.classList.add('form-check');
    
    checkDiv10.appendChild(checkBox10);
    checkDiv10.appendChild(checkLabel10);
    
    // Propina 25%
    
    const checkBox25 = document.createElement('INPUT');
    checkBox25.type = 'radio';
    checkBox25.name = 'propina';
    checkBox25.value = '25';
    checkBox25.classList.add('form-check-input');
    checkBox25.onclick = calcularPropina;
    
    const checkLabel25 = document.createElement('LABEL');
    checkLabel25.textContent = '25%';
    checkLabel25.classList.add('form-check-label');
    
    const checkDiv25 = document.createElement('DIV');
    checkDiv25.classList.add('form-check');
    
    checkDiv25.appendChild(checkBox25);
    checkDiv25.appendChild(checkLabel25);
    
    // Propina 50%
    const checkBox50 = document.createElement('INPUT');
    checkBox50.type = 'radio';
    checkBox50.name = 'propina';
    checkBox50.value = '50';
    checkBox50.classList.add('form-check-input');
    checkBox50.onclick = calcularPropina;
    
    const checkLabel50 = document.createElement('LABEL');
    checkLabel50.textContent = '50%';
    checkLabel50.classList.add('form-check-label');
    
    const checkDiv50 = document.createElement('DIV');
    checkDiv50.classList.add('form-check');

    checkDiv50.appendChild(checkBox50);
    checkDiv50.appendChild(checkLabel50);


    //div principal
    formulario.appendChild(divFormulario)
    divFormulario.appendChild(heading)
    divFormulario.appendChild(checkDiv10)
    divFormulario.appendChild(checkDiv25)
    divFormulario.appendChild(checkDiv50)

    //div principal
    contenido.appendChild(formulario)

}

function calcularPropina() {
    let subtotal = 0 
    const {pedido} = cliente

    //subtotal
    pedido.forEach (articulo => {
        subtotal += articulo.cantidad * articulo.precio
    })
    //propina seleccionada 
    const propinaSeleccionada = document.querySelector('[name = "propina"]:checked').value
    
    //calcular propina 
    const propina = ((subtotal * parseInt(propinaSeleccionada) / 100))

    //calcular total
    const total = subtotal + propina

    mostrarTotal( subtotal,total,propina )

}

function mostrarTotal( subtotal,total,propina ) {

    const divTotalPagar = document.createElement('DIV')
    divTotalPagar.classList.add('total-pagar','my-5')

    //Subtotal
    const subtotalParrafo = document.createElement('P')
    subtotalParrafo.classList.add('fs-4','fw-bold','mt-2')
    subtotalParrafo.textContent = 'Subtotal Consumo: '

    const subtotalSpan = document.createElement('SPAN')
    subtotalSpan.classList.add('fw-normal')
    subtotalSpan.textContent = `$${subtotal}`

    subtotalParrafo.appendChild(subtotalSpan)

    //Propina
    const PropinaParrafo = document.createElement('P')
    PropinaParrafo.classList.add('fs-4','fw-bold','mt-2')
    PropinaParrafo.textContent = 'Propina: '

    const propinaSpan = document.createElement('SPAN')
    propinaSpan.classList.add('fw-normal')
    propinaSpan.textContent = `$${propina}`

    PropinaParrafo.appendChild(propinaSpan)

    //Total
    const totalParrafo = document.createElement('P')
    totalParrafo.classList.add('fs-4','fw-bold','mt-2')
    totalParrafo.textContent = 'Total a Pagar: '

    const totalSpan = document.createElement('SPAN')
    totalSpan.classList.add('fw-normal')
    totalSpan.textContent = `$${total}`

    totalParrafo.appendChild(totalSpan)

    //Eliminar resultados 
    const totalpagarDiv = document.querySelector('.total-pagar')
    if (totalpagarDiv) {
        totalpagarDiv.remove()
    }

    divTotalPagar.appendChild(subtotalParrafo)
    divTotalPagar.appendChild(PropinaParrafo)
    divTotalPagar.appendChild(totalParrafo)

    const formulario = document.querySelector('.formulario > div')

    formulario.appendChild(divTotalPagar)

}

function eliminarProducto(id) {

    const {pedido} = cliente
    const resultado = pedido.filter( articulo =>  articulo.id !== id)
    cliente.pedido = [...resultado]
    
    //limpiar html y evitar duplicados
    limpiarHtml()

    //si pedido tiene lo muestra , si no limpia la ventana de Consumo
    if (cliente.pedido.length) {
        //mostrar Consumo
        mostrarConsumo()
    }else{
        mensajePedidoVacio()
    }
    //producto eliminado , regresar cantidad a 0 en submit formulario
    const productoEliminado = `#producto-${id}`
    const inputEliminado = document.querySelector(productoEliminado)
    inputEliminado.value = 0;
}

function limpiarHtml() {
    const contenido = document.querySelector('#resumen .contenido')

    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild)
    }

}

function mostrarSeccion() {
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));

}

function imprimirAlerta(mensaje) {

    const alerta = document.createElement('DIV');
    alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
    alerta.innerHTML =
            `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
            `;

    const existeAlerta = document.querySelector('.invalid-feedback');
    if(!existeAlerta) {
        document.querySelector('.modal-body').appendChild(alerta)
        // Eliminar la alerta después de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function mensajePedidoVacio() {
    const contenido = document.querySelector('#resumen .contenido')

    const texto = document.createElement('P')
    texto.classList.add('text-center')
    texto.textContent = 'Añade los elementos del pedido'

    contenido.appendChild(texto)

}