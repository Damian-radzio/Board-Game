(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const c of a)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const c={};return a.integrity&&(c.integrity=a.integrity),a.referrerPolicy&&(c.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?c.credentials="include":a.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(a){if(a.ep)return;a.ep=!0;const c=o(a);fetch(a.href,c)}})();let A,r=1;const b=e=>A=e,E=e=>r=e,h={totalNumberOfStitches:0,totalNumberOfThrows:0},N={gameInfoText:"Przegrałeś... Aby rozpocząć od nowa kliknij przycisk",restartGameBtnText:"Spróbuj jeszcze raz",bodyClassName:"body-end-game-defeat"},U={gameInfoText:"WYGRANA! Aby rozpocząć od nowa kliknij przycisk",restartGameBtnText:"Zagraj jeszcze raz",bodyClassName:"body-end-game-win"},Y=()=>{h.totalNumberOfThrows++,h.totalNumberOfStitches+=A},v=e=>{const t=document.createElement("button"),o=document.querySelector(".game-info");(()=>{const a=document.querySelectorAll(".dice");a.forEach(s=>s.classList.add("hidden")),f.classList.add("hidden"),t.classList.add("restart-game-btn"),t.textContent=e.restartGameBtnText;const c=document.createElement("p");c.textContent=e.gameInfoText,document.body.classList.add(e.bodyClassName);const l=document.createElement("div");l.classList.add("game-stats"),l.innerHTML=`
    <h2>STATYSTYKI GRY</h2>
    <p>łączna liczba rzutów kostką: ${h.totalNumberOfThrows}</p>
    <p>Średnia liczba wyrzuconych oczek: ${(h.totalNumberOfStitches/h.totalNumberOfThrows).toPrecision(2)}</p>
        `;const n=()=>{u.forEach(m=>m.classList.remove("jumpedOn"));const s=document.getElementById("field-1");s==null||s.classList.add("first-field"),s==null||s.classList.add("active-field"),s==null||s.classList.add("jumpedOn"),f.classList.remove("hidden"),a.forEach(m=>m.classList.remove("hidden")),document.body.classList.remove(e.bodyClassName),o==null||o.removeChild(c),o==null||o.removeChild(t),o==null||o.removeChild(l),h.totalNumberOfStitches=0,h.totalNumberOfThrows=0,E(1),t.removeEventListener("click",n,!0)};o==null||o.append(c,t,l),t.addEventListener("click",n,!0)})()},S=(e,t)=>Math.floor(Math.random()*(t-e+1)+e),g=()=>{document.body.classList.add("warning"),setTimeout(()=>{document.body.classList.remove("warning")},2e3)},w=e=>{E(e),d.forEach(t=>t.classList.add("hidden")),setTimeout(()=>{u.forEach(t=>t.classList.remove("jumpedOn")),u[r-1].classList.add("jumpedOn"),d.forEach(t=>t.classList.remove("hidden"))},500)},G=()=>{setTimeout(()=>{r===12?(d.forEach(e=>e.classList.add("hidden")),g(),setTimeout(()=>{v(N)},2e3)):r===20?v(U):r===19&&(g(),y(),d.forEach(e=>e.classList.add("hidden")),setTimeout(()=>{w(11),d.forEach(e=>e.classList.add("hidden"))},2e3))},A*500)},O=()=>{let e=1;if(r+A<=p){for(let t=r;t<=r+A-1;t++)e++,setTimeout(()=>{u.forEach(o=>o.classList.remove("jumpedOn")),u[t].classList.add("jumpedOn")},e*350);E(r+A),G()}else r+A>p&&(g(),setTimeout(()=>{d.forEach(t=>t.classList.add("hidden"))},1e3),setTimeout(()=>{E(p-(r+A-p));for(let t=p;t>=r-1;t--)e++,setTimeout(()=>{var o;u.forEach(i=>i.classList.remove("jumpedOn")),(o=u[t])==null||o.classList.add("jumpedOn")},e*350)},2e3),setTimeout(()=>{d.forEach(t=>t.classList.remove("hidden"))},4e3),G());d.forEach(t=>t.removeEventListener("click",z))},y=()=>{d.forEach(e=>e.classList.remove("active-dice")),setTimeout(()=>{d.map(e=>{e.className.includes(`${A}`)&&(e.classList.add("active-dice","blocked-dice"),setTimeout(()=>{e.classList.remove("blocked-dice")},1e3+400*A))})},100)},z=()=>(b(S(1,C)),y(),setTimeout(()=>{O()},500),Y(),A),P="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABvElEQVR4nO3XT4hNYRjH8U+S0rAY2Qg1GwsSmYiljNnYoWsl8ieyYadhJxZSNjJLK1HYzEKJu1H+RMpitkpJMRNFmYXd6K3fmY5xTaPGvcp56qlznvM+7+97nvO8770v/4AN4kSPfEsB+Iox3O2yj0XbNPp7UPn+aP8EcBD30cYVLMGt3Ff+EOvRhxtYXJv0QsY8wJnEbnbI39AJYGNKchwH8BqHMYQWJnEW+yN+LLl7awCvcBGH8B57sCv5HzGS/GWdAHbiHQawPG+5ujb52zRsZS/wNG9bByhAq/ASR2rP3mDbXJ9gUUr6PbEnIe0EsAlfIvQt0BXAdPxRKjVvgJWpQrGleIajvwEYrQkVv1QDGMY9XKvlzgtgOyZwCqdzPdQBoC+9sjV5u/EhzVgBrM2YzX8CUOwk7uB2Gqlu57AiY8/PenY5VSudvyax0sg7amNGUuU5AbppMwCf8XjWWu2GF81PBWBd1ulVjGetTya2kF7tI+PRakV7xlohG0zDLbRVTdyO1i/WagA0n0DThJpl2G42Is1W7D/8MRrNUel5/geWAVN/4Sg2lbknolVi1wvAvh4eTuuHmt7YD8qBAzecteIRAAAAAElFTkSuQmCC",B="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVR4nO2Xyw7CMAwE9/8/Cw4IfmoRXHqII6UNEmtpRvKtL3e8SSsdvCS5Wd1V4KY1sHxgweWbbl7PZ06mEWFEjNYHMiJWrSlm+dWPd9fNN73C6Q2RRgowUsBombAfkJECMuLuGVmBX90J5qNRjNYXMjLBZERkpE9GHF4Dbli3sY39cYjBNBKGMRKGMRKGMRKGMRKGMRKGMRKGMRLGszDy+PdDrfIGCNgTCSSzzaMAAAAASUVORK5CYII=",k="data:image/png;base64,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",C=6,p=20,d=[],u=[],f=document.createElement("div");(function(){const e=document.getElementById("board");for(let n=1;n<=p;n++){const s=document.createElement("div");s.classList.add("board-field"),s.id=`field-${n}`,e==null||e.appendChild(s);const m=document.createElement("span");m.classList.add("field-number-span"),m.innerHTML=n.toString(),s.appendChild(m),u.push(s)}const t=document.getElementById("field-1");t==null||t.classList.add("first-field","active-field","jumpedOn");const o=document.createElement("img");o.src=P,t==null||t.appendChild(o);const i=document.getElementById(`field-${p.toString()}`),a=document.createElement("img");a.src=B,i==null||i.appendChild(a),i==null||i.classList.add("last-field"),[document.getElementById("field-12"),document.getElementById("field-19")].map(n=>{n==null||n.classList.add("special-field");const s=document.createElement("img");s.src=k,n==null||n.appendChild(s)});for(let n=1;n<=C;n++){const s=document.createElement("div");s.classList.add("dice",`dice-${n}`),document.body.appendChild(s);for(let m=1;m<=n;m++){const L=document.createElement("div");L.classList.add("dice-dot",`dot-${m}`),s.appendChild(L)}d.push(s)}f.innerHTML=`
    <h2>INSTRUKCJA</h2>
    <p>1. Uważaj na pole 12! Wejdziesz? Przegrywasz!</p>
    <p>2. Uważaj na pole 19! Wejdziesz? Cofasz się do pola o numerze 11!</p>
    <p>3. Gra kończy się wygraną poprzez wejście na pole 20.</p>
    <p>4. UWAGA! Jeśli przekroczysz pole mety cofasz się z niej o tyle pól o ile ją przekroczyłeś.</p>
  `,f.classList.add("instruction"),document.body.appendChild(f);const l=document.createElement("div");l.classList.add("game-info"),document.body.appendChild(l)})();d.findIndex(e=>e.className.includes("active-dice"))===-1&&d[0].classList.add("active-dice");d.forEach(e=>e.addEventListener("click",z,!0));