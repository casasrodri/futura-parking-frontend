<template>
    PUBLICACIONES LIST

    <table>
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Observaciones</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Vencimiento</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="publi in publicaciones" :key="publi._id">
                <td>{{ publi.tipo }}</td>
                <td>{{ publi.estado }}</td>
                <td>{{ publi.observaciones }}</td>
                <td>{{ fechaHora(publi.ini) }}</td>
                <td>{{ fechaHora(publi.fin) }}</td>
                <td>{{ fechaHora(publi.vencimiento) }}</td>
                <td>
                    <RouterLink :to="{ path: '/publicaciones/ver/' + publi._id }">
                        Ver
                    </RouterLink>
                    <RouterLink :to="{ path: '/publicaciones/editar/' + publi._id }">
                        Editar
                    </RouterLink>
                </td>
            </tr>
        </tbody>
    </table>

    <RouterLink :to="{ name: 'publicacionesAlta' }">
        Nueva
    </RouterLink>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import { fechaHora } from '../../utils/datetime.js';

const publicaciones = ref()

onMounted(async () => {
    const res = await Publicacion.getAll();
    publicaciones.value = res.data
});

</script>
