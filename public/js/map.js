var data1 = (JSON.parse(document.querySelector('#sendData').dataset.testValue))[0].bodyTitle;
const data = [   //tumanlar haqidagi ma'lumotlar 
  {
    title1: "qoraqalpog'iston", title2: "3 Interesting facts",
    desc1: "sdfsdfsd", 
    desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", 
    desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "xorazm", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "navoiy", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "buxoro", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "jizzax", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "samarqand", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "qashqadaryo", title2: "3 Interesting facts",
    desc1: data1.kashkadaryaFact1, 
    desc2: data1.kashkadaryaFact2, 
    desc3: data1.kashkadaryaFact3
  },
  {
    title1: "termiz", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "sirdaryo", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "toshkent va toshkent viloyati", title2: "3 Interesting facts",
    desc1: data1.tashkentFact1, 
    desc2: data1.tashkentFact2, 
    desc3: data1.tashkentFact3
  },
  {
    title1: "andijon", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "namangan", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },
  {
    title1: "farg'on", title2: "3 Interesting facts",
    desc1: "Tashkent is an ancient city. Its over 2200 years old.", desc2: " Especially for tourists, double-decker buses of bright red color run around Tashkent. They help to see the most interesting places in the city in short time.", desc3: "the city is dominated by low-rise buildings. Thetallest building is the TV tower with a height of 375meters"
  },

];




window.addEventListener("DOMContentLoaded", () => {
  const mapVil = document.querySelector("#map-uz"),
    content = document.querySelector(".map-content");

  var generatedHTML = "";
  mapVil.addEventListener("click", event => { //xaritani biror joyiga bosganda targetni olish uchun listener
    var targetValue = event.target.getAttribute('tuman'); //bosilganda "tuman" atributidan bosilgan tuman nomini o'zgaruvchiga olvolish
    for (let item of data) { //data obyektini aylanib chiqib bosilgan tuman nomi bilan data dagi tumanlarni solishtirish va mos kelganini htmlga yozish;
      if (targetValue == item.title1) {
        generatedHTML = `
        <h2 class="text-2xl font-bold text-logoColor uppercase text-center">${item.title1}</h2>
        <h3 class="text-center text-xl font-semibold">
        ${item.title2}
        </h3>
        <ul class="list-disc ml-5 text-lg">
          <li class="mt-3">${item.desc1}</li>
          <li class="mt-3">${item.desc2}
          </li>
          <li class="mt-3">
          ${item.desc3}
          </li>
        </ul>`
      }
    }

    content.innerHTML = generatedHTML
  })
});
