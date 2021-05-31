import React from "react";
import "./assets/images/favicon.png"
import "./assets/css/magnific-popup.css"
import "./assets/css/slick.css"
import "./assets/css/LineIcons.css"
import "./assets/css/bootstrap.min.css"
import "./assets/css/default.css"
import "./assets/css/style.css"
import { useSelector } from "react-redux";

const Landpage = () => {
  const isAuth = useSelector(state => state.userReducer.isAuth)
  return (
    <div>
  <meta charSet="utf-8" />
  <meta name="description" content />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {/*====== SLIDER PART START ======*/}
  <section id="home" className="slider_area">
    <div id="carouselThree" className="carousel slide" data-ride="carousel">
      
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="slider-content">
                  <h1 className="title">Business management made easy!</h1>
                  <p className="text">With our services business management has never been easier</p>
                  {isAuth ? (null) : (<ul className="slider-btn rounded-buttons">
                    <li><a className="main-btn rounded-one" href="/register">REGISTER</a></li>
                    <li><a className="main-btn rounded-two" href="/login">LOGIN</a></li>
                  </ul>)}
                </div>
              </div>
            </div> {/* row */}
          </div> {/* container */}
        </div> {/* carousel-item */}
      </div>
    </div>
  </section>
  {/*====== SLIDER PART ENDS ======*/}
  {/*====== FEATRES TWO PART START ======*/}
  <section id="services" className="features-area">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-10">
          <div className="section-title text-center pb-10">
            <h3 className="title">Our Features</h3>
            <p className="text">Stop wasting time and energy by going around bossing workers. <br/> With the use of our platform, Happiness is guaranteed!</p>
          </div> {/* row */}
        </div>
      </div> {/* row */}
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-7 col-sm-9">
          <div className="single-features mt-40">
            <div className="features-title-icon d-flex justify-content-between">
              <h4 className="features-title"><a href="#">Minimalist Design</a></h4>
              <div className="features-icon">
                <i className="lni lni-brush" />
                
              </div>
            </div>
            <div className="features-content">
              <p className="text">We provide a great looking platform with clear and straight to the point indicators, free of clutter.</p>
              <a className="features-btn" href="#">LEARN MORE</a>
            </div>
          </div> {/* single features */}
        </div>
        <div className="col-lg-4 col-md-7 col-sm-9">
          <div className="single-features mt-40">
            <div className="features-title-icon d-flex justify-content-between">
              <h4 className="features-title"><a href="#">Everything <br /> in a glance</a></h4>
              <div className="features-icon">
                <i className="lni lni-layout" />
              </div>
            </div>
            <div className="features-content">
              <p className="text"> With the powerful profile page, you can access all the tasks assigned to you and all the tasks you manage!</p>
              <a className="features-btn" href="#">LEARN MORE</a>
            </div>
          </div> {/* single features */}
        </div>
        <div className="col-lg-4 col-md-7 col-sm-9">
          <div className="single-features mt-40">
            <div className="features-title-icon d-flex justify-content-between">
              <h4 className="features-title"><a href="#">Power back to you</a></h4>
              <div className="features-icon">
                <i className="lni lni-bolt" />
              </div>
            </div>
            <div className="features-content">
              <p className="text">Stay informed with our notification system, it automatically sends you notifications with every change made to your tasks</p>
              <a className="features-btn" href="#">LEARN MORE</a>
            </div>
          </div> {/* single features */}
        </div>
      </div> {/* row */}
    </div> {/* container */}
  </section>
  {/*====== FEATRES TWO PART ENDS ======*/}
  
  
  {/*====== CONTACT PART START ======*/}
  <section id="contact" className="contact-area">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-10">
          <div className="section-title text-center pb-30">
            <h3 className="title">Contact</h3>
            <p className="text">Come and visit ! <br/> ...or call, if that's your thing</p>
          </div> {/* section title */}
        </div>
      </div> {/* row */}
      <div className="row">
        <div className="col-lg-12">
          <div className="contact-map mt-30">
          
            <iframe title="Gmap" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.2834737670764!2d10.236576915170968!3d36.8356864734012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3541c4f22e55%3A0x5b7225d7fdbb3801!2sGOMYCODE!5e0!3m2!1sen!2stn!4v1622211529264!5m2!1sen!2stn" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} />
          </div> {/* row */}
        </div>
      </div> {/* row */} 
      <div className="contact-info pt-30">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="single-contact-info contact-color-1 mt-30 d-flex ">
              <div className="contact-info-icon">
                <i className="lni lni-map-marker" />
              </div>
              <div className="contact-info-content media-body">
                <p className="text"> Somewhere in tunisia<br />1164 tunisia.</p>
              </div>
            </div> {/* single contact info */}
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-contact-info contact-color-2 mt-30 d-flex ">
              <div className="contact-info-icon">
                <i className="lni lni-envelope" />
              </div>
              <div className="contact-info-content media-body">
                <p className="text">contact@theDashboard.tn</p>
              </div>
            </div> {/* single contact info */}
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-contact-info contact-color-3 mt-30 d-flex ">
              <div className="contact-info-icon">
                <i className="lni lni-phone" />
              </div>
              <div className="contact-info-content media-body">
                <p className="text">+216 11 222 332</p>
              </div>
            </div> {/* single contact info */}
          </div>
        </div> {/* row */}
      </div> {/* contact info */}
      <div className="row">
        <div className="col-lg-12">
          <div className="contact-wrapper form-style-two pt-115">
            <h4 className="contact-title pb-10"><i className="lni lni-envelope" /> Leave <span>A Message.</span></h4>
            <form id="contact-form" action="assets/contact.php" method="post">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input mt-25">
                    <label>Name</label>
                    <div className="input-items default">
                      <input name="name" type="text" placeholder="Name" />
                      <i className="lni lni-user" />
                    </div>
                  </div> {/* form input */}
                </div>
                <div className="col-md-6">
                  <div className="form-input mt-25">
                    <label>Email</label>
                    <div className="input-items default">
                      <input type="email" name="email" placeholder="Email" />
                      <i className="lni lni-envelope" />
                    </div>
                  </div> {/* form input */}
                </div>
                <div className="col-md-12">
                  <div className="form-input mt-25">
                    <label>Massage</label>
                    <div className="input-items default">
                      <textarea name="massage" placeholder="Massage" defaultValue={""} />
                      <i className="lni lni-pencil-alt" />
                    </div>
                  </div> {/* form input */}
                </div>
                <p className="form-message" />
                <div className="col-md-12">
                  <div className="form-input light-rounded-buttons mt-30">
                    <button className="main-btn light-rounded-two">Send Message</button>
                  </div> {/* form input */}
                </div>
              </div> {/* row */}
            </form>
          </div> {/* contact wrapper form */}
        </div>
      </div> {/* row */}
    </div> {/* container */}
  </section>
  {/*====== CONTACT PART ENDS ======*/}
  {/*====== FOOTER PART START ======*/}
  <section className="footer-area footer-dark">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="footer-logo text-center">
          
          </div> {/* footer logo */}
          <ul className="social text-center mt-60">
            <li><a href="https://www.facebook.com/Akm.Funer/" target="_blank" rel="noreferrer"><i className="lni lni-facebook-filled" /></a></li>
            <li><a href="https://www.instagram.com/akrem.ben.salem/" target="_blank" rel="noreferrer"><i className="lni lni-instagram-original" /></a></li>
          </ul> {/* social */}
          <div className="footer-support text-center">
            <span className="number">+216 20202020</span>
            <span className="mail">support@thedashboard.tn</span>
          </div>
          
        </div>
      </div> {/* row */}
    </div> {/* container */}
  </section>
  {/*====== FOOTER PART ENDS ======*/}
  {/*====== BACK TOP TOP PART START ======*/}
  <a href="#" className="back-to-top"><i className="lni lni-chevron-up" /></a>
  {/*====== BACK TOP TOP PART ENDS ======*/}    
  {/*====== PART START ======*/}
  {/*
    <section class="">
  <div class="container">
      <div class="row">
          <div class="col-lg-">
              
          </div>
      </div>
  </div>
    </section>
*/}
  {/*====== PART ENDS ======*/}
  {/*====== Jquery js ======*/}
  {/*====== Bootstrap js ======*/}
  {/*====== Slick js ======*/}
  {/*====== Magnific Popup js ======*/}
  {/*====== Ajax Contact js ======*/}
  {/*====== Isotope js ======*/}
  {/*====== Scrolling Nav js ======*/}
  {/*====== Main js ======*/}
</div>

  );
};

export default Landpage;
