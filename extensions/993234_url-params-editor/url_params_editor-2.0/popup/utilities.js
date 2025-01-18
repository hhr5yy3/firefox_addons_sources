export const wait=(ms,...params)=>new Promise(resolve=>setTimeout(resolve,ms,params))

export const domready=(doc=document)=>new Promise(resolve=>{
    if(doc.readyState!='loading'){
	return resolve()
    }else{
	doc.addEventListener('DOMContentLoaded',()=>resolve())
    }
})	    
