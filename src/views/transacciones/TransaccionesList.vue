<template>
    <div class="flex flex-col items-center">

        <div class="w-96">
            <!-- {{ publicacion }} -->
            <RouterLink :to="{ path: '/publicaciones/ver/' + 'publicacion._id' }">

                <div id="card"
                    class="m-3 max-w-sm p-5 pb-2 bg-white border border-jade-200 rounded-lg shadow hover:bg-jade-100 hover:border-jade-400 hover:shadow-md flex flex-col items-center justify-center">

                    <h5 id="titulo" class="block mb-2 text-2xl font-bold tracking-tight text-jade-800">
                        <template v-if="true">
                            Alquilaste
                        </template>
                    </h5>

                    <div id="fechas" class="flex flex-row w-full px-5 mt-2 items-center justify-between">
                        <div id="ini" class="flex flex-col items-center justify-between">
                            <div>
                                2023-10-20
                            </div>
                            <div class="text-gray-500 font-light">
                                15:30
                            </div>
                        </div>

                        <div id="flecha" class="text-3xl text-gray-400">
                            <i class="bi bi-arrow-right"></i>
                        </div>

                        <div id="ini" class="flex flex-col items-center justify-between">
                            <div>
                                2023-10-25
                            </div>
                            <div class="text-gray-500 font-light">
                                12:00
                            </div>
                        </div>
                    </div>

                    <h3 id="publicador" class="block mt-3 text-lg font-medium tracking-tight text-gray-900">
                        Pau López Carrizo
                    </h3>



                    <div id="detalles" class="flex flex-row w-full px-2 mt-1 items-center justify-between">
                        <div>
                            <template>
                                <span
                                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full ">demanda</span>
                            </template>

                            <span class="bg-gray-100 text-gray-700 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                                <span class="text-gray-500">
                                    #
                                </span>
                                e7d8
                            </span>
                        </div>

                    </div>
                </div>
            </RouterLink>
        </div>

        <div class=w-96>
            <!-- {{ publicacion }} -->
            <RouterLink :to="{ path: '/publicaciones/ver/' + 'publicacion._id' }">

                <div id="card"
                    class="m-3 max-w-sm p-5 pb-2 bg-white border border-jade-200 rounded-lg shadow hover:bg-jade-100 hover:border-jade-400 hover:shadow-md flex flex-col items-center justify-center">

                    <h5 id="titulo" class="block mb-2 text-2xl font-bold tracking-tight text-jade-800">
                        <template v-if="true">
                            Te alquilaron
                        </template>
                    </h5>

                    <div id="fechas" class="flex flex-row w-full px-5 mt-2 items-center justify-between">
                        <div id="ini" class="flex flex-col items-center justify-between">
                            <div>
                                2023-10-20
                            </div>
                            <div class="text-gray-500 font-light">
                                15:30
                            </div>
                        </div>

                        <div id="flecha" class="text-3xl text-gray-400">
                            <i class="bi bi-arrow-right"></i>
                        </div>

                        <div id="ini" class="flex flex-col items-center justify-between">
                            <div>
                                2023-10-25
                            </div>
                            <div class="text-gray-500 font-light">
                                12:00
                            </div>
                        </div>
                    </div>

                    <h3 id="publicador" class="block mt-3 text-lg font-medium tracking-tight text-gray-900">
                        Héctor Magallanes
                    </h3>



                    <div id="detalles" class="flex flex-row w-full px-2 mt-1 items-center justify-between">
                        <div>
                            <template>
                                <span
                                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full ">demanda</span>
                            </template>

                            <span class="bg-gray-100 text-gray-700 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                                <span class="text-gray-500">
                                    #
                                </span>
                                e7d8
                            </span>
                        </div>

                    </div>
                </div>
            </RouterLink>
        </div>


    </div>
</template>
