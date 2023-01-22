<script>
    import Hicon from "$lib/Hicon.svelte"
    let show = false;

    let url = "https://zero-app.fly.dev/sql";
    let user = "root";
    let creds = "signalzero";

    let ns = "main";
    let db = "main";

    let tab = 1;
    let command = "INFO FOR KV; INFO FOR NS; INFO FOR DB; SELECT * FROM USER;";
    let result = "";
    let status = "";

    let progress = false;



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
            let res = await fetch(url, {
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


{#if show}
<div class="flex flex-col  fixed top-14  z-50 h-5/6 w-full items-center justify-center">
    
    <div class="card w-full h-full max-w-4xl bg-secondary-content">
        
        <div class="card-body relative w-full h-full">
            
            <button on:click="{() => {show=!show}}" class="absolute right-2 top-2 btn btn-primary btn-circle btn-xs btn-outline">
              <Hicon iname="x_mark" tooltip="Close" />
            </button>


            <div class="tabs ">
                <span on:click="{()=>{tab=4}}" class="tab tab-bordered text-primary" class:tab-active="{tab === 4}"><Hicon iname="surreal" tooltip="Connection Details." /></span>
              <!--    <span on:click="{()=>{tab=5}}" class="tab tab-bordered text-primary" class:tab-active="{tab === 5}"><Hicon iname="eye" tooltip="Browse DB!"/></span> -->
                <span on:click="{()=>{tab=1}}" class="tab tab-bordered text-primary" class:tab-active="{tab === 1}"><Hicon iname="command_line" tooltip="Enter Commands."/></span>
                <span on:click="{()=>{tab=2}}" class="tab tab-bordered text-primary" class:tab-active="{tab === 2}"><Hicon iname="cake" tooltip="Resuts." /></span>
                <span on:click="{()=>{tab=3}}" class="tab tab-bordered text-primary" class:tab-active="{tab === 3}"><Hicon iname="information_circle" tooltip="Progress" /></span>
                <span on:click="{run}" class="tab tab-bordered text-primary" class:hidden="{!command}" class:tab-active="{progress}" class:loading="{progress}"><Hicon tooltip="Run!" iname="play"/></span>
            </div>

            <textarea class:hidden="{tab!=1}"          class="textarea textarea-bordered h-full text-xs scroll-smooth" placeholder="Enter Commands Here." bind:value="{command}"></textarea>

            <textarea class:hidden="{tab!=2}" readonly class="textarea textarea-bordered h-full text-xs scroll-smooth" placeholder="Enter Commands Here." value="{result ? JSON.stringify(result,' ', '\t'): 'Enter commands in Command tab and hit play.'}"></textarea>

            <textarea class:hidden="{tab!=3}" readonly class="textarea textarea-bordered h-full text-xs scroll-smooth" placeholder="Enter Commands Here." value="{status ? progress ? status : JSON.stringify(status,' ', '\t'): 'Errors reaching database will be displyed here.'}"></textarea>




            <div class="flex flex-col gap-1 py-4  w-full max-w-md" class:hidden="{tab!=4}">
                    <label class="input-group">
                        <span class="border-r border-red-600"><Hicon iname="surreal" tooltip="URL"/></span>
                        <input bind:value="{url}" type="text" placeholder="https://db.hosting.com/sql" class="input input-bordered w-full" />
                    </label>

                    <label class="input-group">
                      <span class="border-r border-red-600"><Hicon iname="user" tooltip="root or login user"/></span>
                      <input bind:value="{user}" type="text" placeholder="USER" class="input input-bordered w-full" />
                    </label>

                    <label class="input-group">
                        <span class="border-r border-red-600"><Hicon iname="key" tooltip="password"/></span>
                        <input bind:value="{creds}" type="password" placeholder="PASSWORD"  class="input input-bordered w-full" />
                    </label>

                    <label class="input-group">
                       <span class="border-r border-green-600"><Hicon iname="building_office" tooltip="namespace"/></span>
                        <input bind:value="{ns}" type="text" placeholder="NAMESPACE" class="input input-bordered w-full" />
                    </label>

                    <label class="input-group">
                        <span class="border-r border-green-600"><Hicon iname="circle_stack" tooltip="database"/></span>
                        <input bind:value="{db}" type="text" placeholder="DATABASE"  class="input input-bordered w-full" />
                    </label>            
            </div>
        </div>
    </div>
</div>
{:else}
<button on:click="{()=> {show=!show}}" class="btn btn-circle bg-transparent border-0 fixed bottom-40 z-40 ml-5">
   <Hicon iname="surreal" iclass="w-8 h-8"/>
   <span class="animate-ping absolute inline-flex h-full w-full rounded-full border-2 opacity-50 border-primary"></span>
</button>
{/if}




