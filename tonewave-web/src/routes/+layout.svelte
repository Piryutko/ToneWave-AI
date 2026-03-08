<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    let { children } = $props();
</script>

<div class="relative min-h-screen bg-[#0A120E] overflow-hidden flex flex-col">
    <!-- SVG Noise Texture -->
    <svg
        class="pointer-events-none fixed isolate z-50 opacity-[0.25] mix-blend-soft-light w-full h-full"
        width="100%"
        height="100%"
    >
        <filter id="noise">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.80"
                numOctaves="4"
                stitchTiles="stitch"
            ></feTurbulence>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>

    <!-- Background northern lights effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
            class="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-teal-500/10 blur-[120px] mix-blend-screen saturate-150"
        ></div>
        <div
            class="absolute top-[30%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#2DD4BF]/10 blur-[150px] mix-blend-screen saturate-150"
        ></div>
        <div
            class="absolute bottom-[0%] left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-700/10 blur-[120px] mix-blend-screen saturate-150"
        ></div>
    </div>

    <!-- Top glass edge -->
    <div
        class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/20 to-transparent"
    ></div>

    <main
        class="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center relative z-10 min-h-screen"
    >
        {@render children()}
    </main>
</div>
