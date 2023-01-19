<script>
    import { db } from "$lib/db"
    import { onMount } from "svelte"
    let data = []
    let _d = {}
    let table = "company"
    let show_edit = false
    let show_add  = false


    async function get() {
      try {
      show_edit = false
      show_add  = false
      console.info("data before fetch: ",data)  
      await db.srdb.select(table).then( result => {data = result} )
      console.info("data after fetch: ", data)
      } catch(e) {
        console.error(e);
      }
    }

    async function update(){    
    try {
      
      let upd = await db.srdb.query(
        'UPDATE $r SET name=$n, add=$a, loc=$l;', 
        {
          r:_d.id,
          n:_d.name, 
          a:_d.add, 
          l:_d.loc,
        }
      )
      console.info("Success in update: ", upd)
      get();
    } catch(e) {
      console.error("Error in update: ", e)
    }
    }



    async function add(){    
    try {
      let crt = await db.srdb.query(
        'CREATE type::thing($table, string::lowercase(string::trim($r))) SET name=$n, add=$a, loc=$l;', 
        {
          r:_d.email,
          n:_d.name, 
          a:_d.add, 
          l:_d.loc,
          table: table,
        }
      )
      console.info("Success in add: ", crt)
      get();
    } catch(e) {
      console.error("Error in add: ", e)
    }
    }

   async function del(){    
    try {
      await db.srdb.delete(_d.id)
      console.info("Success in delete user: ", _d.id)
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
        <th>Location</th>
        <th>ID</th>
         <th>Address</th>
        <th><button class="btn  btn-xs btn-outline" on:click="{() => {_d = {} ; show_add = true }}">Add</button> </th>
      </tr>
    </thead>
    <tbody>
      
      {#each data as d (d.id)}
      <tr>
        <td>{d.name}</td>
        <td>{d.loc}</td>
        <td>{d.id}</td>
        <td>{d.add}</td>
        <td><button class="btn btn-xs  btn-outline" on:click="{() => {_d = d ;  show_edit = true }}" >Edit</button></td>
      </tr>
      {/each}

    </tbody>
  </table>
</div>


<!-- Add Form -->
<div class="hero min-h-screen bg-base-200" class:hidden="{! show_add}">
    <div class="hero-content text-center">
        <div class="max-w-md lg:max-w-lg" >
            <h1 class="text-3xl font-bold">Add Company !</h1>
            <p class="py-4">Email Id should be unique.</p>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label"><span class="label-text">Email</span></label>
                        <input type="text" placeholder="email" class="input input-bordered" bind:value={_d.email} />
                    </div>                
                    <div class="form-control">
                        <label class="label"><span class="label-text">Name</span></label>
                        <input type="text" placeholder="name" class="input input-bordered" bind:value={_d.name} />
                    </div>

                    <div class="form-control">
                        <label class="label"><span class="label-text">Location</span></label>
                        <input type="text" placeholder="location" class="input input-bordered" bind:value={_d.loc} />
                    </div>   
                    <div class="form-control">
                        <label class="label"><span class="label-text">Address</span></label>
                        <input type="text" placeholder="address" class="input input-bordered" bind:value={_d.add} />
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


<!-- Edit Form -->
<div class="hero min-h-screen bg-base-200" class:hidden="{! show_edit}">
    <div class="hero-content text-center">
        <div class="max-w-md" >
            <h1 class="text-3xl font-bold">Edit Company !</h1>
            <p class="py-4">{_d.id}</p>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label"><span class="label-text">Name</span></label>
                        <input type="text" placeholder="name" class="input input-bordered" bind:value={_d.name} />
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text">Location</span></label>
                        <input type="text" placeholder="location" class="input input-bordered" bind:value={_d.loc} />
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text">Address</span></label>
                        <input type="text" placeholder="address" class="input input-bordered" bind:value={_d.add} />
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