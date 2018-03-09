// Import the page's CSS. Webpack will know what to do with it.
import "./app.css";
import $ from "jquery";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import Dashboard from "../dashboard/dashboard";
import LandingPage from "../home/landing-page";
window.$ = $;
window.jQuery = $;

export default class App
{
  constructor()
  {
    $("body").append(new LandingPage());
    // this.web3 = inWeb3;
    // start();
  }

  start()
  {

  }

  loginSuccessfulCallback()
  {
    // $("body").append(new Dashboard())
  }

}
// const app = new App();
