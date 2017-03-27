import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { loadItems } from '../../data/requests.js';
import RaisedButton from 'material-ui/RaisedButton';
import RequestView from './View.js';
import Dialog from 'material-ui/Dialog';
import './List.css';

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
          <Link to={{pathname: `/items/${obj.Item.Id}`,state: { modal: true }}}>
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

        <div className="itemsList">
        {itemsNodes} 
        </div> 
        )
    }
    return null
  }
}

const styles = {
  dialogRoot: {
    paddingTop: 0
  },
  dialogBody: {
    minHeight: 400,
    background:"#eee",
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  dialogTitle: {
    fontSize: 18,
    padding:"10px 20px",
    background:"#eee"
  }
};

const Modal = ({ match, history }) => {

if (match.isExact) {
  var modalOpen = true
}

  const back = () => {
    var modalOpen = false;
    history.goBack();
  }
  
  return (

   <Dialog modal={false} open={modalOpen} onRequestClose={back} autoScrollBodyContent={true} className="itemModal"
        bodyStyle={ styles.dialogBody } style={ styles.dialogRoot } titleStyle={ styles.dialogTitle} repositionOnUpdate={ false }>
    <RequestView modalId={match.params.Id}/>
    {/*<button type='button' onClick={back}>Close</button>*/}
 
    </Dialog>
 
    )
}

class ItemsList extends React.Component {

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
    if ( nextProps.history.action !== 'POP' && (!location.state || !location.state.modal) ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
  console.log('location: ' + JSON.stringify(this.props))
  const { location } = this.props
  const isModal = !!(
    location.state && location.state.modal && this.previousLocation !== location // not initial render
  )


    return (  
      <div className="itemsListWrap">  
            <div className="overflowFixBeta">
        <div className="container">
        <div className={"table " + (isModal ? "isModal" : "notModal")}>
        <div className="leftSide">
        asdasd
        </div>
        <div className="contentWrap tableCell full vatop">

        <div className="content colWrap productList">
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/items' component={Items} />
          <Route exact path='/items/:Id' component={RequestView}/>
        </Switch>
        {isModal ? <div className="modalView"><Route path='/items/:Id' component={Modal} /></div> : null}
        </div>
        </div>
        </div>
        </div>
          </div>
      </div> 
    )
  }
}



export default ItemsList;