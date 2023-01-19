<script>
  import { onMount } from "svelte"
  import { afterNavigate } from "$app/navigation"

  import Nav from "$lib/Nav.svelte"
  import Footer from "$lib/Footer.svelte"
  import Sidemenu from "$lib/Sidemenu.svelte"
  import { page } from '$app/stores';
  import "../app.css";

  let drawercontent
  let drawerContentScrollY = 0
  function parseContentScroll() {
    drawerContentScrollY = drawercontent.scrollTop
  }

  onMount(() => {
    parseContentScroll()


  })

  afterNavigate(() => {
    drawercontent.scrollTop = 0
  })

  let checked = ""
  function closeDrawer() {
    checked = ""
  }

  function openDrawer() {
    checked = true
  }
 
</script>



<div class="bg-base-100 drawer" class:drawer-mobile="{!$page.url.pathname}">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked />
  <!-- drawer content-->
  <div 
      bind:this={drawercontent} 
      on:scroll={parseContentScroll} 
      class="drawer-content scroll-smooth" 
     
  >
       <!-- Nav bar -->
       <Nav  {drawerContentScrollY}  fixedsidebar='{!$page.url.pathname}' />
       <!--Content-->
       <div class="w-full min-h-full from-primary to-secondary bg-gradient-to-r  -mt-16 pt-20 pb-2 px-2">
       <slot/>
       </div>
       <!--Footer-->
       
       <Footer/>
  </div>
  <!--Drawer Side-->
  <div class="drawer-side scroll-smooth">
    <label for="my-drawer-3" class="drawer-overlay"></label> 
    <Sidemenu {closeDrawer}/>    
  </div>

</div>






