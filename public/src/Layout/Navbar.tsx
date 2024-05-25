import React from 'react'
import { Link,NavLink, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

const Navbar: React.FC = () => {
  const whitebelt = ['WHITE']
  const yellowbelt = ['YELLOW']
  const bluebelt = ['BLUE']
  const redbelt = ['RED']
  const brownbelt = ['BROWN']
  const blackbelt = ['BLACK']
  const xusername = sessionStorage.getItem('USERNAME') 
  const navigate = useNavigate()

  const logOut = (event: any) => {
    event.preventDefault();
    sessionStorage.removeItem('USERID');
    sessionStorage.removeItem('USERNAME');
    sessionStorage.removeItem('TOKEN');
    sessionStorage.removeItem('USERPIC');
    navigate("/", {replace: true})    
    window.location.reload();
  }

return (
  <><nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to={'/'}><img className="logo" src={'/images/logo.png'} alt="" /></Link>


      <button type="button" className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <span className='mobile-caption'>LION HEART</span>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={'aboutus'}>About Us</Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle active" to={'#'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Activies
            </Link>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to={'classforkids'}>Class for Kids</NavLink></li>
              <li><Link className="dropdown-item" to={'classforadults'}>Class for Adults</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to={'executiveclass'}>Executive Class</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle active" to={'#'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Belt Ranking
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to={`/forkids/${whitebelt}`}>White Belts</Link></li>
              <li><Link className="dropdown-item" to={`/forkids/${yellowbelt}`}>Yellow Belts</Link></li>
              <li><Link className="dropdown-item" to={`/forkids/${bluebelt}`}>Blue Belts</Link></li>
              <li><Link className="dropdown-item" to={`/forkids/${redbelt}`}>Red Belts</Link></li>
              <li><Link className="dropdown-item" to={`/forkids/${brownbelt}`}>Brown Belts</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to={`/forkids/${blackbelt}`}>Black Belts</Link></li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to={'contactus'}>Locate Us</Link>
          </li>
        </ul>

      {/* AUTHENTICATION */}

      {
       xusername === null ?        
          <ul className="navbar-nav me-mr">
          <li className="nav-item">
                <Link className="nav-link active" to={'/#'} data-bs-toggle="modal" data-bs-target="#staticLoginBackdrop">LogIn</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={'/#'} data-bs-toggle="modal" data-bs-target="#staticRegisterBackdrop">Register</Link>
              </li>          
          </ul>
        :
        <li className="nav-item dropstart">
        <Link className="nav-link dropdown-toggle active text-dark" to={'#'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {xusername}
        </Link>
        <ul className="dropdown-menu">
          <li><NavLink className="dropdown-item" to={'/#'} onClick={logOut}>Log-Out</NavLink></li>
          <li><Link className="dropdown-item" to={'profile'}>Profile</Link></li>
        </ul>
      </li>


      }
      </div>
    </div>

  </nav>
  {/* DRAWER MENU */}
  <div className="offcanvas offcanvas-end drawer" id="offcanvasExample" tabIndex={-2} aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Drawer Menu</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div>
        Navigation drawers provide access to destinations and application functionality, tap selection
        </div>
        <div><hr/></div>
        <div data-bs-dismiss="offcanvas">
          <Link className="nav-link active" aria-current="page" to={'aboutus'}>About Us</Link>
        </div>
        <div><hr/></div>
        <div className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle active" to={'#'} data-bs-toggle="dropdown"role="button" aria-expanded="false">
            Activities
          </Link>
          <ul className="dropdown-menu">
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item"  to={'classforkids/'}>Class for Kids</Link></li>          
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item"  to={'classforadults/'}>Class for Adults</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item"  to={'executiveclass/'}>Executive Class</Link></li>
          </ul>
        </div>
        <div><hr/></div>
        <div className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle active" to={'#'} data-bs-toggle="dropdown"role="button" aria-expanded="false">
            Belt Ranking
          </Link>
          <ul className="dropdown-menu">
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to={`/forkids/${whitebelt}`}>White Belts</Link></li>
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to={`/forkids/${yellowbelt}`}>Yellow Belts</Link></li>
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to={`/forkids/${bluebelt}`}>Blue Belts</Link></li>
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to={`/forkids/${redbelt}`}>Red Belts</Link></li>
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to={`/forkids/${brownbelt}`}>Brown Belts</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to={`/forkids/${blackbelt}`}>Black Belts</Link></li>
          </ul>
        </div>
        <div><hr/></div>
        <div data-bs-dismiss="offcanvas">
          <Link className="nav-link active" aria-current="page" to={'contactus'}>Locate Us</Link>
         </div>

         {
           xusername === null ?
           <>
            <div><hr/></div>
            <div data-bs-dismiss="offcanvas">
              <Link className="nav-link active" aria-current="page" to={'/#'} data-bs-toggle="modal" data-bs-target="#staticLoginBackdrop">LogIn</Link>
            </div>
            <div><hr/></div>
            <div data-bs-dismiss="offcanvas">
              <Link className="nav-link active" aria-current="page" to={'/#'} data-bs-toggle="modal" data-bs-target="#staticRegisterBackdrop">Register</Link>
            </div>
            </>
          :
          <>
          <div><hr/></div>
          <div className="nav-item dropstart">
          <Link className="nav-link dropdown-toggle active" to={'#'} data-bs-toggle="dropdown"role="button" aria-expanded="false">
            {xusername}
          </Link>
          <ul className="dropdown-menu">
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to={`/#`} onClick={logOut}>LogOut</Link></li>
            <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to={`profile`}>Profile</Link></li>
          </ul>
        </div>
        </>

        }
      </div>

    </div>

  <Login/>
  <Register/>
  </>

    );
  };
  
  export default Navbar;