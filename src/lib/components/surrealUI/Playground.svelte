<script>
   import { getContext }                          from 'svelte';
   import Hicon                                   from "$lib/Hicon.svelte"
   import PlaygroundTab                           from "$lib/components/surrealUI/PlaygroundTab.svelte"

   const func        = getContext('func');

   export let playground = {}
   export let connection_key = ""
   const playground_key = "playtab"
   let expand  = false 
   let hovered = false

   // Made reactive
   $: has_child = hasChild(playground)

   function hasChild(playground){
     try {
       return (Object.keys(playground).length > 0)
     } catch (e){
       console.info("no children", e)
     }
     return false
   }
   function fn_local_toggleItems(){
         expand=!expand
   }

   $: playgroundEntries =  Object.entries(playground)
   $: console.table(playground)
</script>


<span class="flex flex-col w-full">
  <span  on:mouseover="{()=>{hovered=true}}" on:mouseout="{()=>{hovered=false}}" class="flex flex-row flex-nowrap justify-center h-6 items-center space-x-1.5 pr-2 pl-5 hover:bg-base-200"  >
    <Hicon iname="play" fill="{!expand}" iclass="w-3 h-3 {(expand ? has_child ? 'text-success' : 'text-error' : 'text-info') }" tooltip="toggle playground scripts" />
      <span on:click="{fn_local_toggleItems}" class="w-full cursor-pointer">Playgound</span>
      <span class="cursor-pointer" on:click="{()=>func.fn_playground_addTab(connection_key)}" class:hidden="{!hovered}">
        <Hicon iname="document-plus" iclass="w-3 h-3" tooltip="+ playground file" />
      </span>      
      <span class="cursor-pointer" on:click="{()=>func.fn_playground_deleteAllTabs(connection_key)}" class:hidden="{!hovered || !has_child}">
        <Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="- all playground files" />
      </span>
  </span>
  
  {#if ( has_child && expand ) }
    
    {#each playgroundEntries as playgroundTab ( playgroundTab[0] )  }
       <span  >
       <PlaygroundTab  {connection_key} {playground_key}  playgroundTab_key="{playgroundTab[0]}"  playgroundTab="{playgroundTab[1]}"  /> 
      </span>
    {/each}
     
  {/if}
</span>

       




        