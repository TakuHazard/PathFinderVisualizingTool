import React, {useState, useRef, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group'
import '../index.css'
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as Heart } from '../icons/heart.svg';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';
import { ReactComponent as UserGuide } from '../icons/user-guide.svg';
import { ReactComponent as Algorithm } from '../icons/algorithm.svg';
import { ReactComponent as Maze } from '../icons/maze.svg';
import { ReactComponent as Support } from '../icons/support.svg';
import { ReactComponent as Headphones } from '../icons/headphones.svg';









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
            <DropdownItem goToMenu = "selectAbout" leftIcon = {<Heart/>}>About</DropdownItem>
            <DropdownItem goToMenu = "selectInstructions" leftIcon = {<UserGuide />}>Instructions</DropdownItem>
            {/* <DropdownItem
                leftIcon = {<BoltIcon/>}
            >Clear Paths
            </DropdownItem> */}
            <DropdownItem
              leftIcon={<Algorithm />}
              rightIcon={<ChevronIcon />}
              goToMenu="algorithms">
              Choose Algorithm
            </DropdownItem>
            <DropdownItem
                leftIcon = {<Maze />}
                rightIcon = {<ChevronIcon />}
                goToMenu = "createMaze">
            Create Maze and Walls
            </DropdownItem>
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="settings">
              Settings
            </DropdownItem>
          <DropdownItem goToMenu = "selectCredits" leftIcon = {<Support />}>Credits</DropdownItem>
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
            <DropdownItem goToMenu = "selectSpeed" leftIcon={<BoltIcon />}>Speed</DropdownItem>
            <DropdownItem goToMenu = "selectMusic" leftIcon={<Headphones/>}>Music</DropdownItem>
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
            <DropdownItem goToMenu = "placingWalls" leftIcon="🦘">User placed Walls</DropdownItem>
            <DropdownItem leftIcon="🦘">Randomized Walls</DropdownItem>
            <DropdownItem leftIcon="🐸">Kruskal's Maze Algorithm</DropdownItem>
            <DropdownItem leftIcon="🦋">Prim's Maze Algoritm</DropdownItem>
            <DropdownItem leftIcon="🦔">Recursive Backtracker</DropdownItem>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === 'selectSpeed'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="settings" leftIcon={<ArrowIcon />}>
              <h2>Select Speed</h2>
            </DropdownItem>
            <DropdownItem leftIcon="🦘">Fast</DropdownItem>
            <DropdownItem leftIcon="🐸">Moderate</DropdownItem>
            <DropdownItem leftIcon="🦋">Slow</DropdownItem>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === 'selectMusic'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="settings" leftIcon={<ArrowIcon />}>
              <h2>Select Sound Level</h2>
            </DropdownItem>
            <DropdownItem leftIcon="🦘">Loud</DropdownItem>
            <DropdownItem leftIcon="🐸">Quiet</DropdownItem>
            <DropdownItem leftIcon="🦋">Mute</DropdownItem>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === 'selectAbout'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu= "main" leftIcon={<ArrowIcon />}>
              <h2>About</h2>
            </DropdownItem>
            <p className = "about">This is a Minimalist PathFinder Visualizer and is dedicated to someone very special in my life. Thank you for believing in me.</p>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'selectInstructions'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu= "main" leftIcon={<ArrowIcon />}>
              <h2>About</h2>
            </DropdownItem>
            <p className = "about">The green and the red cells represent the start and finish cells.
             You can move them by dragging them. You can choose various algorithms for maze generation and path finding.
            </p>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === 'placingWalls'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu= "createMaze" leftIcon={<ArrowIcon />}>
              <h2>About</h2>
            </DropdownItem>
            <p className = "about">Walls are black cells. You can select an empty cell to make it a wall. Click and drag to mark off sections as walls.
            </p>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'selectCredits'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu= "main" leftIcon={<ArrowIcon />}>
              <h2>Credits</h2>
            </DropdownItem>
            <div className = "about">
            <ul>The following resources were used</ul>
            <li>CSS Menu and Effects : https://fireship.io/lessons/dropdown-menu-multi-level-react/</li>
            <li>Maze Generation Algorithms: https://pragprog.com/titles/jbmaze/mazes-for-programmers/</li>
            <li>PathFinder visualization - Clément Mihailescu : https://www.youtube.com/channel/UCaO6VoaYJv4kS-TQO_M-N_g</li>
            </div>
          
          </div>
        </CSSTransition>
        
        
      </div>
    );
  }
  

  //Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  //<div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  //<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  //<div>Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  // <div>Icons made by <a href="https://www.flaticon.com/authors/creaticca-creative-agency" title="Creaticca Creative Agency">Creaticca Creative Agency</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>