<script>
    import TopInfoBar from './TopInfoBar.svelte';
    import Question from './Question.svelte';
    import Instructions from './Instructions.svelte';
    import Answers from './Answers.svelte';
    import Controls from './Controls.svelte';
    import qnr from '../qnr/qnr';
    import { data } from './stores.js';

    let question = {}
    let errors = [];
    let errorActive = false;

    $: errorActive = errors.length > 0;

    function checkForError(qst, data){
        if (Object.keys(qst).length===0)
            return false;
        if (data===undefined || data===null)
            return false;
        switch (qst.type) {
            case 's':
                return data === '';
                break;
            case 'm':
                return (Array.isArray(data) && data.length===0);
                break;
            case 'o':
                return data === '';
                break;
            case 'r':
                return data === '';
                break;
        
            default:
                throw new Error('uknown question type');
                break;
        }
    }

    function raiseError(qName){
        //napraviti objekat za erorrs koji drzi greske
        errors.push(qName);
        errors = errors;
    }

    function cleanError(qName){
        //napraviti objekat za erorrs koji drzi greske
        errors = [];
    }

    function handleDirection(event) {
        switch (event.detail.flow) {
            case 'next':
                let qdata = data[question.name];
                if (checkForError(question, qdata)){
                    raiseError(question.name);
                    return;
                }
                else
                    cleanError(question.name);
                qnr.next();
                break;
            case 'back':
                qnr.prev();
                break;
            default:
                break;
        }
        question = qnr.currentNode;
	}

</script>
<div class="flex justify-center h-full" >
    <div class="flex flex-col w-full md:w-1/2  md:h-4/6 m-3 p-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
        <TopInfoBar {...question}/>
        <Question {...question}/>
        <Instructions {...question} errorActive={errorActive}/>
        <Answers {question}/>
        <Controls on:direction={handleDirection}/>
    </div>
</div>

<style>
    :global(body) {
        height: 100vh;
    }
</style>