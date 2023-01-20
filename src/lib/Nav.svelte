<script>
  import { page } from '$app/stores'
  import {db} from "$lib/db"
  import { goto } from '$app/navigation'
  export let title = "Zero."
  export let back  = ''
  export let top = false
</script>



<div class="fixed top-0  p-3 m-0 z-30 w-full flex items-center justify-between   bg-primary  text-base-100 cursor-pointer"
  class:z-40="{top}"
>

    
<div  on:click="{() => {goto(back)}   }" class="flex flex-col items-center transition ease-in duration-200 hover:text-accent-focus " class:hidden="{!back}">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
</div>
    


   
     <div class="flex flex-col items-center transition ease-in duration-200 hover:text-accent-focus font-bold ">
      {title}
    </div>


    <div class="flex flex-col  items-center" on:click="{() => {goto('/login/')}   }">
        <div class="absolute bottom-2 right-4 shadow-2xl text-center flex items-center justify-center rounded-full w-8 h-8 p-0  transition ease-in duration-200 hover:text-accent-focus text-accent-focus"
        class:text-success="{$db.email.length > 0}"
        >
        
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
        </svg>
      
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full border-2 opacity-50"
            class:hidden="{$db.email.length > 0}"
            ></span>
        
        
        </div>
    </div>


</div>







