<script>
   import { getContext } from 'svelte';
   import Hicon from "$lib/Hicon.svelte";
   const connections = getContext( 'connections');
   const activeTab   = getContext( 'activeTab' );
   const func = getContext('func');
</script>


{#if $connections }
        {#each Object.values($connections) as con (con.name)}
        {@const selected_con = ($activeTab.connection===con.name) }
         <span class="flex flex-row flex-nowrap justify-between h-6 items-center space-x-1.5 hover:bg-primary px-2">
          <span class=""><Hicon iname="chevron-right" iclass="w-2 h-2" tooltip="Browse"/></span>
          <span class="w-full">{con.name}</span>
          <span  class:hidden="{!selected_con}" class=""><Hicon iname="document-plus" iclass="w-3 h-3" tooltip="Add New Command Tab" /></span>
          <span  class:hidden="{!selected_con}" on:click="{()=> { func.setEditC(con)  } }" class=""><Hicon iname="pencil" iclass="w-3 h-3" tooltip="Edit Connection Details" /></span>
          <span class:hidden="{!selected_con}"  on:click="{()=> { func.delC(con.name) } }" class=""><Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="Delete Connection" /></span>
         </span>
         <span class="flex flex-col w-full pl-6 pr-2">
         {#if con.playtab}
         {#each Object.values(con.playtab) as pt (pt.name)}
         {
           @const selected = ($activeTab.type==='playtab' && $activeTab.name===pt.name && $activeTab.connection===con.name)          
         }
         {
           @const tab = {type:'playtab', name:pt.name, connection:con.name}         
         }
         <span class:text-primary="{selected}" class="flex flex-row flex-nowrap justify-between h-6 items-center space-x-1.5 hover:bg-base-200">
           <span class=""><Hicon iname="document-plus" iclass="w-3 h-3" tooltip="Doble click to open." /></span>
           <span class="cursor-pointer w-full"  on:click="{()=> { func.setActiveTab( tab ) } }">{pt.name}</span>
           <span class="cursor-pointer" on:click="{()=>func.deleteTab(tab)}" class:hidden="{!selected}"><Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="Delete Command Tab." /></span>
         </span>
         {/each}
         {/if}
         </span>
        {/each}
{/if}

       



        