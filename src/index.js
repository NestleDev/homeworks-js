/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let items = [];

  for (let i = 0; i < array.length; i++) {
    items.push(fn(array[i], i, array));
  }

  return items;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  let index;
  let previous;

  if (initial) {
    index = 0;
    previous = initial;
  } else {
    index = 1;
    previous = array[0];
  }

  for (let i = index; i < array.length; i++) {
    previous = fn(previous, array[i], i, array);
  }

  return previous;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  return Object.keys(obj)
    .map(prop => prop.toUpperCase());
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
  let items = [];

  from = from < 0 ? array.length - Math.abs(from) : from;
  from = from < 0 && Math.abs(from) > array.length ? 0 : from;
  to = to < 0 ? array.length - Math.abs(to) :
    to > array.length ? array.length : to;

  for (let i = from; i < to; i++) {
    items.push(array[i]);
  }

  return items;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value * value;

      return true;
    }
  });
}

export {
  forEach,
  map,
  reduce,
  upperProps,
  slice,
  createProxy
};
