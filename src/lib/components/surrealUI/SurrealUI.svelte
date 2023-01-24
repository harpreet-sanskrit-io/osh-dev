<script>
    import Hicon          from "$lib/Hicon.svelte"
    import Connection         from "$lib/components/surrealUI/Connection.svelte"
    import { setContext } from 'svelte'
    import { writable }   from 'svelte/store'
    import { tick } from 'svelte'


    let show                         = true 
    let show_left_pane               = true 
    let show_connection_form         = false
    let connection_form_state        = writable({})
    let connection_form_in_add_mode  = writable(false)
    let connection_form_name_field

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
// Made reactive
$: has_child = Object.keys(connections).length > 0;
//START///////////////////////////////// Package: connection //////////////////////////////////////
    //// Show Connection form to add new connection
    async function fn_connection_showAddForm() {
      const fn="fn_connection_showAddForm"
      console.info( fn )
      $connection_form_in_add_mode = true
      show_connection_form        = true
      $connection_form_state       = {} 
      await tick()
      connection_form_name_field.focus()
    }

    async function fn_connection_showEditForm(connection) {
      const fn="fn_connection_showEditForm"
      console.info( fn )
      $connection_form_in_add_mode = false
      show_connection_form        = true
      $connection_form_state       = {...connection} 
      await tick()
      connection_form_name_field.focus()
    }
    //// Delete a connection
    function fn_connection_delete(p_connection_key){
        // IF connection is already open
        if (  p_connection_key === $activeTab.connection ){
            //remove active tab
            $activeTab = {}
            //set form state to blank
            $connection_form_state = {}
            //hide connection form
            show_connection_form  = false;
        }
        // delete connection        
        delete $connections[p_connection_key];
        // make it reactive in svelte way
        $connections          =  $connections;     
    }
    //// Save connection form state
    function fn_connection_save(){
       // UpdaSave Details
       $connections[$connection_form_state.name]   = {...$connection_form_state, ...$connections[$connection_form_state.name]}    
       // Make it reactive the svelte way
       $connections =  $connections;
       show_connection_form        = false; 
       $connection_form_state      = {};
    }
    //// Set connection form state
    function fn_connection_setFormState(cn){
       show_connection_form        = true;
       $connection_form_in_add_mode = false; 
       $connection_form_state       = {...cn};
    }
//END///////////////////////////////// Package: connection //////////////////////////////////////

//START////////////////////////////// Package: component ///////////////////////////////////////
    //// Toggle left pane
    function fn_component_toggleLeftPane() {
      const fn = "fn_component_toggleLeftPane" 
      console.info(fn)
      show_left_pane = !show_left_pane
    }
    //// Set active tab
    function setActiveTab(t){
        $activeTab = {...t}  
    }
    //// Delete playground file
    function fn_component_deletePlayTab(tab,connection){
        const tabType = 'playtab'
        delete $connections[connection.name][tabType][tab.name]
        $connections =  $connections;
    }
    //// Add new playground file/tab
    function fn_component_addPlayTab(connection){
        const tabType = 'playtab'
        if(! $connections[connection.name][tabType]) {
          $connections[connection.name][tabType] = {}
        }
        
        $connections[connection.name][tabType]["tab3"] = {  name:"tab3", input:"select * FROM user;" , result:""}
        $connections =  $connections;
    }
    //// Delete Playgroung
    function fn_component_deletePlayTabs(connection){
        const tabType = 'playtab'
        $connections[connection.name][tabType] = {}
        $connections =  $connections
    }
    //// Set context
    setContext( 'connections', connections );
    setContext( 'activeTab'  , activeTab   );
    setContext( 'func'       , {
                                  setEditC:      fn_connection_showEditForm,
                                  setActiveTab:  setActiveTab,
                                  delC:          fn_connection_delete,
                                  fn_component_deletePlayTabs: fn_component_deletePlayTabs,
                                  fn_component_deletePlayTab:  fn_component_deletePlayTab,
                                  fn_component_addPlayTab: fn_component_addPlayTab,
                               }
    );
//END////////////////////////////// Package: component //////////////////////////////////////////// 
$: validConName = ( $connections[$connection_form_state.name] && $connection_form_in_add_mode )  
</script>


{#if show}
<!-- Component UI  -->
<div class="flex flex-row  fixed top-14 z-50 h-5/6 w-full px-4 items-center justify-center">
    
    <!--Left Pane-->
    <div class="border-r-2 border-base-300 flex-initial w-64 bg-base-100 h-full" class:w-12="{!show_left_pane}">
      <!--Left Pane Header-->
      <div class="h-12 w-full bg-base-200 p-3 flex flex-row flex-nowrap justify-between" class:flex-col="{!show_left_pane}"  class:gap-4="{!show_left_pane}" class:h-20="{!show_left_pane}" >
        <span class="w-6" on:click="{fn_component_toggleLeftPane}"><Hicon iname="surreal" /></span>
        <span class:hidden="{show_connection_form}" class="w-6" on:click="{fn_connection_showAddForm}"><Hicon iname="plus-circle" /></span>
      </div>
      <!--End: Left Pane Header--> 
        <!--Left Pane Body-->
        <div class="w-full h-full text-xs" >
          <!--Connection form-->
          <div class="flex flex-col w-full bg-base-300" class:hidden="{!show_connection_form}">
            <div class="flex flex-row flex-nowrap justify-center h-6 items-center space-x-3 w-full pl-3">
              <Hicon iname="surreal" iclass="w-3 h-3 { validConName ? 'text-success':'text-error' }"/>
              <input bind:this="{connection_form_name_field}" bind:value="{$connection_form_state.name}" type="text" placeholder="name" class="input rounded-none w-full input-xs" />
            </div>
            <div class="flex flex-row flex-nowrap justify-center h-6 items-center space-x-3 w-full pl-3">
              <Hicon iname="cloud" iclass="w-3 h-3"/>
              <input bind:value="{$connection_form_state.url}" type="text" placeholder="db.hosting.com" class="input rounded-none w-full input-xs" />
            </div>
            <div class="flex flex-row flex-nowrap justify-center h-6 items-center space-x-3 w-full pl-3">
              <Hicon iname="user" iclass="w-3 h-3"/>
              <input bind:value="{$connection_form_state.user}" type="text" placeholder="user" class="input rounded-none w-full input-xs" />
            </div>            
            <div class="flex flex-row flex-nowrap justify-center h-6 items-center space-x-3 w-full pl-3">
              <Hicon iname="key" iclass="w-3 h-3"/>
              <input bind:value="{$connection_form_state.creds}" type="password" placeholder="password"  class="input rounded-none w-full input-xs" />
            </div>
            <div class="flex flex-row flex-nowrap justify-center h-6 items-center space-x-3 w-full pl-3">
              <Hicon iname="building-office" iclass="w-3 h-3 text-success"/>
              <input bind:value="{$connection_form_state.ns}" type="text" placeholder="namespace" class="input rounded-none w-full input-xs" />
            </div>   
            <div class="flex flex-row flex-nowrap justify-center h-6 items-center space-x-3 w-full pl-3">
              <Hicon iname="circle-stack" iclass="w-3 h-3 text-success"/>
              <input bind:value="{$connection_form_state.db}" type="text" placeholder="database"  class="input rounded-none w-full input-xs" />
            </div>                         
            <div class="space-x-2 w-full flex flex-row flex-nowrap justify-end items-center h-8">

                    <button  on:click="{()=>{fn_connection_delete($connection_form_state.name)}}" class="btn btn-xs btn-circle bg-transparent border-0">
                      <Hicon iname="trash" iclass="w-3 h-3 text-error"/>
                    </button>

                    <button  on:click="{()=>{show_connection_form = false; $connections=$connections;}}" class="btn btn-xs btn-circle bg-transparent border-0">
                      <Hicon iname="x-mark" iclass="w-3 h-3 text-error"/>
                    </button>

                    <button  on:click="{fn_connection_save}" class="btn btn-circle btn-xs bg-transparent border-0" disabled={ $connections[$connection_form_state.name] && $connection_form_in_add_mode }>
                      <Hicon iname="check" iclass="w-3 h-3 text-info"/>
                    </button>
            </div> 
          </div>
          <!--End of Connection form-->
          <!--Paint Children-->
          {#if has_child }
            {#each Object.values($connections) as connection (connection.name)}
              <Connection {connection}/>
            {/each}
          {/if}
          <!--End of Children-->
        </div>
        <!--End: Left Pane Body-->    
    </div>
    <!--End: Left Pane-->
    
    <!-- ******************************** -->

    <div class=" flex-initial w-full h-full bg-base-300">
        <div class="tabs bg-base-100 w-full">
            <span class="tab tab-lg tab-bordered">{JSON.stringify($activeTab)}</span> 
        </div>
      <div class="flex flex-row justify-center items-center h-5/6">
      <textarea class="h-full w-1/2 bg-transparent"  value="{JSON.stringify($connection_form_state, ' ','\t')}" />  
      <textarea class="h-full w-1/2 bg-transparent"  value="{JSON.stringify($connections, ' ','\t')}" />   
      </div>
    </div>



</div>
{:else}
<button on:click="{()=> {show=!show}}" class="btn btn-circle bg-transparent border-0 fixed bottom-40 z-40 ml-5">
   <Hicon iname="surreal" iclass="w-8 h-8"/>
   <span class="animate-ping absolute inline-flex h-full w-full rounded-full border-2 opacity-50 border-primary"></span>
</button>
{/if}




