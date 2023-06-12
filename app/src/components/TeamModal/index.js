/*

The <TeamModal /> component:

This component renders a modal on an overlay and is rendered when the user clicks 
on "GROUP 65" in the <Navigator />.

This component displays the team members and their details: full name, student id,
and location.

*/

import React from "react";
import Styles from "./styles";
import cancelIcon from "../../images/cancel.png";

export default class CountryModal extends React.Component {
  render() {
    return (
      <Styles>
        <div className="modalContainer">
          <div className="modal">
            <img
              src={cancelIcon}
              className="cancel"
              onClick={this.props.closeTeamModal}
            />
            <div className="modalTitle">MEET OUR TEAM</div>
            <div className="teamContainer">
              {[
                {
                  img_src: "https://i.ibb.co/94HCV1C/me-sq.jpg",
                  name: "Abhishek Ugrasen Yadav",
                  student_id: 1176058,
                  city: "Mumbai, India",
                },
                {
                  img_src: "https://i.ibb.co/yBMNV5Q/sid.jpg",
                  name: "Siddhesh Sawant",
                  student_id: 1236818,
                  city: "Mumbai, India",
                },
                {
                  img_src: "https://i.ibb.co/b7k98fx/van.jpg",
                  name: "Vanshree Bapat",
                  student_id: 1208561,
                  city: "Mumbai, India",
                },
                {
                  img_src: "https://i.ibb.co/SV2mJLK/man.jpg",
                  name: "Manish Kumar Shaw",
                  student_id: 1230045,
                  city: "Kolkata, India",
                },
                {
                  img_src: "https://i.ibb.co/QKWkTQB/pran.jpg",
                  name: "Pranav Ashutosh Barve",
                  student_id: 1196722,
                  city: "Pune, India",
                },
              ].map((ele) => {
                return (
                  <div className="teamMember">
                    <img src={ele.img_src} className="memberPic" />
                    <div className="details">
                      <div className="fullName">{ele.name}</div>
                      <div className="studentId">{ele.student_id}</div>
                      <div className="location">{`<${ele.city}>`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}
