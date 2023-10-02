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
        <input type="date" id="ini-date" v-model="publi.ini.date" />
        <input type="time" id="ini-time" v-model="publi.ini.time" />

        <br>
        <label for="fin">Fin:</label>
        <input type="date" id="fin-date" v-model="publi.fin.date" />
        <input type="time" id="fin-time" v-model="publi.fin.time" />

        <br>
        <label for="vencimiento">Vencimiento:</label>
        <input type="date" id="vencimiento-date" v-model="publi.vencimiento.date" />
        <input type="time" id="vencimiento-time" v-model="publi.vencimiento.time" />

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
    {{ publi }}
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Publicacion from '../../api/publicaciones.js'

const router = useRouter()
const errores = ref([])
const publi = ref({ tipo: '', oferta: {}, demanda: {}, ini: {}, fin: {}, vencimiento: {} })

const actualizar = async () => {
    alert('Se está actualizando')
    // const res = await Publicacion.update(cochera.value._id, cochera.value)
    // console.log(res)
    alert('Actualizada!!')
    // router.push({ name: 'publicacionesList' })
}

const cocherasPropietario = ref([])
const vehiculosPropietario = ref([])

const registrar = async () => {
    alert('Se está creando la nueva cochera')

    // const nuevaCochera = {
    //     numero: publi.value.numero,
    //     tipo: publi.value.tipo,
    //     observaciones: publi.value.observaciones,
    //     propietario: '6513a457bed50d37c2a7910a' // FIXME: Ver cómo obtener el id del usuario logueado

    // }

    // const res = await Publicacion.create(nuevaCochera)
    // console.log(res)
    alert('Creada!!')
    // router.push({ name: 'publicacionesList' })
}

const btnGuardar = ref('Actualizar')
const btnFuncion = ref(actualizar)
const routes = useRoute()

import Cochera from '../../api/cocheras.js'
import Vehiculo from '../../api/vehiculos.js'

onMounted(async () => {
    if (routes.params.id === 'alta') {
        console.log('alta')
        btnGuardar.value = 'Registrar'
        btnFuncion.value = registrar
    } else {
        console.log('editar')
        const res = await Publicacion.get(routes.params.id)
        publi.value = res.data
    }

    // Carga de opciones de cochera
    const res = await Cochera.obtenerDelPropietario()
    cocherasPropietario.value = res.data

    // Carga de opciones de vehículo
    const res2 = await Vehiculo.obtenerDelPropietario()
    vehiculosPropietario.value = res2.data

})

</script>

