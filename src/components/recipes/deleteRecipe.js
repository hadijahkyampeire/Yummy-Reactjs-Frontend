import React from 'react';

const DeleteRecipe =(props)=>(
    <div className="modal fade" id={`delete_recipe${props.id}`} 
    tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div className="modal-dialog" role="document">
     <div className="modal-content">
       <div className="modal-header">
         <h4 className="modal-title" id="exampleModalLabel">Delete {props.title}</h4>
         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div className="modal-body">
         <h5>Are you sure you want to delete <strong> {props.title} </strong> ? </h5>
       </div>
       <div className="modal-footer">
         <button type="button" className="btn btn-secondary" data-dismiss="modal" id={`closeModal${props.id}`}>Close</button>
         <button type="button" className="btn btn-danger" onClick={props.deleteRecipe} to={`#`}>Delete</button>
       </div>
     </div>
   </div>
 </div>
)
export default DeleteRecipe;