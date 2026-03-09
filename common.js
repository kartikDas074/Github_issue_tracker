
//show functionality

async function show (str)  {
    let res= await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    let res_json= await res.json();
    // console.log(res_json);
    // console.log(res_json.data);
    // console.log(res_json.data[0]);
    commonshow(str,res_json);
}

//make empty
function clearme(){
    let getSrc=document.getElementById('search');
    getSrc.value='';
}

//search funtion
async function search_me(str) {
       let getSrc='';
       getSrc=document.getElementById('search').value;
      if(getSrc.length==0){show(str);return;}
      let url=`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${getSrc}`;

      let res= await fetch(url);
      let res_json= await res.json();
      commonshow(str,res_json);
} 
function commonshow(str,res_json){
   let cnt=0;
    let getcardholder=document.getElementById('cardHolder');
    getcardholder.innerHTML=``;
    for(let i=0;i<res_json.data.length;i++){
        //console.log(res_json.data[i]);
         if(res_json.data[i].status==str)continue;
         cnt++;
        const divcontaier=[];
        for(let j=0;j<res_json.data[i].labels.length;j++){
             divcontaier.push(creatDiv(res_json.data[i].labels[j]));
        }
        //get the priority s
        let priority=res_json.data[i].priority;
        

        //get tittle and descripstion...
        let title=res_json.data[i].title;
        let des=res_json.data[i].description;
        
        //get author and create date
         let author=res_json.data[i].author;
        let creat=res_json.data[i].createdAt;
        //creat the new card...
       let creatcard=document.createElement('div');
       //get url based on status and use condition
        let url="";
        if(res_json.data[i].status=='open'){
            url="assets/Open-Status.png";
             creatcard.classList.add('green_border');
        }else{
            url="assets/Closed- Status .png";
            creatcard.classList.add('purple_border')
        }

        //get id
        let idd=res_json.data[i].id;
       creatcard.innerHTML=`
           <p id="cnt" class="hidden">${idd}</p>
           <div class="ht flex justify-between items-center">
                 <div><img src="${url}" alt=""></div> 
                <div class="High">${priority}</div>
             </div>
              <h1 class="ht text-[16px] font-semibold text-[#1F2937]">${title}</h1>
             <p class="ht text-[12px] text-[#64748B]">${des}</p>
             <div class="ht cardchild flex justify-start items-center">  
             </div>
             <div class=" border border-black/10"></div>
             <div class="ht">
                <p class=" text-[12px] text-[#64748B]">${author}</p>
                <p class=" text-[12px] text-[#64748B]">${creat}</p>
             </div>
       `
       let getcardch=creatcard.querySelector('.cardchild');
        divcontaier.forEach(div => {
         getcardch.appendChild(div);
        });
        if(res_json.data[i].status=='open'){
             creatcard.classList.add('green_border');
        }else{
            creatcard.classList.add('purple_border')
        }
        creatcard.classList.add('card');
        
        getcardholder.append(creatcard);
    }
    let getcount=document.getElementById('cnt');
    getcount.innerText=cnt.toString();
}

function creatDiv(str){
    let newdiv=document.createElement('div');
    let url;
    if(str=='documentation'){
         newdiv.innerHTML=`
             <i class="fa-brands fa-readme"></i>
             <p>${str}</p>
         `
          newdiv.classList.add('Low');
    }else if(str=='bug'){
         newdiv.innerHTML=`
             <i class="fa-solid fa-worm"></i>
             <p>${str}</p>
         `
         newdiv.classList.add('High');
    }else if(str=='good first issue'){
          newdiv.innerHTML=`
             <i class="fa-solid fa-circle-exclamation"></i>
             <p>issue</p>
         `
          newdiv.classList.add('Low')
    }else if(str=='enhancement'){
          newdiv.innerHTML=`
            <i class="fa-regular fa-star"></i>
             <p>${str}</p>
         `
         newdiv.classList.add('Enhancement');
    }else{
           newdiv.innerHTML=`
            <i class="fa-solid fa-hand-holding"></i>
             <p>${str}</p>
         `
         newdiv.classList.add('Medium');
    }
    newdiv.classList.add('txt');
    newdiv.classList.add('flexing');
    return newdiv;
}


async function modale(id) {
    
    let url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    let res=await fetch(url);
    let res_json= await res.json();
    console.log(res_json);
    //creat modal
    let creatmod=document.createElement('div');
   //get title
   let title=res_json.data.title;
   console.log(title);
   //get status
   let status=res_json.data.status;
   //get assignee
   let assignee=res_json.data.author;
   //get createdAt
   let createdAt=res_json.data.createdAt;
   //get lavel
   const divcontaier=[];
        for(let j=0;j<res_json.data.labels.length;j++){
             divcontaier.push(creatDiv(res_json.data.labels[j]));
        }

    //get description
    let des=res_json.data.description;
    //get priority
    let priority=res_json.data.priority;
    let pro='High';
    if(priority=='medium')pro='Medium';
    else if(priority=='low')pro='Low';


    creatmod.innerHTML=`
       <div class="flex flex-col w-full max-w-[90vw] md:w-[450px] lg:w-[700px] shadow-sm bg-[#FFFFFF] rounded-sm px-[5px] py-[10px] md:px-[50px] md:py-[50px] gap-[16px] mx-auto">
       <h1 class=" text-[16px] md:text-[24px] text-[#1F2937] font-semibold">${title}</h1>
       <div class="flex flex-col md:flex-row gap-[10px] ">
            <div class="stat flex justify-center items-center px-[10px] py-[3px] max-w-[200px] bg-[#00A96E] text-[#FFFFFF] rounded-[15px]">${status}</div>
            <div class="flex flex-col  md:flex-row gap-[10px] items-center">
            <div class="hidden md:flex h-[5px] w-[5px] bg-black/50 text-[12px] text-[#64748B] rounded-[50%]"></div>
            <div class="text-[12px] text-[#64748B]">opend by ${assignee}</div>
            <div class="hidden md:flex h-[5px] w-[5px] bg-black/50 text-[12px] text-[#64748B] rounded-[50%]"></div>
            <div class="text-[12px] text-[#64748B]">${createdAt}</div>
            </div>    
        </div>
        <div class="ht cardchild flex justify-start items-center">  
             </div>
          <p class="ht text-[16px] text-[#64748B]">${des}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 bg-[#F8FAFC] mx-[20px]">
            <div>
                <h1 class="text-[16px] text-[#64748B]">Assignee:</h1>
                <p class=" text-[16px] font-semibold text-[#1F2937]">${assignee}</p>
            </div>
            <div>
                <h1 class="text-[16px] text-[#64748B]">Priority:</h1>
                <p class="${pro} flex justify-center items-center">${priority}</p>
            </div>
        </div>
        <div class="flex justify-end">
            <button id="btno" class="btn  btn-primary text-[#FFFFFF]">close</button>
        </div>
       </div>
    `
    let getcardch=creatmod.querySelector('.cardchild');
        divcontaier.forEach(div => {
         getcardch.appendChild(div);
        });
    creatmod.classList.add('cas-modal');
    creatmod.style.display='flex';
    if(status!='open')creatmod.querySelector('.stat').style.backgroundColor = '#A855F7';
    let bod=document.getElementById('cardHolder');
    bod.append(creatmod);

} 
