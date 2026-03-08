<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    let { children } = $props();
</script>

<div class="relative min-h-screen bg-slate-900 overflow-hidden flex flex-col">
    <!-- Background effects -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black -z-10"></div>
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-20"></div>

    <main class="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center relative z-10">
        {@render children()}
    </main>
</div>
