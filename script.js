let all=1,ope=0,clo=0;

//click related functionality
document.addEventListener('click',
    function(e){
        if(e.target.id=='all'){
            //console.log('click all');
            all=1;
            ope=0;
            clo=0;
              clearme();
            cheakme();
          
        }else if(e.target.id=='opend'){
            //console.log('click open');
            all=0;
            ope=1;
             clo=0;
               clearme();
             cheakme();
           
        }else if(e.target.id=='closed'){
            //console.log('click closes');
            all=0;
            ope=0;
            clo=1;
            clearme();
            cheakme();
        }else if(e.target.id=='srcbar'){
            cheakme(2);
        }
    }
)
cheakme();
function cheakme(pk=1){
let getall=document.getElementById('all');
let getop=document.getElementById('opend');
let getcp=document.getElementById('closed');
getall.classList.add('changebnt');
getop.classList.add('changebnt');
getcp.classList.add('changebnt');
getall.classList.remove('changebnt');
getop.classList.remove('changebnt');
getcp.classList.remove('changebnt');
if(all==1){
    if(pk==1)
    show('all');
    else
    search_me('all');
    getall.classList.add('changebnt');
}else if(clo==1){
    if(pk==1)
    show('open');
    else
    search_me('open');
      getcp.classList.add('changebnt');
}else{
    if(pk==1)
    show('closed');
    else
    search_me('closed');
    getop.classList.add('changebnt');
}
}

//search functionality modify for searchbar is empty

let getsearch=document.getElementById('search');
getsearch.addEventListener('input',
    function(){
        if(getsearch.value.length==0)cheakme();
    }
)

//search for only using enter keyword

getsearch.addEventListener ("keydown", function(e){

    if(e.key === "Enter"){
        cheakme(2);
    }

});