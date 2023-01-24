<script>
   import { getContext } from 'svelte';
   import Hicon from "$lib/Hicon.svelte";
   const func        = getContext('func');

   export let tab = {}
   export let connection = {}
   let hovered = false
  $: console.table(tab)
</script>


<span on:mouseover="{()=>{hovered=true}}" on:mouseout="{()=>{hovered=false}}" class:text-primary="{hovered}" class="flex flex-row flex-nowrap justify-between h-6 pl-10 pr-2 items-center space-x-1.5 hover:bg-base-200">
  <Hicon iname="surreal" iclass="w-3 h-3" tooltip="click to open." />
  <span class="cursor-pointer w-full">{tab.name}</span>
  <span on:click="{()=>func.fn_component_deletePlayTab(tab,connection)}" class:hidden="{!hovered}" class="cursor-pointer">
    <Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="Delete Command Tab." />
  </span>
</span>


       



        