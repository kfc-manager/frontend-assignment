import "./Header.css"

const Header = (): JSX.Element => {
  return (
    <div className="header-container">
        <h1 className="headline"> 
            Polygon Selector
        </h1>
        <h2 className="author">
            by Kilian Calefice
        </h2>
    </div>
  )
}

export default Header