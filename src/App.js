import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class App extends Component {

	constructor(props) {
		super(props);
		this.searchRecipe = this.searchRecipe.bind(this);
		this.renderRecipes = this.renderRecipes.bind(this);
		this.state 		  = {results: []};
	}


	searchRecipe() {
		let base_url ='https://www.food2fork.com/api/search';
		let qs = '?key=6d3abb02a8b7490ab68e86a18278ee8f&q='+this.q.value+'&sort=r';
		fetch(base_url+qs).then(function(response) {
			return response.json();
		})
		.then(api_response => {
			var results = new Array();
			var test = Object.keys(api_response.recipes).map(function(key) {
			results[key] = api_response.recipes[key];
			});
			this.setState({results});
		});
	}


	renderRecipes(){
			return this.state.results.map((item,i)=> <div className="recipe_wrapper col-md-4 col-lg-4 col-sm-4"><img src={item.image_url} height="200px" /><ul><li><a target="_blank" href={item.f2f_url}>{item.title}</a></li><li><label>Publisher:</label>{item.publisher}</li></ul></div>)
	}


  render() {
    return (
      <div className="container">
        <Header/>
        <div className="wrapper">
		<form className="form-signin">
		<h1 className="h3 mb-3 font-weight-normal">Search ingredient here</h1>
		<label htmlFor="q" >Main ingredient</label>
		<input ref={(input) => this.q = input} type="text" id="q" className="form-control"  placeholder="Main ingredient comma seperated"  required="" autoFocus="" />
		<input className="btn btn-lg btn-primary btn-block margin-25" onClick={this.searchRecipe} type="button" value="Search" />
		</form>
		</div>
		<div className="clearfix"></div>
		<div className="row margin-25">{this.renderRecipes()}</div>
        <Footer/>
      </div>
    );
  }
}
export default App;