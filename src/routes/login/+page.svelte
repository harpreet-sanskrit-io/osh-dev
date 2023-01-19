<script>
    import { db } from "$lib/db"

    let email = $db.email;
    let password = "12345678";
    let showRegister = false;
    let cpassword = "";


    async function login() {
        await db.signin({
            NS: 'main',
            DB: 'main',
            SC: 'users',
            email: email,
            pass: password,
        }
        );
    }

    async function register() {
      if (cpassword != password) {
        console.info("Password not matched.");
        return;
      }
        try {
        await db.signup({
            NS: 'main',
            DB: 'main',
            SC: 'users',
            email: email,
            pass: password,
        }
        );
        hidereg();
        } catch(e){
          console.error(e);
        }
    }

    async function logout() {
        await db.signout();
    }

    function showreg(){
      showRegister = true;
    }

    function hidereg(){
      showRegister = false;
    }

</script>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-3xl font-bold">Welcome to Vault@zero !</h1>
            <p class="py-4">Register, Login, Logout here.</p>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
            <span class="label-text">Email</span>
          </label>
                        <input type="text" placeholder="email" class="input input-bordered" bind:value={email} disabled="{$db.email.length > 0 }"/>
                    </div>
                    <div class="form-control" class:hidden="{$db.email}">
                        <label class="label">
            <span class="label-text">Password</span>
          </label>
                        <input type="text" placeholder="password" class="input input-bordered" bind:value={password} />
          <label class="label" class:hidden={showRegister}>
            <span on:click="{showreg}" class="label-text-alt link link-hover text-base link-accent">New? Register here.</span>
          </label>
                    </div>
                    {#if showRegister}
                    <div class="form-control">
                        <label class="label">
            <span class="label-text">Confirm Password</span>
          </label>
                        <input type="text" placeholder="password" class="input input-bordered" bind:value={cpassword} />
          <label class="label" class:hidden={!showRegister}>
            <span on:click="{hidereg}" class="label-text-alt link link-hover text-base link-accent">Already regitered? Login here.</span>
          </label>
                    </div>
                    {/if}
                    <div class="form-control mt-6">

                        <button class="btn btn-secondary" on:click="{logout}" class:hidden="{! $db.email}">Logout</button>                         
                        <button class="btn btn-accent" on:click="{register}"   class:hidden="{!showRegister}">Register</button> 
                        <button class="btn btn-primary" on:click="{login}"   class:hidden="{showRegister || $db.email}">Login</button> 
                         
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>