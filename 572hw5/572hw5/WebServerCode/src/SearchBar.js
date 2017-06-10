import Autocomplete from 'react-autocomplete';
import SolrFetch from './solrFetch';
import {styles} from './style';
import React from 'react';
import ReactDOM from 'react-dom';
const example = 'mytest';
import { Grid, Row, Col } from 'react-flexbox-grid';
export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            suggestItems: [],
            resultItems:[],
            inputValue: '',
            lastToken:'',
            didYouMean:'',
            snippets:[],
            totalNum:0,
        }
    }
    onSelectItem(value, item){
        console.log(value);
        let sup = item.term.substring(this.state.lastToken.length);
        let inputValue = this.state.inputValue + sup;
        this.setState({
            inputValue: inputValue
        })
    }
    onChangeInputValue(value){
        this.setState({
            isLoading: true,
            inputValue:value,
        })
        let tokens = value.split(/\s+/);
        if(tokens.length === 0) return;
        let token = tokens[tokens.length - 1];
        if(token.length === 0 || token[0] === '') return;
        this.setState({lastToken:token});
        SolrFetch.fetchSuggestions(token.toLowerCase(),example)
        .then(result=>{
            this.setState({
                suggestItems: result,
                isLoading: false,
            })
        }).catch(err=>{
        });
    }
    sortItems(itemA, itemB, value){
        return itemA.weight < itemB.weight;
    }
    onClick(){
        this.setState({
            isLoading: true
        })
        SolrFetch.fetchResult(this.state.inputValue, example)
        .then(result=>{
            this.setState({
                isLoading: false,
                resultItems:result.items,
                didYouMean:result.isChanged?result.query:'',
                totalNum:result.numFound
            })
            return result;
        })
        .catch(err=>console.log(err));
    }
    render(){
        let inputProps = {
            style : {
                width: 500,
                height: 30,
                fontSize:25,
                marginLeft:40
            }
        }
        let totalNum = this.state.totalNum > 0 ?<div style={{marginLeft:40,marginTop:20}}>Total {this.state.totalNum} results</div>:null;
        let didYouMean = this.state.didYouMean.length>0?
            <span style={{marginLeft:40}}>Did you mean: {this.state.didYouMean}?</span>:null;
        return (
            <div>
            <Row>
                <Col xsOffset={0} >
                    <Autocomplete
                        value={this.state.inputValue}
                        inputProps={inputProps}
                        items={this.state.suggestItems}
                        getItemValue={(item) => item.term}
                        onSelect={(value,item) => this.onSelectItem(value,item)}
                        onChange={(event,value) => this.onChangeInputValue(value)}
                        sortItems = {(itemA, itemB, value) => this.sortItems(itemA, itemB, value)}
                        renderItem={(item, isHighlighted) => (
                            <div
                                style={isHighlighted ? styles.highlightedItem : styles.item}
                                key={item.term}
                                id={item.term}
                                >{item.term}</div>
                            )}
                    />
                    <img src="../res/images/ic_go.png"
                        alt="go"
                        style={{width:25, height:25, marginLeft:10}}
                        onClick={()=>this.onClick()}
                    />
                </Col>
            </Row>
                {totalNum}
                {didYouMean}
                {/**<table class="table table-hover" style={styles.table}>
                    <tr>
                		<th>Title</th>
                		<th>Link</th>
                		<th>Snippet</th>
                	</tr>
                {this.state.resultItems.map((item, i, arr)=>{
                    return <tr>
                		<td>Title: {arr[i].title}</td>
                		<td><a href={arr[i].title}>Link: {arr[i].url}</a></td>
                		<td>Snippet: {arr[i].snippet}</td>
                	</tr>
                })}
            </table>**/}
              <div class="list-group">
                  {this.state.resultItems.map((item, i, arr)=>{
                      return <div style={{marginLeft:40,marginRight:320}}>
                  		<h4 class="list-group-item-heading">{arr[i].title}</h4>
                  		<a href={arr[i].url}>{arr[i].url}</a>
                  		<p class="list-group-item-text">{arr[i].snippet}</p>
                        <hr/>
                  	</div>
                  })}
              </div>
        </div>
        )
    }
}
