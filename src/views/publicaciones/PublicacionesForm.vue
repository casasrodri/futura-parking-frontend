<template>
    <h2>FORMULARIO</h2>


    <form @submit.prevent="btnFuncion">

        <br>
        <label for="tipo">Tipo</label>
        <select v-model="publi.tipo">
            <option value="oferta">Oferta</option>
            <option value="demanda">Solicitud</option>
        </select>

        <br>
        <label for="ini">Inicio:</label>
        <input type="datetime-local" v-model="publi.ini" />

        <br>
        <label for="fin">Fin:</label>
        <input type="datetime-local" v-model="publi.fin" :min="publi.ini" />

        <br>
        <label for="vencimiento">Vencimiento:</label>
        <input type="datetime-local" v-model="publi.vencimiento" :min="publi.ini" :max="publi.fin" />

        <br>
        <label for="observaciones">Observaciones:</label>
        <textarea v-model="publi.observaciones" placeholder="Observaciones"></textarea>

        <div v-if="publi.tipo === 'oferta'">
            <br>
            <label for="tipo">Cochera:</label>
            <select v-model="publi.cochera">
                <option v-for="coch in cocherasPropietario" :key="coch._id" :value="coch._id">{{ coch.numero }} ({{
                    coch.tipo }})</option>
            </select>

            <br>
            <label for="numero">Precio:</label>
            <input type="number" v-model="publi.precio" placeholder="Precio" />
        </div>

        <div v-if="publi.tipo === 'demanda'">
            <br>
            <label for="tipo">Vehículo:</label>
            <select v-model="publi.demanda.vehiculo">
                <option v-for="vehi in vehiculosPropietario" :key="vehi._id" :value="vehi._id">{{ vehi.alias }} ({{
                    vehi.patente }})</option>
            </select>
        </div>

        <br>
        <button type="submit">{{ btnGuardar }}</button>
    </form>

    <br><br>
    {{ errores }}

    <br><br>
    {{ publiGuardar }}

    <br><br>
    {{ usuarioLogueado }}
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Publicacion from '../../api/publicaciones.js'

const router = useRouter()
const errores = ref([])
const publi = ref({ oferta: {}, demanda: {} })
const usuarioLogueado = ref('')

const actualizar = async () => {
    alert('Se está actualizando la publicación...')
    const res = await Publicacion.update(publi.value._id, publiGuardar.value)
    console.log(res)
    alert('Actualizada!!')
    // router.push({ name: 'publicacionesList' })
}

const publiGuardar = computed(() => {
    const guardar = { ...publi.value }
    guardar.creador = usuarioLogueado.value
    guardar.estado = 'disponible'

    if (publi.value.tipo === 'oferta') {
        guardar.cochera = publi.value.cochera
        guardar.precio = publi.value.precio
    } else {
        guardar.vehiculo = publi.value.demanda.vehiculo
    }

    return guardar
})

const cocherasPropietario = ref([])
const vehiculosPropietario = ref([])

const registrar = async () => {
    alert('Se está creando la nueva publicación...')
    const res = await Publicacion.create(publiGuardar.value)
    console.log(res)
    alert('Creada!!')
    router.push({ name: 'publicacionesList' })
}

const btnGuardar = ref('Actualizar')
const btnFuncion = ref(actualizar)
const routes = useRoute()

import Cochera from '../../api/cocheras.js'
import Vehiculo from '../../api/vehiculos.js'
import { getSessionInfo } from '../../api/sesiones.js'
import { fechaHora } from '../../utils/datetime.js';

onMounted(async () => {

    // Obtener usuario:
    const session = await getSessionInfo()
    usuarioLogueado.value = session.usuario

    if (routes.name === 'publicacionesAlta') {
        console.log('alta')
        btnGuardar.value = 'Registrar'
        btnFuncion.value = registrar

    } else {
        console.log('editar')
        const res = await Publicacion.get(routes.params.id)
        const publicacion = { ...res.data }

        publicacion.demanda = {
            vehiculo: publicacion.vehiculo ? publicacion.vehiculo._id : ''
        }

        publicacion.oferta = {
            cochera: publicacion.cochera ? publicacion.cochera._id : '',
            precio: publicacion.cochera ? publicacion.precio : ''
        }

        // Convertir las horas a formato date y time
        publicacion.ini = fechaHora(publicacion.ini)
        publicacion.fin = fechaHora(publicacion.fin)
        publicacion.vencimiento = fechaHora(publicacion.vencimiento)

        publi.value = publicacion

        // TODO Agregar la opción del estado
    }

    // Carga de opciones de cochera
    const res = await Cochera.obtenerDelPropietario()
    cocherasPropietario.value = res.data

    // Carga de opciones de vehículo
    const res2 = await Vehiculo.obtenerDelPropietario()
    vehiculosPropietario.value = res2.data

})

</script>

