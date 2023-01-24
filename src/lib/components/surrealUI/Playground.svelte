<script>
   import { getContext }                          from 'svelte';
   import Hicon                                   from "$lib/Hicon.svelte"
   import PlaygroundTab                           from "$lib/components/surrealUI/PlaygroundTab.svelte"

   const func        = getContext('func');

   export let connection = {}
   let expand  = false 
   let hovered = false

   // Made reactive
   $: has_child = hasChild(connection)

   function hasChild(connection){
     try {
       return (Object.keys(connection.playtab).length > 0)
     } catch (e){
       console.info("no children", e)
     }
     return false
   }
   function fn_local_toggleItems(){
         expand=!expand
   }
   $: console.table(Object.values(connection.playtab))
</script>


<span class="flex flex-col w-full">
  <span  on:mouseover="{()=>{hovered=true}}" on:mouseout="{()=>{hovered=false}}" class="flex flex-row flex-nowrap justify-center h-6 items-center space-x-1.5 pr-2 pl-5 hover:bg-base-200"  >
    <Hicon iname="play" fill="{!expand}" iclass="w-3 h-3 {(expand ? has_child ? 'text-success' : 'text-error' : 'text-info') }" tooltip="toggle playground scripts" />
      <span on:click="{fn_local_toggleItems}" class="w-full cursor-pointer">Playgound</span>
      <span class="cursor-pointer" on:click="{()=>func.fn_component_addPlayTab(connection)}" class:hidden="{!hovered}">
        <Hicon iname="document-plus" iclass="w-3 h-3" tooltip="+ playground file" />
      </span>      
      <span class="cursor-pointer" on:click="{()=>func.fn_component_deletePlayTabs(connection)}" class:hidden="{!hovered || !has_child}">
        <Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="- all playground files" />
      </span>
  </span>
  
  {#if ( has_child && expand ) }
    {#each Object.values(connection.playtab) as tab (tab.name)}
    <PlaygroundTab {tab} {connection}  /> 
    {/each}
  {/if}
</span>

       




        