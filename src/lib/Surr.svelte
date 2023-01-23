<script>
    import Hicon from "$lib/Hicon.svelte"
    let show = false;

    let url = "zero-app.fly.dev";
    let user = "root";
    let creds = "signalzero";

    let ns = "main";
    let db = "main";

    let tab = 1;
    let command = "INFO FOR KV; INFO FOR NS; INFO FOR DB; SELECT * FROM user;";
    let result = "";
    let status = "";

    let progress = false;
    let connection=true;



    function timeout(s) {
        return new Promise(resolve => setTimeout(resolve, s * 1000));
    }

    async function run() {
        result = "";
        progress = true;
        status = '#Running: ' + command;
        tab = 3;
        // await timeout(3);
        try {
            console.info("Calling CLI");
            let res = await fetch("https://"+  url  + "/sql", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'NS': ns,
                    'DB': db,
                    'Authorization': 'Basic ' + btoa(user + ":" + creds),
                    'Content-Type': 'text/plain'
                },
                body: command
            });

            console.info("Success: ", res);
            res.json().then((d) => { result = d });
            progress = false;
            status = "Bingo! Check Result Tab for database response.";
            tab = 2;

        } catch (e) {
            console.error("Error: ", e);
            status = e;
            progress = false;
            tab = 3;

        }

    }

</script>






            <div class="flex flex-col gap-1 py-4  w-full max-w-md">
                    <label class="label cursor-pointer w-24">
                      <span class="label-text text-base-100">Show</span>
                      <input type="checkbox" class="toggle" bind:checked="{connection}" />
                    </label>

                    <label class="input-group" class:hidden="{!connection}">
                        <span class="border-r border-red-600">https://</span>
                        <input bind:value="{url}" type="text" placeholder="https://db.hosting.com/sql" class="input input-bordered w-full" />
                        <span>/sql</span>
                    </label>

                    <label class="input-group"  class:hidden="{!connection}">
                      <span class="border-r border-red-600"><Hicon iname="user" tooltip="root or login user"/></span>
                      <input bind:value="{user}" type="text" placeholder="USER" class="input input-bordered w-full" />
                    </label>

                    <label class="input-group" class:hidden="{!connection}">
                        <span class="border-r border-red-600"><Hicon iname="key" tooltip="password"/></span>
                        <input bind:value="{creds}" type="password" placeholder="PASSWORD"  class="input input-bordered w-full" />
                    </label>

                    <label class="input-group" class:hidden="{!connection}">
                       <span class="border-r border-green-600"><Hicon iname="building_office" tooltip="namespace"/></span>
                        <input bind:value="{ns}" type="text" placeholder="NAMESPACE" class="input input-bordered w-full" />
                    </label>

                    <label class="input-group" class:hidden="{!connection}">
                        <span class="border-r border-green-600"><Hicon iname="circle_stack" tooltip="database"/></span>
                        <input bind:value="{db}" type="text" placeholder="DATABASE"  class="input input-bordered w-full" />
                    </label>            
            </div>
   


       <!--
        {#each Object.values(c) as con (con.name)}
        {@const selected_con = (activeTab.connection===con.name) }
         <span class="flex flex-row flex-nowrap justify-between h-6 items-center space-x-1.5 hover:bg-primary px-2">
          <span class=""><Hicon iname="chevron-right" iclass="w-2 h-2" tooltip="Browse"/></span>
          <span class="w-full">{con.name}</span>
          <span  class:hidden="{!selected_con}" class=""><Hicon iname="document-plus" iclass="w-3 h-3" tooltip="Add New Command Tab" /></span>
          <span  class:hidden="{!selected_con}" on:click="{()=>{show_c_form = true;add_c = false; c_form = {...con} }}" class=""><Hicon iname="pencil" iclass="w-3 h-3" tooltip="Edit Connection Details" /></span>
          <span class:hidden="{!selected_con}" on:click="{()=>{delC(con.name)}}" class=""><Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="Delete Connection" /></span>
         </span>
         <span class="flex flex-col w-full pl-6 pr-2">
         {#each Object.values(con.playtab) as pt (pt.name)}
         {@const selected = (activeTab.type==='playtab' && activeTab.name===pt.name && activeTab.connection===con.name) }
         <span class:text-primary="{selected}" class="flex flex-row flex-nowrap justify-between h-6 items-center space-x-1.5 hover:bg-base-200">
           <span class=""><Hicon iname="document-plus" iclass="w-3 h-3" tooltip="Doble click to open." /></span>
           <span class="w-full"  on:click="{()=> {activeTab = {type:'playtab', name:pt.name, connection:con.name} }}">{pt.name}</span>
           <span class:hidden="{!selected}"><Hicon iname="trash" iclass="w-3 h-3 text-error" tooltip="Delete Command Tab." /></span>
         </span>
         {/each}

         
         </span>
        {/each}

        -->


