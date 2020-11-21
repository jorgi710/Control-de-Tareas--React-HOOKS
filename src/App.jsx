import React, {useState} from 'react'
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListGroup, Form} from 'react-bootstrap';
import shortid from "shortid"

function App() {


    const [tarea, setTarea] = useState("") 
    const [lista, setLista] = useState([]) 
    const shortid = require('shortid');
    const [modoEdicion, setmodoEdicion] = useState(false)
    const [id, setId] = useState("")
    const [error, setError] = useState(null)
    

    const guardarDatos = (e) => {
      e.preventDefault()
      
      if(!tarea.trim()){
        console.log("Porfavor complete la columna tarea");
        setError("Escriba algo por favor")
        return

      }

      setLista([
        ...lista,
        {id: shortid.generate(), Pendientes:tarea}
      ])



      console.log("Procesando datos...");

      e.target.reset()
      setTarea("")
      setError(null)
    }

    const eliminarTareas = id => {
      // console.log(id);

      const arrayFiltrado = lista.filter(item => item.id !== id)
      setLista(arrayFiltrado)
    }

    const editar = item =>{
      console.log(item)
      setmodoEdicion(true)
      setTarea(item.Pendientes)
      setId(item.id)
    }
    const editarTarea = e => {
      e.preventDefault()      
      if(!tarea.trim()){
      console.log("Porfavor complete la columna tarea");
      setError("Escriba algo por favor")
      return
    }
    const arrayEditado = lista.map(item => item.id === id ? {id:id, Pendientes:tarea} : item)
    setLista(arrayEditado)
    setmodoEdicion(false)
    setTarea("")
    setId("")
    setError(null)
    
  }


  return (
    <div className=" text-center mt-3 p-2" style={{backgroundColor:"#dad7d7"}}>
      <h1 className="text-uppercase">CONTROL DE TAREAS</h1>
      <hr className=" bg-dark"/>
      <div className="row text-uppercase  ">
        <div className="col-8 lead">
        <h2>Tareas</h2>
      <ListGroup >   
    {

        lista.length === 0 ? (
          <p className="float-center ml-2 lead text-center  ">No hay tareas</p>         
          ) : (
            lista.map( (item) =>(
              <ListGroup.Item className="lead text-center " key={item.id}>
              <span className="mr-5" >{item.Pendientes} </span> 
              <button className="btn btn-success float-right ml-2" onClick ={ () => editar(item)} >Editar</button>
              <button className="btn btn-danger  float-right" onClick={ () => eliminarTareas(item.id)}>Eliminar</button>
            </ListGroup.Item> 
    
          ))
          
        )         
    
    }


      
      </ListGroup>
        </div>
        <div className="col-4 ">
        <h2 className="text-body">
          {
            modoEdicion ? "Editar" : "Agregar Tareas"
          }
        </h2>
        <Form onSubmit={modoEdicion ? editarTarea : guardarDatos}>

          {
            error ? <span className=" text-danger">{error}</span> : null
          }

            <Form.Group className="lead text-center ">              
              <Form.Control type="text" placeholder="Digita una nueva tarea" onChange={ (e) => setTarea(e.target.value)} value={tarea}/>
              {
                modoEdicion ? (
                  <button className="btn btn-warning float-center mt-2" type="submit">Editar Tarea</button>
                ) : (
                  <button className="btn btn-danger float-center mt-2" type="submit">Agregar Tareas</button>
                )
              }




              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
        </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
