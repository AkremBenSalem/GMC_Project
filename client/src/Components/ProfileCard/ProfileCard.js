import React  from "react";
import { useSelector } from "react-redux";
import "./ProfileCard.css";
import {Spinner} from 'react-bootstrap'  
const ProfileCard = () => {
  
  const user = useSelector((state) => state.userReducer.user); 
  const isLoading = useSelector((state) => state.userReducer.load);
  return (
    isLoading ?( 
    <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
    </Spinner> 
    ) : ( 

    <div className="mainContainer">
          
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      {" "}
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User-Profile-Image"
                      />{" "}
                    </div>
                    <h6 className="f-w-600">{user && user.name}</h6>
                    <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                      Email
                    </h6>
                    <h6 className="text-muted f-w-400">{user && user.email}</h6>
                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                      ID
                    </h6>
                    <h6 className="text-muted f-w-400">{user && user._id}</h6>

                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  );
};

export default ProfileCard;
