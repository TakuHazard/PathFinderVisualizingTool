import React, {useState, useRef, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group'
import '../index.css'
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';



export function Navbar(props){
    return(
        <nav className = "navbar">
            <ul className = "navbar-nav"> {props.children} </ul>
        </nav>
    );
}

export function NavItem(props){
    const [open,setOpen] = useState(false)
    if(props.icon == null){
        return (
            <li className = "nav-item">
                <a href = "#" className = "icon-button" onClick = {()=> setOpen(!open)}>

                </a>
                {open && props.children}
            </li>
        )
    }
    return(
        <li className = "nav-item">
            <a href = "#" className = "icon-button" onClick = {()=> setOpen(!open)}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    );
}

export function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
    function DropdownItem(props) {
      return (
        <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    }
  
    return (
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem>About</DropdownItem>
            <DropdownItem
                leftIcon = {<BoltIcon/>}
            >Clear Board
            </DropdownItem>
            <DropdownItem
              leftIcon="🦧"
              rightIcon={<ChevronIcon />}
              goToMenu="algorithms">
              Choose Algorithm
            </DropdownItem>
            <DropdownItem
                leftIcon = "{}"
                rightIcon = {<ChevronIcon />}
                goToMenu = "createMaze">
            Create Maze
            </DropdownItem>
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="settings">
              Settings
            </DropdownItem>

  
          </div>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu === 'settings'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>Settings</h2>
            </DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Speed</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Music</DropdownItem>
          </div>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu === 'algorithms'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>Algorithms</h2>
            </DropdownItem>
            <DropdownItem leftIcon="🦘">Djikstra's Algorithm</DropdownItem>
            <DropdownItem leftIcon="🐸">A-star Algorithm</DropdownItem>
            <DropdownItem leftIcon="🦋">Depth First</DropdownItem>
            <DropdownItem leftIcon="🦔">Breadth First</DropdownItem>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'createMaze'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>Create Maze</h2>
            </DropdownItem>
            <DropdownItem leftIcon="🦘">Randomized Maze</DropdownItem>
            <DropdownItem leftIcon="🐸">Kruskal's</DropdownItem>
            <DropdownItem leftIcon="🦋">Prim's</DropdownItem>
            <DropdownItem leftIcon="🦔">Recursive Backtracker</DropdownItem>
          </div>
        </CSSTransition>
      </div>
    );
  }
  
