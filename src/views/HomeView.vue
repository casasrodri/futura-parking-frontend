<script setup>
</script>

<template>
  <u>Menú</u>

  <ul>
    <li><router-link :to="{ name: 'cocherasList' }">Cocheras</router-link></li>
    <li><router-link :to="{ name: 'vehiculosList' }">Vehiculos</router-link></li>
    <li><router-link :to="{ name: 'publicacionesList' }">Publicaciones</router-link></li>
    <!-- <li><router-link to="/estacionamientos">Estacionamientos</router-link></li>
    <li><router-link to="/reservas">Reservas</router-link></li>
    <li><router-link to="/vehiculos">Vehículos</router-link></li>
    <li><router-link to="/zonas">Zonas</router-link></li> -->
  </ul>
</template>
