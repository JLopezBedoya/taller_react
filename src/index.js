import React, { useState, useReducer, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import carg from "./assets/loading.jpg";
import "./style.css"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
function App(){
  return(
    <div id='general'>
      <Convertidor/>
      <Contador/>
      <ListaTareas/>
      <Galeria/>
    </div>
  )
}

function Contador(){
  const [cont, setCont] = useState(0)
  return(
    <div>
      <h3>{cont}</h3>
      <button onClick={()=>setCont(cont+1)}>+</button>
      <button onClick={()=>setCont(cont-1)}>-</button>
    </div>
  )
}

const ListaTareas = () => {

    const inputRef = useRef()

    const [tareas, dispatch] = useReducer((state = [], action) => {
        switch (action.type){
            case "Agregar-Tarea":{
                return [
                    ...state,
                    { id: state.length, titulo: action.titulo }
                ]
            }
            case "Eliminar-tarea":{
                return state.filter((tarea, index) => index !== action.index);
            }
            default:{
                return state;
            }
        }
    })

    const handSub = (event) => {
        event.preventDefault();
        dispatch({
            type: "Agregar-Tarea",
            titulo: inputRef.current.value
        })
    }

    return <div><h1>Lista de tareas</h1>
    <form onSubmit={handSub}>
        <label>Tarea</label>
        <input type='text' name='titulo' ref={inputRef}/>
        <input type='submit' value="enviar"/>
    </form>
    <div className='tareas'>
        {tareas && tareas.map((tarea, index) => (
            <div className='tarea' key = {index}>
                <p>{tarea.titulo}</p>
                <button onClick={() => dispatch({type: "Eliminar-tarea", index})}>Eliminar Tarea</button>
            </div>
        ))}
    </div>
    </div>
}
function Galeria(){
  const [pct, setPct] = useState(null)
  useEffect(()=>{
    fetch("https://api.thecatapi.com/v1/images/search?limit=5")
    .then(res=>res.json())
    .then(data=>setPct(data))
  },[])
  return(
    <div id='galeria'>
      <div className='fgaleria'>
        <img className='fgaleria' src={(pct!==null)? pct[0].url:carg} alt="..."/>
      </div>
      <div className='fgaleria'>
        <img className='fgaleria' src={(pct!==null)? pct[1].url:carg} alt="..."/>
      </div>
      <div className='fgaleria'>
        <img className='fgaleria' src={(pct!==null)? pct[2].url:carg} alt="..."/>
      </div>
      <div className='fgaleria'>
        <img className='fgaleria' src={(pct!==null)? pct[3].url:carg} alt="..."/>
      </div>
      <div className='fgaleria'>
        <img className='fgaleria' src={(pct!==null)? pct[4].url:carg} alt="..."/>
      </div>
      <div className='fgaleria'>
        <img className='fgaleria' src={(pct!==null)? pct[5].url:carg} alt="..."/>
      </div>
        
    </div>
  )
}
function Convertidor(){
  const fah = useRef()
  const cel = useRef()
  const [c, setC] = useState()
  const [f, setF] = useState()
  const celsius = ()=>{
    setC(((fah.current.value - 32) * 5/9))
  }
  const fahrenheit = ()=>{
    setF(((cel.current.value * 9/5) + 32))
  }
  return(
    <div>
      <label>fahrenheit: {f} </label>
      <input ref={fah} onChange={celsius}/>
      <label>celsius: {c} </label>
      <input ref={cel} onChange={fahrenheit}/>
    </div>
  )
}