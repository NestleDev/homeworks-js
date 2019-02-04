import { randomBytes } from "crypto";

/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
  const clientHeight = window.innerHeight;
  const clientWidth = window.innerWidth;
  const heightElement = randomSize(300);
  const widthElement = randomSize(300);
  const div = document.createElement('div');

  div.classList.add('draggable-div');
  div.style.width = `${widthElement}px`;
  div.style.height = `${heightElement}px`;
  div.style.backgroundColor = `rgb(${randomSize(255)}, ${randomSize(255)}, ${randomSize(255)})`;
  div.style.position = 'absolute';
  div.style.top = `${calcAxis(clientHeight, heightElement)}px`;
  div.style.left = `${calcAxis(clientWidth, widthElement)}px`;

  function randomSize(size = 100) {
    return (size / 100) * (Math.random() * 100);
  }

  function calcAxis(sizeWindow, size) {
    const shift = randomSize(sizeWindow);
    const fullAxis = shift + size;

    return fullAxis > sizeWindow ? shift - (fullAxis - sizeWindow) : shift;
  }

  return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
  let translateY;
  let translateX;

  document.querySelector('body').style.overflow = 'hidden';

  function handlerMouseMove(e) {
    target.style.top = `${e.clientY - translateY}px`;
    target.style.left = `${e.clientX - translateX}px`;
  }

  target.addEventListener('mouseenter', () => {
    target.style.cursor = 'grab';
  });

  target.addEventListener('mousedown', (e) => {
    translateY = e.offsetY;
    translateX = e.offsetX;
    target.style.cursor = 'grabbing';

    window.addEventListener('mousemove', handlerMouseMove);
  });

  target.addEventListener('mouseup', (e) => {
    target.style.cursor = 'grab';

    window.removeEventListener('mousemove', handlerMouseMove);
  });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  // создать новый div
  const div = createDiv();

  // добавить на страницу
  homeworkContainer.appendChild(div);

  // назначить обработчики событий мыши для реализации D&D
  addListeners(div);
  // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
  // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
  createDiv
};
