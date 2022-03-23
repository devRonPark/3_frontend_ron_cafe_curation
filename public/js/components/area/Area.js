export default function createAreaElem(className) {
  const areaElem = document.createElement('div');
  areaElem.classList.add(className);
  return areaElem;
}
