<script setup>
import { useRenderCount } from "@/Composables/useRenderCount";

useRenderCount();
</script>

<template>
    <div class="spinner"></div>
</template>

<style scoped>
.spinner {
    width: 35px;
    height: 35px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
