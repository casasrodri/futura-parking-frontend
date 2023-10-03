<script setup>
</script>

<template>
  <u>Menú</u>

  <ul>
    <li>
      <RouterLink :to="{ name: 'cocherasList' }">Cocheras</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'vehiculosList' }">Vehiculos</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'publicacionesList' }">Publicaciones</RouterLink>
    </li>
    <!-- <li><RouterLink to="/estacionamientos">Estacionamientos</RouterLink></li>
    <li><RouterLink to="/reservas">Reservas</RouterLink></li>
    <li><RouterLink to="/vehiculos">Vehículos</RouterLink></li>
    <li><RouterLink to="/zonas">Zonas</RouterLink></li> -->
</ul></template>
