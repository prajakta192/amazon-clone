import { Helmet } from 'react-helmet-async'
import {Link } from 'react-router-dom'

const Header = (props) => {
    const {setCurrency, toggleTheme} = props
    return(
      <header>
        <Helmet>
          <title>amazona</title>
        </Helmet>
  <Link to='/'>amazona</Link>
  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',gap:'1em'}}>

  <select name='currency' onChange={(e) => {setCurrency(e.target.value)}} >
    <option value='INR'>INR</option>
    <option value='USD'>USD</option>
  </select>
  <div className="toggle-btn-section">
    <div className="toggle-checkbox m-vertical-auto">
   
    <button type="button" className="toggle_btn" onClick={toggleTheme}></button>
    <div className='cartItem'>
            <Link to='/cart'>
            <i className="fa fa-shopping-cart"></i>
            </Link>
        </div>
    </div>
    </div>
  </div>
</header>
    )
}
export default Header