<script setup>
import { Image, ImageEngineProvider } from "@imageengine/vue";
</script>
<template>

     <div id="png" style="width: 33%;">
        <img width="800px" src="/imagem/img3.jpg" loading="lazy">
        <img width="800px" src="/imagem/image1.jpg" loading="lazy">
        <img width="800px" src="/imagem/image1.jpg" loading="lazy">
    </div>

    <div id="img" style="width: 33%; display: flex;">
        <img width="50%" src="https://th.bing.com/th?id=OIP.hN87iLXD_xAtuM4hjvHFvAHaG4&w=259&h=241&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" loading="lazy" >
        <img width="50%" src="https://th.bing.com/th?id=OIP.2nIrqHsontTaw2vVYsb6HQHaGz&w=260&h=239&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" loading="lazy">
    </div>    
    
    <ImageEngineProvider deliveryAddress="https://r1l8vqwd.dev.cdn.imgeng.in/">
    <Image
          src="/imagem/image1.jpg"
          :attributes="{
            alt: 'test image',
          }"
          :directives="{
              outputFormat: 'webp',
          }"/>
          </ImageEngineProvider>
    
</template>