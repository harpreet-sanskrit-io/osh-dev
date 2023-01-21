<script>
    import Hicon from "$lib/Hicon.svelte"
    let show = false;

    let url = "https://zero-app.fly.dev/sql";
    let user = "root";
    let creds = "signalzero";

    let ns = "main";
    let db = "main";

    let tab = 1;
    let command = "";
    let result = "";
    let status = "";

    let progress = false;



    function timeout(s) {
        return new Promise(resolve => setTimeout(resolve, s * 1000));
    }

    async function run() {
        result = "";
        progress = true;
        status = command;
        tab = 3;
        await timeout(3);
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
<div class="flex flex-col w-full fixed top-20 z-50 max-h-100 px-10">
    <div class="card w-full glass">
        <div class="card-body relative">
            <button on:click="{() => {show=!show}}"
                class="absolute right-2 top-2 btn btn-primary btn-circle btn-xs btn-outline">

                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>


            <h2 class="card-title text-base-100"><Hicon iname="surreal" iclass="w-8 h-8"/>Web CLI</h2>

            <div class="tabs">
                <span on:click="{()=>{tab=4}}" class="tab tab-bordered text-base-100" class:tab-active="{tab === 4}"><Hicon iname="cog-6-tooth"/></span>
                <span on:click="{()=>{tab=1}}" class="tab tab-bordered text-base-100" class:tab-active="{tab === 1}">Command</span>
                <span on:click="{()=>{tab=2}}" class="tab tab-bordered text-base-100" class:tab-active="{tab === 2}">Result</span>
                <span on:click="{()=>{tab=3}}" class="tab tab-bordered text-base-100" class:tab-active="{tab === 3}">Status</span>
                <span on:click="{run}" class="tab tab-bordered text-base-100" class:hidden="{!command}" class:tab-active="{progress}" class:loading="{progress}"><Hicon iname="play"/></span>
            </div>




            <textarea class:hidden="{tab!=1}" class="textarea textarea-bordered h-96" placeholder="Enter Commands Here."
                bind:value="{command}"></textarea>

            <div class:hidden="{tab!=2}" class="mockup-code h-96 scroll-smooth scroll-auto">
                <pre
                    class="text-success"><code>{result ? JSON.stringify(result,' ', '\t'): 'Enter commands in Command tab and hit rocket-launch button on bottom right'}</code></pre>

            </div>
            <div class:hidden="{tab!=3}" class="mockup-code h-96 scroll-auto scroll-smooth">
                <pre class="text-info" class:hidden="{!progress}"><code>Running below commands: </code></pre>
                <pre
                    class="text-info" ><code>{status ? progress ? status : JSON.stringify(status,' ', '\t'): 'Errors reaching database will be displyed here. Please refer Result tab to see if Command succesfully accecpted by SurrealDB or not.'}</code></pre>
            </div>

            <div class="flex flex-col gap-1 py-4 h-96" class:hidden="{tab!=4}">
           

                    <label class="input-group">
                        <span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>

                        </span>
                        <input bind:value="{user}" type="text" placeholder="USER" class="input input-bordered" />
                    </label>

                    <label class="input-group">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                        </span>
                        <input bind:value="{creds}" type="password" placeholder="PASSWORD"
                            class="input input-bordered" />
                    </label>


                    <label class="input-group">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>

                        </span>
                        <input bind:value="{ns}" type="text" placeholder="NAMESPACE"
                            class="input input-bordered" />
                    </label>

                    <label class="input-group">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>

                        </span>
                        <input bind:value="{db}" type="text" placeholder="DATABASE"
                            class="input input-bordered" />
                    </label>

                    <label class="input-group">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>

                        </span>
                        <input bind:value="{url}" type="text" placeholder="https://db.hosting.com/sql" class="input input-bordered" />
                    </label>


               
            </div>



        </div>
    </div>
</div>

{:else}
<button on:click="{()=> {show=!show}}" class="btn btn-circle bg-transparent border-0 fixed bottom-40 z-40 ml-5">
    <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
        viewBox="0 0 1000 1000" xml:space="preserve">

        <defs>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="rgba(255,255,255,0)" />
        <g transform="matrix(1.0089 0 0 1.0089 499.9943 499.9934)"
            id="Icon_00000057851034464450872440000010369422943554633628_">
            <linearGradient id="SVGID_9" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 2122)"
                x1="203.333" y1="-1703.0438" x2="636.764" y2="-952.3192">
                <stop offset="0%" style="stop-color:rgb(255,0,160);stop-opacity: 1" />
                <stop offset="100%" style="stop-color:rgb(150,0,255);stop-opacity: 1" />
            </linearGradient>
            <path
                style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill: url(#SVGID_9); fill-rule: nonzero; opacity: 1;"
                transform=" translate(-420, -794.35)"
                d="M 420 562.3 l 233.2 129.3 v -52 L 420 510.4 c -34.6 19.2 -202.3 112 -233.2 128.7 c 28.5 16.1 330.3 182.5 513.5 283.3 v 51.3 C 675.5 987.3 420 1128.4 420 1128.4 c -69.9 -38.4 -210.3 -116.3 -280.2 -154.7 V 819.1 L 420 973.7 l 46.4 -26 l -373.7 -206 v 258 l 326.6 180.6 c 32.2 -17.9 302.5 -167 326.6 -180.6 V 896.4 l -466.4 -258 L 420 562.3 z M 93.4 587.7 V 691 l 466.4 258 L 420 1026.3 L 186.8 897 v 52 L 420 1077.7 c 34.6 -19.2 202.3 -112 233.2 -128.7 c -28.5 -16.1 -329.7 -182.5 -513.5 -284 v -51.3 C 164.6 600.1 420 459 420 459 c 69.9 38.4 210.3 116.3 280.2 154.7 v 154.7 L 420 613.7 l -46.4 26 l 373 206 v -258 L 420 407.7 C 387.9 425.6 116.9 574.7 93.4 587.7 z M 420 304.4 L 0 536.4 v 515.9 l 420 232 l 420 -232 V 536.4 L 420 304.4 z M 793.1 1026.3 l -373 206 l -373.7 -206 v -464 l 373 -206 l 373 206 L 793.1 1026.3 z"
                stroke-linecap="round" />
        </g>
    </svg>

    <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full border-2 opacity-50 border-primary"></span>
</button>
{/if}