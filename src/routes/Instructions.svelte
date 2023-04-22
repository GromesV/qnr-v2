<script>
    import { fade } from 'svelte/transition';

    export let instructions;
    export let errorActive;

</script>
  

<div class="flex flex-col justify-start m-1 p-1">
    <!-- {#if errorActive}
        <p transition:fade= "{{delay: 150, duration: 600}}"
            class='mb-3 md:text-base bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 rounded-lg border-red-300 dark:border-red-800 p-3'>
            {instructions}
        </p>

    {:else}
	    <p class='mb-3 md:text-base text-slate-500 p-3'>{instructions}</p>
    {/if} -->

    <p class="{errorActive === true 
            ? 'mb-3 md:text-base bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 rounded-lg border-red-300 dark:border-red-800 font-medium p-1' 
            : 'mb-3 md:text-base text-slate-500 p-1'}"  
            size="base">{instructions}</p>
</div>


<style>
    .selected {
        background-color: red;
    }
</style>