<script>
    import { Badge } from 'flowbite-svelte';

    export let name;
</script>



<div class="flex flex-row justify-start m-1 p-1 h-10">
    <div>
        <Badge large color="dark">{name}</Badge>
    </div>
</div>

 