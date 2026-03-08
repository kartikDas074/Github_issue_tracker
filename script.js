let all=1,ope=0,clo=0;

//click related functionality
document.addEventListener('click',
    function(e){
        if(e.target.id=='all'){
            //console.log('click all');
            all=1;
            ope=0;
            clo=0;
            cheakme();
           
        }else if(e.target.id=='opend'){
            //console.log('click open');
            all=0;
            ope=1;
             clo=0;
             cheakme();
        }else if(e.target.id=='closed'){
            //console.log('click closes');
            all=0;
            ope=0;
            clo=1;
            cheakme();
        }
    }
)
cheakme();
function cheakme(){
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
    show('all');
    getall.classList.add('changebnt');
}else if(clo==1){
    show('open');
      getcp.classList.add('changebnt');
}else{
    show('closed');
    getop.classList.add('changebnt');
}
}
