<script>
    import { Button } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';
    import { data } from './stores.js';
    
    const dispatch = createEventDispatcher();

	function command(flow) {
        dispatch('direction', {
			flow: flow
		});
	}
</script>


<div class="flex flex-row justify-around">
    <Button color="light" on:click={() => command('back')}><ion-icon name="chevron-back-outline">.</ion-icon></Button>
    <Button color="light" on:click={() => command('next')}><ion-icon name="chevron-forward-outline">.</ion-icon></Button>
</div>

