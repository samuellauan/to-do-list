// Toggle Light/Dark Mode
export function toggleMode() {
  const button = document.querySelector('.theme')

  button.addEventListener('click', () => {
    document.documentElement.classList.toggle("light")
  })
 
}
  