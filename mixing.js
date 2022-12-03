'use strict';

/*Считываем входные данные из файла json в переменную data*/
async function getdata(/*callback*/) 
{
    console.log("trytofetch");
    const response = await fetch('https://api.npoint.io/1a6671a869a7a4ab99eb');
    let data = await response.json();
    console.log("ifetched");
    
    //Формируем массив ингридиентов
    for (var i=0; i<data.length; i++)
    {
        for (var j=0; j<data[i].ingredients.length; j++)
        {
            if (ingredients.includes(data[i].ingredients[j]) == false)
            ingredients.push(data[i].ingredients[j]);
        }
    }
    for (var i=0; i<ingredients.length; i++)
    {
        addCheckbox(ingredients[i])
    }


    return data;
}

//Создание новых объектов - галочек и подписей
function addCheckbox(ingr) {
    const newCh = document.createElement("input");
    newCh.type = "checkbox";
    newCh.id = ingr;
    newCh.name = ingr;
    newCh.setAttribute("onclick", "addIngridient(this)");

    const newP = document.createElement("label");
    newP.for = ingr;
    newP.id = "label"+ingr;
    const Content = document.createTextNode(ingr);
    newP.appendChild(Content);
    checkboxes.push(newP);
    checkboxes.push(newCh);
  }

//Отображение галочек
  function displayCheckboxes(parent)
  {
    const current = document.getElementById(parent);
    for (var i=0; i<checkboxes.length; i++)
        current.appendChild(checkboxes[i]);
  }

/*Проверяем, какой кофе смешал пользователь. 
Сравнение текущей смеси (mix) со всеми, что есть в data*/
function chexkmix(data, mix) {
    mix=mix.sort().toString();
    var ch = -1;
    for (var i=0; i<data.length; i++)
    {
        if ((data[i].ingredients).sort()==mix)
            ch = data[i]
    }
    console.log(ch);
    return ch;
}

/*Добавление ингридиента в кофе по клику на чекбокс
Если такой ингридиент уже есть - убрать его
Иначе добавить*/
function addIngridient(me){
    if (Mix.includes(me.id))
    {
        Mix = Mix.filter(function(e) { return e !== me.id })
    }
    else
    {
        Mix.push(me.id);
    }
    var mixinfo = chexkmix(alldata, Mix);
    if (Mix.length == 0)
    {
        document.getElementById('mixname').innerHTML = 'Start mixing :)';
        document.getElementById('image').src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Kawaii_paper_coffee_cup_clip_art.svg";
        document.getElementById('description').innerHTML = '';
    }
    else if (mixinfo == -1)
    {
        document.getElementById('mixname').innerHTML = 'No such mix :(';
        document.getElementById('image').src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Tired_Man_Drinking_Coffee_Cartoon_Vector.svg";
        document.getElementById('description').innerHTML = '';
    }
    else 
    {
        document.getElementById('mixname').innerHTML = mixinfo.title;
        document.getElementById('image').src=mixinfo.image;
        document.getElementById('description').innerHTML = mixinfo.description;
    }
};

