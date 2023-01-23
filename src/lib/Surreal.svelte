<script>
    import Hicon from "$lib/Hicon.svelte"
    import Sdbcon from "$lib/components/si/Sdbcon.svelte"
    import { setContext } from 'svelte'
    import { writable } from 'svelte/store'


    let show = true;
    let show_con = true;
    let show_c_form = false;
    let c_form = {};
    let add_c = false;


     let activeTab = writable({type:"playtab", name:"tab1", connection:"zero"}) ;

     let connections = writable({
                 zero: {
                   name: "zero",
                   url:"zero-app.fly.dev",
                   user: "root",
                   creds: "signalzero",
                   ns: "main",
                   db: "main",
                   playtab:{
                       tab1: { name:"tab1", input:"select * FROM user;" , result:""},
                       tab2: { name:"tab2", input:"INFO FOR DB;" , result:""},
                   } ,        
                 },
                 sanskrit: {
                   name: "sanskrit",
                   url:"sanskrit-io.fly.dev",
                   user: "root",
                   creds: "signalzero",
                   ns: "main",
                   db: "main", 
                   playtab:{
                       tab1: {  name:"tab1", input:"select * FROM user;" , result:""},
                       tab2: {  name:"tab2", input:"INFO FOR DB;" , result:""},
                   } ,                           
                 }, 
                                                     
            }
        );
 
    function editC(){
       $connections[c_form.name]   = {...c_form, ...$connections[c_form.name]}    
       $connections =  $connections;
    }

    function delC(cn){
        delete $connections[cn];
        $connections =  $connections;
        c_form = {};
        show_c_form = false;
        if (  cn === $activeTab.connection ){
            $activeTab = {}
        }
        delete $connections[cn];        
    }
    
    function setEditC(cn){
       show_c_form = true;
       add_c = false; 
       c_form = {...cn};
    }
    
    function setActiveTab(t){
        $activeTab = {...t}  
    }

    function deleteTab(t){
        if ( t.type === $activeTab.type && t.connection === $activeTab.connection && t.name === $activeTab.name){
            $activeTab = {}
        }
        delete $connections[t.connection][t.type][t.name];
        $connections =  $connections;

    }
    
    
      setContext( 'connections', connections );
      setContext( 'activeTab',  activeTab );
      setContext('func', {setEditC:setEditC, setActiveTab:setActiveTab, delC:delC, deleteTab:deleteTab});
    
</script>


{#if show}
<div class="flex flex-row  fixed top-14 z-50 h-5/6 w-full px-4 items-center justify-center">
    
    <div class="border-r-2 border-base-300 flex-initial w-64 bg-base-100 h-full" class:w-12="{!show_con}">
      <div class="h-12 w-full bg-base-200 p-3 flex flex-row flex-nowrap justify-between" class:flex-col="{!show_con}"  class:gap-4="{!show_con}" class:h-20="{!show_con}" >
          <span class="w-6" on:click="{() => {show_con = !show_con}}"><Hicon iname="surreal" /></span>
          <span class="w-6" on:click="{()=>{ add_c=true;show_c_form=true;c_form={}; }}"><Hicon iname="plus-circle" /></span>
      </div> 
    
       <div class="w-full h-full text-xs">
            <Sdbcon/>
       </div>
 
    
    </div>
    

    <div class=" flex-initial w-full h-full bg-base-300" class:hidden="{show_c_form}">
        <div class="tabs bg-base-100 w-full">
            <span class="tab tab-lg tab-bordered">{JSON.stringify($activeTab)}</span> 
        </div>
      <textarea class="h-96 bg-transparent w-full"  value="{JSON.stringify($connections, ' ','\t')}" />   
    </div>


    <div class=" flex-initial w-full h-full bg-base-100"  class:hidden="{!show_c_form}">
                 <div class="tabs bg-base-100 w-full">
                     <span class="tab tab-lg tab-bordered">Connection: {c_form.name}</span> 
                 </div>
                <div class="flex flex-col gap-1 w-96 max-w-md p-4">
                    <label class="input-group input-group-sm" class:text-error="{ $connections[c_form.name] && add_c }">
                        <span class="border-r border-red-600" ><Hicon iname="link" iclass="w-3 h-3" tooltip="Connection name"/></span>
                        <input  bind:value="{c_form.name}" type="text" placeholder="name" class="input input-bordered w-full input-sm" />
                    </label>
                    <label class="input-group input-group-sm">
                        <span class="border-r border-red-600">https://</span>
                        <input bind:value="{c_form.url}" type="text" placeholder="db.hosting.com" class="input input-bordered w-full input-sm" />
                        <span>/sql</span>
                    </label>

                    <label class="input-group input-group-sm">
                      <span class="border-r border-red-600"><Hicon iname="user" iclass="w-3 h-3" tooltip="root or login user"/></span>
                      <input bind:value="{c_form.user}" type="text" placeholder="user" class="input input-bordered w-full input-sm" />
                    </label>

                    <label class="input-group input-group-sm">
                        <span class="border-r border-red-600"><Hicon iclass="w-3 h-3" iname="key" tooltip="password"/></span>
                        <input bind:value="{c_form.creds}" type="password" placeholder="password"  class="input input-bordered w-full input-sm" />
                    </label>

                    <label class="input-group input-group-sm">
                       <span class="border-r border-green-600"><Hicon iclass="w-3 h-3" iname="building-office" tooltip="namespace"/></span>
                        <input bind:value="{c_form.ns}" type="text" placeholder="namespace" class="input input-bordered w-full input-sm" />
                    </label>

                    <label class="input-group input-group-sm">
                        <span class="border-r border-green-600"><Hicon iclass="w-3 h-3" iname="circle-stack" tooltip="database"/></span>
                        <input bind:value="{c_form.db}" type="text" placeholder="database"  class="input input-bordered w-full input-sm" />
                    </label> 
                    <div class="w-full p-3 flex flex-row flex-nowrap justify-between">
                    <button  on:click="{()=>{show_c_form = false; $connections=$connections;}}" class="btn btn-circle bg-transparent border-0">
                      <Hicon iname="chevron-left" iclass="w-6 h-6"/>
                    </button>

                    <button  on:click="{editC}" class="btn btn-circle bg-transparent border-0" disabled={ $connections[c_form.name] && add_c }>
                      <Hicon iname="check-circle" iclass="w-6 h-6"/>
                    </button>
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




