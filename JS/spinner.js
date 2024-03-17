const spinner = document.getElementById('loading-bar');
const barsIsLoading = (isLoading) =>{
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        setTimeout(() => {
            
            spinner.classList.add('hidden');
        }, 2000);
    }
}