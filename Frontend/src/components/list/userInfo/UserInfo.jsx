import "./userInfo.css"

const UserInfo = () => {
    return (
        <div className='userInfo'>
            <div className="user">
                <img src="./userimg.jpg" alt=""/>
                <div className="search">
                   <div className="searchBar">
                        <img src="./search.png" alt=""/>
                        <input type="text" placeholder="Search"/>
                   </div>
                </div>
            </div>
            <div className="icons">
                <img src="./settings.svg" alt=""/>
            </div>
        </div>
    )
}

export default UserInfo ;