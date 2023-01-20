<div class="flex">
  <div class="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5 gap-y-3">


<div class="form-control">
  <label class="input-group input-group-sm">
    <span class="w-24"><Icon src="{LightningBolt}" theme="solid" class="color-gray-900" /></span>
    <input type="text" placeholder="email" class="input input-bordered input-sm" bind:value={email} disabled="{$db.email.length > 0 }"/>
  </label>
</div>
<!---->
<div class="form-control" class:hidden="{$db.email}">
  <label class="input-group input-group-sm">
      <span class="label-text w-24">Password</span>
      <input type="text" placeholder="password" class="input input-bordered input-sm" bind:value={password} />
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
    import { db } from "$lib/db"
    import { Icon } from '@steeze-ui/svelte-icon'
    import { LightningBolt } from '@steeze-ui/heroicons'

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