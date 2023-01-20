<script>
  import { page } from '$app/stores';
  import {db} from "$lib/db";
   import { goto } from '$app/navigation';
</script>



<div class="sticky bottom-2  p-5 px-6 m-2   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer">
    
    <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
            </path>
        </svg>
    </div>
    
    <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    </div>
    

            <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
    </div>

   
 


    <div class="flex flex-col items-center" on:click="{() => {goto('/login/')}   }">
        <div class="absolute bottom-4 right-4 shadow-2xl text-center flex items-center justify-center rounded-full w-8 h-8 p-0 text-white transition ease-in duration-200 hover:text-blue-400 text-red-400"
        class:text-green-600="{$db.email.length > 0}"
        >
        
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
        </svg>
      
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50"
            class:hidden="{$db.email.length > 0}"
            ></span>
        
        
        </div>
    </div>


</div>
















<!--
<footer class="hidden">
<div class="btm-nav btm-nav-xs text-base-100">
  <a href="/" class="bg-primary-focus" class:active="{$page.url.pathname === '/'}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  </a>
  <a href="/_admin" class="bg-primary-focus" class:active="{$page.url.pathname.indexOf("/_admin") === 0}" >Admin</a>
</div>
</footer>

-->