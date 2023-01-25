<script>
  import { getContext } from 'svelte';
  
  import Hicon from "$lib/Hicon.svelte";
  import Playground                           from "$lib/components/surrealUI/Playground.svelte"

  export let connection = {}
  export let connection_key = ""
  const func                        = getContext('func')
  const connection_form_state       = getContext('connection_form_state');
  const connection_form_in_add_mode = getContext('connection_form_in_add_mode');
  const playgroundNodeName          = getContext('playgroundNodeName');  
   
  let   hovered         = false   
  $: show = calculateShow($connection_form_state,$connection_form_in_add_mode )

  function calculateShow(state, add_mode){
    if (state.name) {
      return !( ( add_mode === false ) &&  ( state.name === connection_key ) )
    }
    return true
  }
$: console.table(connection)
</script>
{#if show}

<span on:mouseover="{()=>{hovered=true}}" on:mouseout="{()=>{hovered=false}}" class="flex flex-row flex-nowrap justify-between h-6 items-center space-x-1.5 hover:bg-base-300 px-2">
  <span class=""><Hicon iname="chevron-right" iclass="w-2 h-2" tooltip="Browse"/></span>
  <span class="w-full">{connection_key}</span>
  <span  class:hidden="{!hovered}" on:click="{()=> { func.fn_connection_showEditForm(connection)  } }" class=""><Hicon iname="pencil" iclass="w-3 h-3" tooltip="Edit Connection Details" /></span>
  <span class:hidden="{!hovered}"  on:click="{()=> { func.delC(connection_key) } }" class=""><Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="Delete Connection" /></span>
</span>

  <Playground {connection_key}  playground="{ connection[playgroundNodeName] }"/>

{/if}


       



        