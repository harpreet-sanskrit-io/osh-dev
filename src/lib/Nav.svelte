<script>
  export let drawerContentScrollY = 0;
  export let fixedsidebar = false;

  $: switchNavbarStyle = drawerContentScrollY > 40 ? true : false
</script>
<div class="navbar w-full  sticky top-0 z-30 bg-opacity-90 backdrop-blur transition-all duration-100 {fixedsidebar ? 'sm:block lg:hidden' : ''   }"
     class:bg-base-100 = "{switchNavbarStyle || fixedsidebar}"
     class:text-base-content = "{switchNavbarStyle || fixedsidebar}"
     class:shadow-sm = "{switchNavbarStyle}"
     class:text-primary-content = "{!switchNavbarStyle}"
    >
  <div class="flex-none">
      <span class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)] {fixedsidebar ? 'sm:block lg:hidden' : "" }" data-tip="Menu" >
        <label for="my-drawer-3" class="btn btn-square btn-ghost drawer-button">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </label>
      </span>
  </div>
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl lowercase text-primary" class:hidden="{!switchNavbarStyle || fixedsidebar}" href="/">Zero.</a>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
</div>
