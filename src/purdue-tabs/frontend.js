const tabGroups=[...document.querySelectorAll(".pu-blocks-tabs")]
tabGroups.forEach((tabs)=>{
    const headers=[...tabs.querySelectorAll(".pu-blocks-tabs__header")]
    const panels=[...tabs.querySelectorAll(".pu-blocks-tabs__panel")]

    headers.forEach((header,index)=>{
        let clHeader = header.cloneNode(true);
        clHeader.id="accrdion-"+clHeader.id
        clHeader.classList.remove("pu-blocks-tabs__header")
        clHeader.classList.add("pu-blocks-tabs__header-mobile")
        tabs.insertBefore(clHeader, panels[index])
    })
    let newHeaders=[...tabs.querySelectorAll(".pu-blocks-tabs__header-mobile")]
    newHeaders=[...headers,...newHeaders]
    newHeaders.forEach((header)=>{
        header.addEventListener('click', ()=>{
            const panelid=header.getAttribute("aria-control")
            panels.forEach((panel)=>{
                if(panel.id===panelid){
                    if(header.classList.contains("pu-blocks-tabs__header-mobile")){
                        panel.classList.contains('active')?panel.classList.remove('active'):panel.classList.add('active')
                    }else{
                        panel.classList.add('active')
                    }                    
                }else{
                    panel.classList.remove('active')
                }
            })
            newHeaders.forEach((h,index)=>{
                if(h.getAttribute("aria-control")===panelid){
                    if(h.classList.contains("pu-blocks-tabs__header-mobile")){
                        h.classList.contains('active')?h.classList.remove('active'):h.classList.add('active')
                    }else{
                        h.classList.add('active')
                        h.setAttribute('aria-selected',"true")
                    }
                }else{
                    h.classList.remove('active')
                    h.setAttribute('aria-selected',"false")
                }
            })
        })
    })
})

