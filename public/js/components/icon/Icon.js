export default function createIcon(classList) {
  const icon = document.createElement('i');
  icon.classList.add(...classList);
  return icon;
}