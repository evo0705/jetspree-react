import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { loadItems } from '../../data/requests.js';
import RaisedButton from 'material-ui/RaisedButton';
import RequestView from './View.js';
// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on you got there.
//
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.

class Items extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData(){
    let paramItems = {
      pagesize: 20
    };

    loadItems(paramItems).then((data) => {
      this.setState({items: data});
    });
  }

  render() {
    if(this.state.items.Items) {
      let itemsNodes = this.state.items.Items.map((obj, i) => {
        return (  
        
          <div className="colMd6 col" key={obj.Item.Id}>
        
          <Link to={{pathname: `/ModalSwitch/item/${obj.Item.Id}`,state: { modal: true }}}>

          <div className="bgWhite relative">
          <div className="imgWrap">
            <img src={'https://www.jetspree.com/images/requests/' + obj.Item.Id + '/' + obj.Item.ItemURL} alt="hould be here" />
          </div>
          <div className="productInfo"><h4>{obj.Item.Name}</h4>
          <div className="mgBottom">{obj.Item.CurrencyCode}{obj.Item.OfferPrice}</div>
          <RaisedButton label="Buy" primary={true} className="pullRight abBottomRight"/>
          </div>
          </div>
            </Link>
          </div>
          )
      });

      return (  
    
        <div className="frontPageItemsList">
            {itemsNodes} 
        </div> 
      )
    }
    return null
  }
}



class ModalSwitch extends React.Component {

  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/images/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/images/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/images/2`.
  previousLocation = this.props.location



  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }



  render() {
  	 //console.log('location: ' + JSON.stringify(this.props))
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )

      return (  
        <div className="frontPageItemsList">
   
          <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/ModalSwitch' component={Items} />
          <Route path='/ModalSwitch/item/:Id' component={RequestView}/>
        </Switch>
        {isModal ? 
        <div className="modalView">
        <Route path='/ModalSwitch/item/:Id' component={Modal} />
        </div> 
        : null}
        </div> 
      )

  }
}


const Modal = ({ match, history }) => {
console.log(match)
  const back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  return (
    <div onClick={back} style={{position: 'fixed',top: 0,left: 0,bottom: 0,right: 0, background: 'rgba(0, 0, 0, 0.15)', zIndex: 9999, overflow: 'scroll'}}>
      <div className='modal' style={{position: 'absolute',background: '#fff',top: 25,left: '10%',right: '10%',padding: 15,border: '2px solid #444'}}>
     <RequestView modalId={match.params.Id}/>
        <button type='button' onClick={back}>
          Close
        </button>
      </div>
    </div>
  )
}


export default ModalSwitch;