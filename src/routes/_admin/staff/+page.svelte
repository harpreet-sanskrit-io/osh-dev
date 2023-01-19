<script>
    import { db } from "$lib/db"
    import { onMount } from "svelte"
    let users = []
    let _u = {}
    let show_edit = false
    let show_add  = false


    async function get() {
      try {
      show_edit = false
      show_add  = false
      console.info("users before fetch: ",users)  
      await db.srdb.select("user").then( data => {users = data} )
      console.info("users after fetch: ", users)
      } catch(e) {
        console.error(e);
      }
    }

    async function update(){    
    try {
      let upd = await db.srdb.query(
        'UPDATE $e SET pass=crypto::argon2::generate($p),company=$c,role=$r,name=$n;', 
        {
        	c:_u.company ,
          r:_u.role   ,
          n:_u.name   ,
          e:_u.id  , 
          p:_u.pass
        }
      )
      console.info("Success in update user: ", upd)
      get();
    } catch(e) {
      console.error("Error in update user: ", e)
    }
    }



    async function add(){    
    try {
      let crt = await db.srdb.query(
        'CREATE type::thing("user", string::lowercase(string::trim($e))) SET pass=crypto::argon2::generate($p),company=$c,role=$r,name=$n;', 
        {
        	c:_u.company ,
          r:_u.role   ,
          n:_u.name   ,
          e:_u.email  , 
          p:_u.pass
        }
      )
      console.info("Success in add user: ", crt)
      get();
    } catch(e) {
      console.error("Error in add user: ", e)
    }
    }

   async function del(){    
    try {
      await db.srdb.delete(_u.id)
      console.info("Success in delete user: ", _u.id)
      get();
    } catch(e) {
      console.error("Error in delete user: ", e)
    }
    }

  onMount(() => {
    get()
  })

</script>

 <!-- Report -->
<div class="overflow-x-auto" class:hidden="{show_edit || show_add}">
  <table class="table table-zebra w-full table-compact">
    <!-- head -->
    <thead>
      <tr>
        <th>Name</th>
        <th>Company</th>
        <th>Role</th>
        <th>ID</th>
        <th><button class="btn  btn-xs btn-outline" on:click="{() => {_u = {} ; show_add = true }}">Add</button> </th>
      </tr>
    </thead>
    <tbody>
      
      {#each users as u (u.id)}
      <tr>
        <td>{u.name}</td>
        <td>{u.company}</td>
        <td>{u.role}</td>
        <td>{u.id}</td>
        <td><button class="btn btn-xs  btn-outline" on:click="{() => {_u = u ; _u.pass=undefined; show_edit = true }}" >Edit</button></td>
      </tr>
      {/each}

    </tbody>
  </table>
</div>


<!-- Add Form -->
<div class="hero min-h-screen bg-base-200" class:hidden="{! show_add}">
    <div class="hero-content text-center">
        <div class="max-w-md lg:max-w-lg" >
            <h1 class="text-3xl font-bold">Add User !</h1>
            <p class="py-4">Email Id should be unique.</p>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label"><span class="label-text">Email</span></label>
                        <input type="text" placeholder="email" class="input input-bordered" bind:value={_u.email} />
                    </div>                
                    <div class="form-control">
                        <label class="label"><span class="label-text">Name</span></label>
                        <input type="text" placeholder="name" class="input input-bordered" bind:value={_u.name} />
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text">Company</span></label>
                        <input type="text" placeholder="company" class="input input-bordered" bind:value={_u.company} />
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text">Role</span></label>
                        <input type="text" placeholder="role" class="input input-bordered" bind:value={_u.role} />
                    </div>   
                    <div class="form-control">
                        <label class="label"><span class="label-text">Password</span></label>
                        <input type="text" placeholder="password" class="input input-bordered" bind:value={_u.pass} />
                    </div>  
 
                    <div class="form-control mt-6">
                        <button class="btn btn-primary" on:click="{add}">Add</button>  
                        <button class="btn btn-secondary" on:click="{() => { show_add = false; get() }}">Cancel</button>                                                  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Add Form -->
<div class="hero min-h-screen bg-base-200" class:hidden="{! show_edit}">
    <div class="hero-content text-center">
        <div class="max-w-md" >
            <h1 class="text-3xl font-bold">Edit User !</h1>
            <p class="py-4">{_u.id}</p>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label"><span class="label-text">Name</span></label>
                        <input type="text" placeholder="name" class="input input-bordered" bind:value={_u.name} />
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text">Company</span></label>
                        <input type="text" placeholder="company" class="input input-bordered" bind:value={_u.company} />
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text">Role</span></label>
                        <input type="text" placeholder="role" class="input input-bordered" bind:value={_u.role} />
                    </div>  
                    <div class="form-control">
                        <label class="label"><span class="label-text">Password</span></label>
                        <input type="text" placeholder="password" class="input input-bordered" bind:value={_u.pass} />
                    </div>                   
 
                    <div class="form-control mt-6">
                        <button class="btn btn-primary" on:click="{update}">Update</button>
                    </div>
                    
                    <div class="form-control mt-2">
                      <button class="btn btn-secondary" on:click="{() => { show_edit = false ; get() }}">Cancel</button>
                    </div> 
                    
                    <div class="form-control mt-6">
                      <button class="btn btn-secondary" on:click="{del}">Delete</button>
                    </div> 

                </div>
            </div>
        </div>
    </div>
</div>