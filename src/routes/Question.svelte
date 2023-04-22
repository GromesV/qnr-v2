<script>
    import {  Heading } from 'flowbite-svelte'
    export let text;

</script>
  


<div class="flex flex-col justify-start m-1 p-1">
    <Heading tag="h1" class="mb-4" customSize="text-lg font-semibold  md:text-xl  lg:text-2xl">{text}</Heading>
</div>


 