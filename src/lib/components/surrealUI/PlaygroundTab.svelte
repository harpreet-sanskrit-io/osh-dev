<script>
   import { getContext } from 'svelte';
   import Hicon from "$lib/Hicon.svelte";
   const func        = getContext('func');

  export let connection_key = ""
  export let playground_key = ""
  export let playgroundTab_key = ""
  export let playgroundTab  = []

  let hovered = false
  $: console.table(playgroundTab)
  $: console.log("playgroundTab_key: ", playgroundTab_key)
  
</script>


<span on:mouseover="{()=>{hovered=true}}" on:mouseout="{()=>{hovered=false}}" class:text-primary="{hovered}" class="flex flex-row flex-nowrap justify-between h-6 pl-10 pr-2 items-center space-x-1.5 hover:bg-base-200">
  <Hicon iname="surreal" iclass="w-3 h-3" tooltip="click to open." />
  <span class="cursor-pointer w-full">{playgroundTab_key}</span>
  <span on:click="{()=>func.fn_playground_deleteTab(playgroundTab_key,connection_key)}" class:hidden="{!hovered}" class="cursor-pointer">
    <Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="Delete Command Tab." />
  </span>
</span>


       



        