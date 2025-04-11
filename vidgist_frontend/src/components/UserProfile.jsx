import { Fragment } from "react";

export default function UserPorfile(){
    let user = JSON.parse(localStorage.getItem("user"))
    let username = user["username"]
    return (
        <Fragment>
            <div>
            <i className="fa fa-user-circle fa-2x  text-[#5462de]" aria-hidden="true">   <span className="text-[#4a4949]">{username}</span></i>
            </div>
        </Fragment>
    )
}