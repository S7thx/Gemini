<script setup>
import HomeView from './views/HomeView.vue';
</script>
<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/videos">Videos</router-link>
        <router-link to="/imagens">Imagens</router-link>
        <router-link to="/tabela">Tabela</router-link>
    </nav>
    <router-view/>
</template>