import React, { Component } from 'react';
import {Actions, DefaultRenderer} from 'react-native-router-flux';


import MenuContent from '../components/MenuContent';
import NavBarCustom from '../components/NavBar';
import Drawer from 'react-native-drawer';

class Menu extends Component {

  render(){
    const state = this.props.navigationState;
    const children = state.children;
      return (
        <Drawer
          ref="navigation"
          open={state.open}
          onOpen={()=>Actions.refresh({key:state.key, open: true})}
          onClose={()=>Actions.refresh({key:state.key, open: false})}
          type="overlay"
          content={<MenuContent />}
          tapToClose={true}
          side="left"
          openDrawerOffset={0.4}
          panCloseMask={0.2}
          negotiatePan={true}
        >
          <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        </Drawer>
       );
   }
}

export default Menu;
