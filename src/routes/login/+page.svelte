<div class="pt-6">
  <div class="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5 gap-y-3">


<div class="form-control">
  <label class="input-group">
    <span class="text-primary-focus"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
</svg>
</span>
    <input type="text" placeholder="mail@domain.com" class="input input-bordered" bind:value={email} disabled="{$db.email.length > 0 }"/>
  </label>
</div>
<!---->
<div class="form-control" class:hidden="{$db.email}">
  <label class="input-group">
      <span class="text-primary-focus"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
</svg>
</span>
      <input type="text" placeholder="password" class="input input-bordered" bind:value={password} />
  </label>
</div>
<!---->
<div class="form-control">
  <button class="btn btn-secondary" on:click="{logout}" class:hidden="{! $db.email}">Logout</button>
  <button class="btn btn-primary" on:click="{login}" class:hidden="{$db.email}">Login</button>
  
</div>
</div>
</div>




<script>
    import { db } from "$lib/db.js"


    // variables
    let email = $db.email
    let password = "12345678"
    // Functions
    async function login() {
        await db.signin({
            NS: 'main',
            DB: 'main',
            SC: 'users',
            email: email,
            pass: password,
        }
        )
    }
    // Functions
    async function logout() {
        await db.signout()
    }
</script>