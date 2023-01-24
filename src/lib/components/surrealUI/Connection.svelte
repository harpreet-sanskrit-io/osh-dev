<script>
   import { getContext } from 'svelte';
   import Hicon from "$lib/Hicon.svelte";
   import Playground                           from "$lib/components/surrealUI/Playground.svelte"

   export let connection = {}
   const func            = getContext('func')
   
   let   hovered         = false   
</script>


<span on:mouseover="{()=>{hovered=true}}" on:mouseout="{()=>{hovered=false}}" class="flex flex-row flex-nowrap justify-between h-6 items-center space-x-1.5 hover:bg-base-300 px-2">
  <span class=""><Hicon iname="chevron-right" iclass="w-2 h-2" tooltip="Browse"/></span>
  <span class="w-full">{connection.name}</span>
  <span  class:hidden="{!hovered}" on:click="{()=> { func.setEditC(connection)  } }" class=""><Hicon iname="pencil" iclass="w-3 h-3" tooltip="Edit Connection Details" /></span>
  <span class:hidden="{!hovered}"  on:click="{()=> { func.delC(connection.name) } }" class=""><Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="Delete Connection" /></span>
</span>
<Playground {connection}/>


       



        