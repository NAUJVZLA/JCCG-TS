import './style.css'
import login from '../public/login.svg'
import register from '../public/registerlogo.svg'
import { setupCounter } from './model/func/counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class = "tituloEmpresa"> 
    <h1 class="datah1" >Data</h1> <h1 class="leakerh1">Leaker </h1> <h1 class="gatesh1" >Gates</h1></div>
  <div>
    <a href="/src/model/links/register.html">
      <img src="${register}" class="logo" alt="register" title="REGISTRATE" /></a>
    <a href="/src/model/links/login.html">
      <img src="${login}" class="logo vanilla" alt="TypeScript logo" title="ENTRAR" /></a>

<a href="dashboard.html">1</a>
<a href="prueba.html">2</a>
    
  
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

