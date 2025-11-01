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
        imputAgregar.id = `prducto-${id}`;
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
        console.log('es 0')
    }

    console.log(cliente.pedido)
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