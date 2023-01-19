
<script>
export let closeDrawer;
import {db} from "$lib/db";
</script>
  

  <ul class="menu p-4 w-80 bg-base-100 py-2">


      <li><a id="main_login_link_internal" href="/login" on:click={closeDrawer} class:hidden="{$db.email}" >Login</a></li>
      <li><a id="main_accountlogin_link_internal" href="/login" on:click={closeDrawer} class:hidden="{$db.email.length === 0}">{$db.email}</a></li>
      <li><a href="/" on:click={closeDrawer}>Home</a></li>
      <li><a href="/app" on:click={closeDrawer}>App</a></li>
      <li><a href="/_admin" on:click={closeDrawer}>Admin</a></li>

      <li class="menu-title"><span>App</span></li>
      <li><a href="/app/_admin" on:click={closeDrawer}>Admin</a></li>
      <li><a href="/app/oshcross" on:click={closeDrawer}>OSH</a></li>
      <li><a href="/app/kite" on:click={closeDrawer}>Kite</a></li>
  <!--
        <li class="menu-title"><span>App 2</span></li>
      <li><a href="/app/a/company1" on:click={closeDrawer}>company1</a></li>
      <li><a href="/app/a/company2" on:click={closeDrawer}>company2</a></li>
      <li><a href="/app/a/company3" on:click={closeDrawer}>company3</a></li>
      <li class="menu-title"><span>App 3</span></li>
      <li><a href="/app/company4" on:click={closeDrawer}>company4</a></li>
      <li><a href="/app/company5" on:click={closeDrawer}>company5</a></li>
      <li><a href="/app/company6" on:click={closeDrawer}>company6</a></li>
      <li class="menu-title"><span>App 4</span></li>
      <li><a href="/app/b/company7" on:click={closeDrawer}>company7</a></li>
      <li><a href="/app/b/company8" on:click={closeDrawer}>company8</a></li>
      <li><a href="/app/b/company9" on:click={closeDrawer}>company9</a></li>
      
  -->
    
</ul>
  