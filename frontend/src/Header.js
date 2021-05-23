import React, { Component } from 'react'
import "../src/Header.css"

export class Header extends Component {
    render() {
        return (
            <div>
                
                <nav className="navbar navbar-light bg-light">
                <div className="container">
                    {/* <a class="navbar-brand" href="#">
                    <img src="" alt="" width="30" height="24"></img>
                    </a> */}
                    {this.props.account}

                </div>
                </nav>

            </div>
        )
    }
}

export default Header
