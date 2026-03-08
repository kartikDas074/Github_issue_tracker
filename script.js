let all=1,ope=0,clo=0;

//click related functionality
document.addEventListener('click',
    function(e){
        if(e.target.id=='all'){
            //console.log('click all');
            all=1;
        }else if(e.target.id=='opend'){
            //console.log('click open');
            ope=1;
        }else if(e.target.id=='closed'){
            //console.log('click closes');
            clo=1;
        }
    }
)

if(all==1){
    show('all');
}else if(clo==1){
    show('open');
}else{
    show('closed');
}

