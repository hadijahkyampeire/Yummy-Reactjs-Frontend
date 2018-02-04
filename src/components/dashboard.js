import React, { Component } from 'react';

class Categories extends Component {
    render() {
      return (
        <div >
    <div id="recipebar">
    <div className="container">     
                                 
  <h2>Create Your Yummy Recipes</h2>                                     
    <h3><label >Recipe category</label></h3>
        <input type="text" name="title"  placeholder="recipe category" />
            
            <input type='submit' class="btnrecipeadd" value='Add Category'/>

        <input type='button'class="btnrecipeedit" value='Edit Category'/>
        <input type='submit' class="btnrecipedel" value='Delete Category'/>
 </div>
    </div>
    </div>
      );
    }
  }
export default Categories;