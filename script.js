var name_field = document.querySelector('.name-field')
var num_field = document.querySelector('.num-field')
var month_field = document.querySelector('.month-field')
var year_field = document.querySelector('.year-field')
var cvc_field = document.querySelector('.cvc-field')

name_field.addEventListener('click',inputClick)
num_field.addEventListener('click',inputClick)
month_field.addEventListener('click',inputClick)
year_field.addEventListener('click',inputClick)
cvc_field.addEventListener('click',inputClick)

name_field.addEventListener('input',input_change)
num_field.addEventListener('input',input_change)
month_field.addEventListener('input',input_change)
year_field.addEventListener('input',input_change)
cvc_field.addEventListener('input',input_change)

name_field.addEventListener('keypress',ev=>{
    if(ev.key==='Enter'){num_field.focus()}
})
num_field.addEventListener('keypress',inputKeyPress)
month_field.addEventListener('keypress',inputKeyPress)
year_field.addEventListener('keypress',inputKeyPress)
cvc_field.addEventListener('keypress',inputKeyPress)


function confirmBtnClick(ev){
    if(name_field.value===''){
        document.querySelector('.name-warn').style.display = 'initial'
        name_field.style.borderColor = 'hsl(0, 100%, 66%)'
    }
    if(num_field.value==='' || num_field.value.length<16){
        document.querySelector('.number-warn').style.display = 'initial'
        num_field.style.borderColor = 'hsl(0, 100%, 66%)'
    }
    if(month_field.value===''){
        document.querySelector('.expire-month-year-warn').style.display = 'initial'
        month_field.style.borderColor = 'hsl(0, 100%, 66%)'
    }
    if(year_field.value===''){
        document.querySelector('.expire-month-year-warn').style.display = 'initial'
        year_field.style.borderColor = 'hsl(0, 100%, 66%)'
    }
    if(cvc_field.value==='' || cvc_field.value.length<3){
        document.querySelector('.cvc-warn').style.display = 'initial'
        cvc_field.style.borderColor = 'hsl(0, 100%, 66%)'
    }
    else{
        document.querySelector('.form').style.display = 'none'
        document.querySelector('.completion-message').style.display = 'flex'
    }
}
function inputClick(ev){
    if(ev.currentTarget===name_field){
        name_field.style.borderColor = 'hsl(279, 6%, 55%)'
        document.querySelector('.name-warn').style.display = 'none'
    }
    else if(ev.currentTarget===num_field){
        num_field.style.borderColor = 'hsl(279, 6%, 55%)'
        document.querySelector('.number-warn').style.display = 'none'
    }
    else if(ev.currentTarget===month_field){
        month_field.style.borderColor = 'hsl(279, 6%, 55%)'
        document.querySelector('.expire-month-year-warn').style.display = 'none'
    }
    else if(ev.currentTarget===year_field){
        document.querySelector('.expire-month-year-warn').style.display = 'none'
        year_field.style.borderColor = 'hsl(279, 6%, 55%)'
    }
    else if(ev.currentTarget===cvc_field){
        cvc_field.style.borderColor = 'hsl(279, 6%, 55%)'
        document.querySelector('.cvc-warn').style.display = 'none'
    }

}
function input_change(ev){
    if(ev.currentTarget===name_field){
        document.querySelector('.holder-name').innerHTML = name_field.value
    }
    else if(ev.currentTarget===num_field){
        num_field_process_value()
    }
    else if(ev.currentTarget===month_field){
        document.querySelector('.expire-date').innerHTML = month_field.value+'/'+year_field.value
    }
    else if(ev.currentTarget===year_field){
        document.querySelector('.expire-date').innerHTML = month_field.value+'/'+year_field.value
    }
    else if(ev.currentTarget===cvc_field){
        document.querySelector('.cvc').innerHTML = cvc_field.value
    }
}
function inputKeyPress(ev){
if(ev.key==='0' || ev.key==='1' || ev.key==='2' || ev.key==='3' || ev.key==='4' || 
ev.key==='5' || ev.key==='6' || ev.key==='7' || ev.key==='8' || ev.key==='9' || ev.key==='.' || ev.key==='Enter'){

if(ev.currentTarget===num_field && num_field.value.length===16){
ev.preventDefault()
}

if(ev.currentTarget===month_field && month_field.value.length===2){
ev.preventDefault()
}

if(ev.currentTarget===year_field && year_field.value.length===2){
ev.preventDefault()
}

if(ev.currentTarget===cvc_field && cvc_field.value.length===3){
ev.preventDefault()
}

if(ev.currentTarget===num_field && ev.key==='Enter'){
    month_field.focus()
}
if(ev.currentTarget===month_field && ev.key==='Enter'){
    year_field.focus()
}
if(ev.currentTarget===year_field && ev.key==='Enter'){
    cvc_field.focus()
}
if(ev.currentTarget===cvc_field && ev.key==='Enter'){
    confirmBtnClick()
}

}
else{
    ev.preventDefault()
}
}
function num_field_process_value(ev){
    var value = num_field.value
    var newValue = value

    if(value.length > 4 && value.length <= 8){
    newValue = value.slice(0, 4) + ' ' + value.slice(4)
}
else if(value.length > 8 && value.length <= 12){
    newValue = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8)
    }

    else if(value.length > 12 && value.length <= 16){
    newValue = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12)
    }


    document.querySelector('.card-num').innerHTML = newValue
    


}
function continueBtn(){
    document.querySelector('.completion-message').style.display = 'none'
    document.querySelector('.form').style.display = 'flex'

    num_field.value = ''
    name_field.value = ''
    month_field.value = ''
    year_field.value = ''
    cvc_field.value = ''
}


