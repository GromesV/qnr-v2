<script>
    import { Checkbox } from 'flowbite-svelte'
    import { Radio } from 'flowbite-svelte'
    import { Textarea, Label, ButtonGroup, InputAddon, Input } from 'flowbite-svelte'
    import { data } from './stores.js';

    export let question;
    
    // $: console.log(data);

</script>

<div class="grow">
{#if question}
    {#if question.isClosed}
        <div class="flex flex-col justify-start m-1 p-1">
            {#if question.type=='s'}
                <div class="mb-5">
                    {#each question.children as child (question.name + "_" + child.code)}
                        <Radio name="question.name" class="m-1 p-1 font-normal" bind:group={data[question.name]} value={child.code} >{child.text}</Radio>
                    {/each}
                </div>  
            {/if}
            {#if question.type=='m'}
                <div class="mb-5">
                    {#each question.children as child (question.name + "_" + child.code)}
                        <Checkbox class="m-1 p-1 font-normal" bind:group={data[question.name]} value={child.code} >{child.text}</Checkbox>
                    {/each}
                </div>
            {/if}
        </div>
    {:else if !question.isClosed}
        <div class=" m-1 p-1">
            {#if question.type=='o'}
                <!-- <Label for="textarea-id" class="mb-2">Your message</Label> -->
                <Textarea class ="mb-5" id="textarea-id" bind:value={data[question.name]} placeholder="Input text here" rows="4" name="message"/>
            {/if}
            {#if question.type=='r'}
                <div class= "mb-5 ">
                    <!-- <Label class="mb-2" for="input-addon-sm">Large additional text</Label> -->
                    <ButtonGroup size="sm" class="w-full md:w-1/5">
                    <!-- <InputAddon>@</InputAddon> -->
                    <Input id="input-addon-sm" bind:value={data[question.name]} type="email" placeholder="" />
                    <InputAddon>Year</InputAddon>
                    </ButtonGroup>
                </div>
            {/if}
        </div>
    {:else}
        <p>Error no answers</p>
    {/if}
{:else}
    <p>Error no question</p>
{/if}

</div>



 