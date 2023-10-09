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
    <li>
      <RouterLink :to="{ name: 'conversacionesList' }">Mensajes</RouterLink>
    </li>
  </ul>
</template>
