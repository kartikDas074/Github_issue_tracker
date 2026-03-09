
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
async function search_me(str) {
      let getSrc=document.getElementById('search').value;
      let url=`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${getSrc}`;
      console.log(url);
      console.log(url);
      let res= await fetch(url);
      let res_json= await res.json();
      commonshow(str,res_json);
} 
function commonshow(str,res_json){
   let cnt=0;
    let getcardholder=document.getElementById('cardHolder');
    getcardholder.innerHTML=``;
    for(let i=0;i<res_json.data.length;i++){
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
       creatcard.innerHTML=`
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