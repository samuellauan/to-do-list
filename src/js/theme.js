// Toggle Light/Dark Mode
export function toggleMode() {
  const html = document.documentElement;
  const btnSwitch = document.querySelector('#switch');

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    html.classList.add('light');
  } else {
    html.classList.remove('light');
}

  btnSwitch.addEventListener('click', () => {
    document. documentElement.classList.toggle("light")
    
    if (html.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
  })
 
}
  