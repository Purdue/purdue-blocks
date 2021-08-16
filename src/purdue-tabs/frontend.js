const tabGroups=[...document.querySelectorAll(".pu-blocks-tabs")]
if(tabGroups&&tabGroups.length>0){
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
    headers.forEach((header, index)=>{
        header.addEventListener('click', ()=>{
            panels.forEach((panel,i)=>{
                if(index===i){
                    panel.classList.add('active')   
                }else{
                    panel.classList.remove('active')
                }
            })
            headers.forEach((h,i)=>{
                if(index===i){
                    h.classList.add('active')
                    h.setAttribute('aria-selected',"true")            
                }else{
                    h.classList.remove('active')
                    h.setAttribute('aria-selected',"false")
                }
            })
        })
    })
    let newHeaders=[...tabs.querySelectorAll(".pu-blocks-tabs__header-mobile")]
    newHeaders.forEach((header,index)=>{
        header.addEventListener('click', (e)=>{      
            panels.forEach((panel,i)=>{
                if(index===i){
                    panel.classList.contains('mobile-active')?panel.classList.remove('mobile-active'):panel.classList.add('mobile-active')
                                      
                }else{
                    panel.classList.remove('mobile-active')
                }
            })
            newHeaders.forEach((h,i)=>{
                if(index===i){
                    if(header.classList.contains("mobile-active")){
                        header.classList.remove('mobile-active')
                        header.setAttribute('aria-selected',"false")
                    }else{
                        header.classList.add('mobile-active')
                        header.setAttribute('aria-selected',"true")
                    }
                }else{
                    h.classList.remove('mobile-active')
                    h.setAttribute('aria-selected',"false")
                }

            })

        })
    })
})
}
//three header table
const threeHeaderTables=[...document.querySelectorAll(".three-header-table")]
if(threeHeaderTables&&threeHeaderTables.length>0){
    threeHeaderTables.forEach((table)=>{
        let topHeaders=[]
        table.querySelector("thead")?topHeaders=[...table.querySelectorAll("thead tr th")]:""
        let sectionHeaderRows=[]
        if(table.querySelector("tbody")){
            const rows= [...table.querySelectorAll("tbody tr")]
            let contentRow = []
            rows.forEach((tr,index)=>{
                if(tr.classList.contains("section-header-row")){
                    sectionHeaderRows.push({sectionHeaderRow:tr, index:index})
                }else if(!tr.classList.contains("spacer")){
                    contentRow.push(tr)
                }
            })
            const initialHeader=sectionHeaderRows[0].sectionHeaderRow.querySelector("th")
            initialHeader.classList.add("is-open")
            initialHeader.setAttribute("aria-expanded","true")

            for(let i=1; i<sectionHeaderRows[1].index; i++){
                rows[i].classList.add("show")
            }

            sectionHeaderRows.forEach((row, index)=>{
                const header = row.sectionHeaderRow.querySelector("th")
               header.addEventListener("click", ()=>{
                if(header.classList.contains("is-open")){
                    header.classList.remove("is-open")
                    header.setAttribute("aria-expanded","false")
                    if(index<sectionHeaderRows.length-1){
                        for(let i=row.index+1; i<sectionHeaderRows[index+1].index; i++){
                            rows[i].classList.remove("show")
                        }
                    }else{
                        for(let i=row.index+1; i<rows.length; i++){
                            rows[i].classList.remove("show")
                        }
                    }
                }else{
                    header.classList.add("is-open")
                    header.setAttribute("aria-expanded","true")
                    if(index<sectionHeaderRows.length-1){
                        for(let i=row.index+1; i<sectionHeaderRows[index+1].index; i++){
                            rows[i].classList.add("show")
                        }
                    }else{
                        for(let i=row.index+1; i<rows.length; i++){
                            rows[i].classList.add("show")
                        }
                    }
                }                
               })
                //mobile
                let newSection = document.createElement("div"); 
                newSection.classList.add('three-header-table-mobile-section')
                const id=Math.random().toString(16).slice(2)
                let newSectionHeader = document.createElement("button"); 
                newSectionHeader.classList.add('three-header-table-mobile-section__button')
                newSectionHeader.setAttribute('aria-expanded', "false")
                newSectionHeader.setAttribute('aria-controls', `section-${id}`)
                newSectionHeader.innerHTML = header.innerHTML;
                newSection.appendChild(newSectionHeader)
                let newSectioncontent = document.createElement("div"); 
                newSectioncontent.classList.add('three-header-table-mobile-section__content')
                newSectioncontent.id=`section-${id}`
                newSection.appendChild(newSectioncontent)
                const rowTest=[...contentRow[0].querySelectorAll("td")]

                for (let i=0;i<rowTest.length;i++){
                    let newt = document.createElement("table"); 
                    newt.classList.add('three-header-table-mobile-table')
                    let newh = document.createElement("thead"); 
                    let newht = document.createElement("tr"); 
                    let newhth = document.createElement("th"); 
                    let newb = document.createElement("tbody"); 
                    newhth.setAttribute('colspan', "2")
                    newhth.setAttribute('aria-expanded', "false")
                    newhth.setAttribute('aria-controls', `body-${id}-${i}`)
                    newhth.id= `header-${id}-${i}` 
                    newhth.innerHTML = topHeaders[i].innerHTML;
                    newht.appendChild(newhth)
                    newh.appendChild(newht)
                    newt.appendChild(newh)
                    newb.id= `body-${id}-${i}` 
                    if(index<sectionHeaderRows.length-1){
                        for(let n=row.index+1; n<sectionHeaderRows[index+1].index-1; n++){
                            let newtr = document.createElement("tr"); 
                            if(rows[1].querySelector("th")){
                                let newth = document.createElement("th"); 
                                newth.innerHTML = rows[n].querySelector("th").innerHTML;
                                newth.id= `body-${id}-${i}-${n}` 
                                newtr.appendChild(newth) 
                            }
                            let newtb = document.createElement("td"); 
                         
                            newtb.innerHTML = [...rows[n].querySelectorAll("td")][i].innerHTML;
                            newtb.setAttribute('headers', `header-${id}-${i} body-${id}-${i}-${n}`)
                            newtr.appendChild(newtb) 
                            
                            newb.appendChild(newtr) 
                        }
                    }else{
                        for(let n=row.index+1; n<rows.length; n++){
                            let newtr = document.createElement("tr"); 
                            if(rows[n].querySelector("th")){
                                let newth = document.createElement("th"); 
                                newth.innerHTML = rows[n].querySelector("th").innerHTML;
                                newth.id= `body-${id}-${i}-${n}` 
                                newtr.appendChild(newth) 
                            }
                            let newtb = document.createElement("td"); 
                            if([...rows[n].querySelectorAll("td")][i]){
                                newtb.innerHTML = [...rows[n].querySelectorAll("td")][i].innerHTML;
                                newtb.setAttribute('headers', `header-${id}-${i} body-${id}-${i}-${n}`)
                            }
                            newtr.appendChild(newtb)                             
                            newb.appendChild(newtr)
                        }
                    }                  

                    newt.appendChild(newb)
                    newSectioncontent.appendChild(newt)
                    newhth.addEventListener('click', ()=>{
                        if(newhth.classList.contains("is-open")){
                            newhth.classList.remove('is-open')
                            newhth.setAttribute('aria-expanded',"false")
                            newhth.parentElement.parentElement.nextElementSibling.classList.remove('show')
                        }else{
                            newhth.classList.add('is-open')
                            newhth.setAttribute('aria-expanded',"true")
                            newhth.parentElement.parentElement.nextElementSibling.classList.add('show')
                        }
                    })
                }

                table.parentElement.insertBefore(newSection, table);
                newSectionHeader.addEventListener('click', ()=>{
                    if(newSectionHeader.classList.contains("is-open")){
                        newSectionHeader.classList.remove('is-open')
                        newSectionHeader.setAttribute('aria-expanded',"false")
                        newSectionHeader.nextElementSibling.classList.remove('show')
                    }else{
                        newSectionHeader.classList.add('is-open')
                        newSectionHeader.setAttribute('aria-expanded',"true")
                        newSectionHeader.nextElementSibling.classList.add('show')
                    }
                })
            })
        }
    })
}
