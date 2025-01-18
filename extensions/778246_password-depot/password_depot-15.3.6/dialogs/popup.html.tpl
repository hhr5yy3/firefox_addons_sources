<!DOCTYPE html>
<html>
  <head>
    <!-- <meta name="viewport" content="initial-scale=1.0, width=device-width"> -->
    <link rel="stylesheet" href="popup.css">
    <link rel="stylesheet" href="../vendor/bootstrap.min.css">
    <link rel="stylesheet" href="../vendor/font-awesome.min.css">
    <link rel="stylesheet" href="pass_gen.css">
  </head>
  <body>
    <div class='popup-container'>
      <div class="popup-left-container">
          <div class='popup-left-logo'>
              <img id="popup_logo" src="">
              <p style='font-size: 0.8rem;width:100%;text-align:right;margin-top:-10px'>v<%= version %></p>
          </div>
          <div class='popup-left-copyright' id='popup_left_copyright'>
              Copyright &#169; 1998-2021 by <a href="#">AceBIT GmbH</a> - All rights reserved!
          </div>
      </div>
      <div class='popup-right-container' style="position:relative;">
        <div id="main_panel">
          <div class='popup-right-state'>
            <div id='popup_right_title'>
              <!-- Client status:
              <span id='client_state' class='online'> Ready</span> -->
              Password Depot Extension
            </div>
          </div>
          <div class='popup-right-search'>
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
            </svg>
            <input type="text" id="txt_search" placeholder="Search your depot">
            <div class='input-button hidden' id='btn_search_cancel'>
                <span class="fa fa-times-circle" aria-hidden="true"></span>
            </div>
          </div>
          <div id='main_panel_menu_container'>
            <div id='showPD'  class='popup-right-list-item'>
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path d="M17.237,3.056H2.93c-0.694,0-1.263,0.568-1.263,1.263v8.837c0,0.694,0.568,1.263,1.263,1.263h4.629v0.879c-0.015,0.086-0.183,0.306-0.273,0.423c-0.223,0.293-0.455,0.592-0.293,0.92c0.07,0.139,0.226,0.303,0.577,0.303h4.819c0.208,0,0.696,0,0.862-0.379c0.162-0.37-0.124-0.682-0.374-0.955c-0.089-0.097-0.231-0.252-0.268-0.328v-0.862h4.629c0.694,0,1.263-0.568,1.263-1.263V4.319C18.5,3.625,17.932,3.056,17.237,3.056 M8.053,16.102C8.232,15.862,8.4,15.597,8.4,15.309v-0.89h3.366v0.89c0,0.303,0.211,0.562,0.419,0.793H8.053z M17.658,13.156c0,0.228-0.193,0.421-0.421,0.421H2.93c-0.228,0-0.421-0.193-0.421-0.421v-1.263h15.149V13.156z M17.658,11.052H2.509V4.319c0-0.228,0.193-0.421,0.421-0.421h14.308c0.228,0,0.421,0.193,0.421,0.421V11.052z"></path>
              </svg>
              <span id='main_panel_open_client'>
                Open Native Client
              </span>
            </div>
            <div id='addBookmark'  class='popup-right-list-item'>
              <svg class="svg-icon" viewBox="0 0 43 60" width="20px" height="20px">
                <path d="M 4.5957031 0 C 2.0627031 0 0 2.0617031 0 4.5957031 L 0 9 L 0 15 L 0 21 L 0 57.996094 C 0 58.756094 0.4225625 59.440203 1.1015625 59.783203 C 1.7805625 60.126203 2.5795156 60.056172 3.2285156 59.576172 L 21.982422 44.285156 L 39.808594 59.605469 C 40.160594 59.867469 40.577094 60 40.996094 60 C 41.303094 60 41.612437 59.928203 41.898438 59.783203 C 42.577438 59.440203 43 58.756094 43 57.996094 L 43 4.5957031 C 43 2.0617031 40.937297 1.1446399e-16 38.404297 0 L 4.5957031 0 z M 4.5957031 2 L 38.404297 2 C 39.835297 2 41 3.1637031 41 4.5957031 L 41 37.810547 L 41.054688 58.042969 L 23 42.521484 L 23 38.982422 C 23 38.429422 22.552 37.982422 22 37.982422 C 21.448 37.982422 21 38.429422 21 38.982422 L 21 42.505859 L 2 57.996094 L 2 22 L 13 22 C 13.552 22 14 21.553 14 21 C 14 20.447 13.552 20 13 20 L 2 20 L 2 16 L 11 16 C 11.552 16 12 15.553 12 15 C 12 14.447 11.552 14 11 14 L 2 14 L 2 10 L 9 10 C 9.552 10 10 9.553 10 9 C 10 8.447 9.552 8 9 8 L 2 8 L 2 4.5957031 C 2 3.1637031 3.1647031 2 4.5957031 2 z"></path>
              </svg>
              <span id='main_panel_add_bookmark'>
                Add a bookmark
              </span>
            </div>
            <div id='setting'  class='popup-right-list-item'>
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path d="M17.498,11.697c-0.453-0.453-0.704-1.055-0.704-1.697c0-0.642,0.251-1.244,0.704-1.697c0.069-0.071,0.15-0.141,0.257-0.22c0.127-0.097,0.181-0.262,0.137-0.417c-0.164-0.558-0.388-1.093-0.662-1.597c-0.075-0.141-0.231-0.22-0.391-0.199c-0.13,0.02-0.238,0.027-0.336,0.027c-1.325,0-2.401-1.076-2.401-2.4c0-0.099,0.008-0.207,0.027-0.336c0.021-0.158-0.059-0.316-0.199-0.391c-0.503-0.274-1.039-0.498-1.597-0.662c-0.154-0.044-0.32,0.01-0.416,0.137c-0.079,0.106-0.148,0.188-0.22,0.257C11.244,2.956,10.643,3.207,10,3.207c-0.642,0-1.244-0.25-1.697-0.704c-0.071-0.069-0.141-0.15-0.22-0.257C7.987,2.119,7.821,2.065,7.667,2.109C7.109,2.275,6.571,2.497,6.07,2.771C5.929,2.846,5.85,3.004,5.871,3.162c0.02,0.129,0.027,0.237,0.027,0.336c0,1.325-1.076,2.4-2.401,2.4c-0.098,0-0.206-0.007-0.335-0.027C3.001,5.851,2.845,5.929,2.77,6.07C2.496,6.572,2.274,7.109,2.108,7.667c-0.044,0.154,0.01,0.32,0.137,0.417c0.106,0.079,0.187,0.148,0.256,0.22c0.938,0.936,0.938,2.458,0,3.394c-0.069,0.072-0.15,0.141-0.256,0.221c-0.127,0.096-0.181,0.262-0.137,0.416c0.166,0.557,0.388,1.096,0.662,1.596c0.075,0.143,0.231,0.221,0.392,0.199c0.129-0.02,0.237-0.027,0.335-0.027c1.325,0,2.401,1.076,2.401,2.402c0,0.098-0.007,0.205-0.027,0.334C5.85,16.996,5.929,17.154,6.07,17.23c0.501,0.273,1.04,0.496,1.597,0.66c0.154,0.047,0.32-0.008,0.417-0.137c0.079-0.105,0.148-0.186,0.22-0.256c0.454-0.453,1.055-0.703,1.697-0.703c0.643,0,1.244,0.25,1.697,0.703c0.071,0.07,0.141,0.15,0.22,0.256c0.073,0.098,0.188,0.152,0.307,0.152c0.036,0,0.073-0.004,0.109-0.016c0.558-0.164,1.096-0.387,1.597-0.66c0.141-0.076,0.22-0.234,0.199-0.393c-0.02-0.129-0.027-0.236-0.027-0.334c0-1.326,1.076-2.402,2.401-2.402c0.098,0,0.206,0.008,0.336,0.027c0.159,0.021,0.315-0.057,0.391-0.199c0.274-0.5,0.496-1.039,0.662-1.596c0.044-0.154-0.01-0.32-0.137-0.416C17.648,11.838,17.567,11.77,17.498,11.697 M16.671,13.334c-0.059-0.002-0.114-0.002-0.168-0.002c-1.749,0-3.173,1.422-3.173,3.172c0,0.053,0.002,0.109,0.004,0.166c-0.312,0.158-0.64,0.295-0.976,0.406c-0.039-0.045-0.077-0.086-0.115-0.123c-0.601-0.6-1.396-0.93-2.243-0.93s-1.643,0.33-2.243,0.93c-0.039,0.037-0.077,0.078-0.116,0.123c-0.336-0.111-0.664-0.248-0.976-0.406c0.002-0.057,0.004-0.113,0.004-0.166c0-1.75-1.423-3.172-3.172-3.172c-0.054,0-0.11,0-0.168,0.002c-0.158-0.312-0.293-0.639-0.405-0.975c0.044-0.039,0.085-0.078,0.124-0.115c1.236-1.236,1.236-3.25,0-4.486C3.009,7.719,2.969,7.68,2.924,7.642c0.112-0.336,0.247-0.664,0.405-0.976C3.387,6.668,3.443,6.67,3.497,6.67c1.75,0,3.172-1.423,3.172-3.172c0-0.054-0.002-0.11-0.004-0.168c0.312-0.158,0.64-0.293,0.976-0.405C7.68,2.969,7.719,3.01,7.757,3.048c0.6,0.6,1.396,0.93,2.243,0.93s1.643-0.33,2.243-0.93c0.038-0.039,0.076-0.079,0.115-0.123c0.336,0.112,0.663,0.247,0.976,0.405c-0.002,0.058-0.004,0.114-0.004,0.168c0,1.749,1.424,3.172,3.173,3.172c0.054,0,0.109-0.002,0.168-0.004c0.158,0.312,0.293,0.64,0.405,0.976c-0.045,0.038-0.086,0.077-0.124,0.116c-0.6,0.6-0.93,1.396-0.93,2.242c0,0.847,0.33,1.645,0.93,2.244c0.038,0.037,0.079,0.076,0.124,0.115C16.964,12.695,16.829,13.021,16.671,13.334 M10,5.417c-2.528,0-4.584,2.056-4.584,4.583c0,2.529,2.056,4.584,4.584,4.584s4.584-2.055,4.584-4.584C14.584,7.472,12.528,5.417,10,5.417 M10,13.812c-2.102,0-3.812-1.709-3.812-3.812c0-2.102,1.71-3.812,3.812-3.812c2.102,0,3.812,1.71,3.812,3.812C13.812,12.104,12.102,13.812,10,13.812"></path>
              </svg>
              <span id='main_panel_settings'>
                Settings
              </span>
              <svg class="svg-icon right-align" viewBox="0 0 20 20">
                <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
            </svg>
            </div>
            <div id='generate' class='popup-right-list-item'>
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"></path>
              </svg>
              <span id='main_panel_generate_password'>
                Generate Secure Password
              </span>
              <svg class="svg-icon right-align" viewBox="0 0 20 20">
                <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
            </svg>
            </div>
            <div id='how_secure' class='popup-right-list-item'>
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path d="M10,6.978c-1.666,0-3.022,1.356-3.022,3.022S8.334,13.022,10,13.022s3.022-1.356,3.022-3.022S11.666,6.978,10,6.978M10,12.267c-1.25,0-2.267-1.017-2.267-2.267c0-1.25,1.016-2.267,2.267-2.267c1.251,0,2.267,1.016,2.267,2.267C12.267,11.25,11.251,12.267,10,12.267 M18.391,9.733l-1.624-1.639C14.966,6.279,12.563,5.278,10,5.278S5.034,6.279,3.234,8.094L1.609,9.733c-0.146,0.147-0.146,0.386,0,0.533l1.625,1.639c1.8,1.815,4.203,2.816,6.766,2.816s4.966-1.001,6.767-2.816l1.624-1.639C18.536,10.119,18.536,9.881,18.391,9.733 M16.229,11.373c-1.656,1.672-3.868,2.594-6.229,2.594s-4.573-0.922-6.23-2.594L2.41,10l1.36-1.374C5.427,6.955,7.639,6.033,10,6.033s4.573,0.922,6.229,2.593L17.59,10L16.229,11.373z"></path>
              </svg>
              <span id='main_panel_how_secure'>
                How secure is my password?
              </span>
              <svg class="svg-icon right-align" viewBox="0 0 20 20">
                <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
            </svg>
            </div>
            <div style="width:100%;">
              <div id='visit_website'  class='popup-right-list-item'>
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
                </svg>
                <span id='main_panel_visite_website'>
                  Visit Password Depot Website
                </span>
              </div>
              <div  id='rate' class='popup-right-list-item'>
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path d="M15.94,10.179l-2.437-0.325l1.62-7.379c0.047-0.235-0.132-0.458-0.372-0.458H5.25c-0.241,0-0.42,0.223-0.373,0.458l1.634,7.376L4.06,10.179c-0.312,0.041-0.446,0.425-0.214,0.649l2.864,2.759l-0.724,3.947c-0.058,0.315,0.277,0.554,0.559,0.401l3.457-1.916l3.456,1.916c-0.419-0.238,0.56,0.439,0.56-0.401l-0.725-3.947l2.863-2.759C16.388,10.604,16.254,10.22,15.94,10.179M10.381,2.778h3.902l-1.536,6.977L12.036,9.66l-1.655-3.546V2.778z M5.717,2.778h3.903v3.335L7.965,9.66L7.268,9.753L5.717,2.778zM12.618,13.182c-0.092,0.088-0.134,0.217-0.11,0.343l0.615,3.356l-2.938-1.629c-0.057-0.03-0.122-0.048-0.184-0.048c-0.063,0-0.128,0.018-0.185,0.048l-2.938,1.629l0.616-3.356c0.022-0.126-0.019-0.255-0.11-0.343l-2.441-2.354l3.329-0.441c0.128-0.017,0.24-0.099,0.295-0.215l1.435-3.073l1.435,3.073c0.055,0.116,0.167,0.198,0.294,0.215l3.329,0.441L12.618,13.182z"></path>
                </svg>
                <span id='main_panel_rate_us'>
                  Rate Us
                </span>
              </div>
            </div>
          </div>
          <div id='main_panel_search_result_container' style="display:none;">
            <span id='info_no_search_result' class='no-result'><i id='info_no_result_text'>No password entry found.</i></span>
            <!-- <div class='search-result-item'>
              <div class='entry-card-image'>
                  <span class="fa fa-lock"></span>
              </div>
              <div class='entry-card-content'>
                  <span class='title'>Github.com</span>
                  <span class='description'>yskever@gmail.com</span>
              </div>
              <div class='entry-card-action'>
                <div class='circle'>
                    <span class="fa fa-external-link" aria-hidden="true"  data-toggle="tooltip" data-placement="right" title="Launch"></span>
                </div>
              </div>
              <div class='entry-card-action'>
                  <div class='copy-dropdown' style="position: relative;">
                      <div class='circle'>
                          <span class="fa fa-clone"></span>
                          <span class="copy-dropdown-arrow fa fa-caret-down" ></span>
                      </div>
                      <div class="copy-dropdown-content">
                          <span class='copy-username'>Copy username</span>
                          <span class='copy-url'>Copy URL</span>
                        </div>
                  </div>
              </div>
              <div class='entry-card-action'>
                  <div class='circle'>
                      <span class="fa fa-edit" aria-hidden="true"  data-toggle="tooltip" data-placement="right" title="Edit in Native Client"></span>
                  </div>
              </div>
            </div> -->
          </div>
        </div>
        <div id="setting_panel" style="display:none;">
          <div class='setting-navbar'>
            <div class='back-button'>
              <svg class="svg-icon back" viewBox="0 0 20 20">
                <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
              </svg>
              <span id='setting_panel_back'>
                Back
              </span>
            </div>
            <div class="save-button" id="setting_panel_save_btn">
              <svg class="svg-icon" viewBox="0 0 20 20" >
                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
              </svg>
              <span id='setting_panel_save'>
                Save
              </span>
            </div>
          </div>
          <!-- <div  class='popup-right-setting-item'>
            <div>
              <span style='font-size: 13px;'>Auto-Fill when domain matches</span><br/>
              <span style='font-size: 9px;'>Not recommended: It may fill some unnecessary fields.</span>
            </div>
            <input type="checkbox" id="auto_fill_switch" /><label for="auto_fill_switch">Toggle</label>
          </div> -->
          <div class='popup-right-setting-item'>
            <div style='font-size: 13px;' id='setting_panel_websocket_port'>
              Websocket Port:
            </div>
            <input type="number" id="websocket_port" min="1" max="99999"/>
          </div>
          <div class='popup-right-setting-item with-sub-item bottom-line'>
            <div class="popup-right-setting-sub-item">
              <div style='font-size: 13px;' id='setting_panel_ignored_urls'>
                Ignored URLs:
              </div>
              <button type="button" id='btn_ignored_urls' class="btn btn-copy-password">Add</button>
            </div>
            <div id="ignored_urls_wrapper" class="popup-right-setting-sub-item"></div>
          </div>
        </div>
        <div id="pass_gen_panel" style="display:none;">
          <div class='setting-navbar bottom-line'>
            <div class='back-button'>
              <svg class="svg-icon back" viewBox="0 0 20 20">
                <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
              </svg>
              <span id='pass_gen_panel_back'>
                Back
              </span>
            </div>
          </div>
          <div class="container-fluid">
            <div class='row'>
                <div class='col-12 col-lg-8 col-xl-6 main-wrapper'>
                    <div class='password-input-wrapper'>
                        <div class='password-input-container'>
                            <input id='password_result' class='password-input' type='text'/>
                            <div class='input-button' id='btn_password_copy'>
                                <span id='pass_gen_panel_copy' class="fa fa-clone"  data-toggle="tooltip" data-placement="right" title="Copy"></span>
                            </div>
                            <div class='input-button' id='btn_password_refresh'>
                                <span id='pass_gen_panel_refresh' class="fa fa-refresh"  data-toggle="tooltip" data-placement="right" title="Generate"></span>
                            </div>
                        </div>
                        <div id='password_strength_progress' class='password-strength-container'>
                            <div class='password-strength-progress'></div>
                        </div>
                    </div>
                    <div class='container-fluid password-config-wrapper'>
                        <div class='row config-title' id='pass_gen_panel_customize'>
                            Customize your password
                        </div>
                        <div class='row'>
                            <div class='col-12 col-lg-6'>
                                <div class='config-password-length-title' id='pass_gen_panel_length'>
                                    Password Length
                                </div>
                                <div class='d-flex'>
                                    <input type='number' class='config-password-length-input p-1 mt-2' id='password_length_input' min='1' max='50' value='15'/>
                                    <div class='w-100 d-flex align-items-center mt-1 px-1'>
                                        <div class="slide-container">
                                            <input type="range" min="1" max="50" value="15" class="config-slider" id="password_length_slider">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-6 col-lg-3 pt-4'>
                                <div class="d-flex">
                                    <label class='radio-container'>
                                      <span id='pass_gen_panel_easy_to_say'>Easy to say</span>
                                        <input type='radio' id='config_radio_say' name='config-radio' value='say'/>
                                        <span class='radio-checkmark'></span>
                                    </label>
                                    <span id='pass_gen_panel_say_tip' class="config-info-mark d-flex align-items-center justify-content-center ml-2 fa fa-info" aria-hidden="true"  data-toggle="tooltip" data-placement="right" title="Avoid numbers and special characters"></span>
                                </div>
                                <div class="d-flex">
                                    <label class='radio-container'>
                                      <span id='pass_gen_panel_easy_to_read'>Easy to read</span>
                                        <input type='radio' id='config_radio_read' name='config-radio' value='read'/>
                                        <span class='radio-checkmark'></span>
                                    </label>
                                    <span id='pass_gen_panel_read_tip' class="config-info-mark d-flex align-items-center justify-content-center ml-2 fa fa-info" aria-hidden="true"  data-toggle="tooltip" data-placement="right" title="Avoid ambiguous characters like l, 1, O, and 0"></span>
                                </div>
                                <div class="d-flex">
                                    <label class='radio-container'>
                                      <span id='pass_gen_panel_all'>All characters</span>
                                        <input type='radio' id='config_radio_all' name='config-radio' value='all' checked='checked'/>
                                        <span class='radio-checkmark'></span>
                                    </label>
                                    <span id='pass_gen_panel_all_tip' class="config-info-mark d-flex align-items-center justify-content-center ml-2 fa fa-info" aria-hidden="true"  data-toggle="tooltip" data-placement="right" title="Any character combinations like !, 7, h, K, and l1"></span>
                                </div>
                            </div>
                            <div class='col-6 col-lg-3 pt-4'>
                                <label class='checkbox-container'>
                                  <span id='pass_gen_panel_uppercase'>Uppercase</span>
                                    <input type='checkbox' class='config-checkbox' id='config_check_uppercase' checked='checked'>
                                    <span class='checkbox-checkmark'></span>
                                </label>
                                <label class='checkbox-container'>
                                  <span id='pass_gen_panel_lowercase'>Lowercase</span>
                                    <input type='checkbox' class='config-checkbox' id='config_check_lowercase' checked='checked'>
                                    <span class='checkbox-checkmark'></span>
                                </label>
                                <label class='checkbox-container'>
                                  <span id='pass_gen_panel_numbers'>Numbers</span>
                                    <input type='checkbox' class='config-checkbox' id='config_check_numbers' checked='checked'>
                                    <span class='checkbox-checkmark'></span>
                                </label>
                                <label class='checkbox-container'>
                                  <span id='pass_gen_panel_symbols'>Symbols</span>
                                    <input type='checkbox' class='config-checkbox' id='config_check_symbols' checked='checked'>
                                    <span class='checkbox-checkmark'></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class='d-flex p-2 pt-4 justify-content-center align-items-center'>
                        <button type="button" id='btn_copy_password' class="btn btn-copy-password">Copy password</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div id="pass_check_panel" style="display:none;">
          <div class='setting-navbar bottom-line'>
            <div class='back-button'>
              <svg class="svg-icon back" viewBox="0 0 20 20">
                <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
              </svg>
              <span id='pass_check_panel_back'>
                Back
              </span>
            </div>
          </div>
          <div class="container-fluid">
            <div class='row'>
                <div class='col-12 col-lg-8 col-xl-6 main-wrapper'>
                    <div id='password_input_wrapper' class='password-input-wrapper'>
                        <div id='password_input_container' class='password-input-container' style='background-color: white;'>
                            <input id='password_result' class='password-input pass-check-result' type='password' placeholder="Enter your password here"/>
                            <div class='input-button' id='btn_password_show_hide'>
                                <span  id='pass_check_panel_show' class="fa fa-eye fa-lg"  data-toggle="tooltip" data-placement="right" title="Show/Hide password"></span>
                            </div>
                        </div>
                        <div id='password_strength_label' class='password-strength-label'>
                            No Password
                        </div>
                    </div>
                    <div class='container-fluid password-config-wrapper'>
                        <div class='row config-title-container'>
                            <div class='config-title col-lg-4 col-12 text-center'>
                                10 characters containing:
                            </div>
                            <div id='info_label_upper' class='col-lg-2 col-6 info-label-deactive'>
                                ✓ Uppercase
                            </div>
                            <div  id='info_label_lower' class='col-lg-2 col-6 info-label-deactive'>
                                ✓ Lowercase
                            </div>
                            <div  id='info_label_number' class='col-lg-2 col-6 info-label-deactive'>
                                ✗ Uppercase
                            </div>
                            <div  id='info_label_symbol' class='col-lg-2 col-6 info-label-deactive'>
                                ✗ Uppercase
                            </div>
                        </div>
                        <div class='row pt-2'>
                            <div class='col-12 col-lg-6 row-border-right'>
                                <div id='pass_check_panel_time_crack' class='config-info-title text-center'>
                                    Time to crack
                                </div>
                                <div id='info_broke_time' class='info-quality-label text-center'></div>
                            </div>
                            <div class='col-12 col-lg-6'>
                                <div id='pass_check_panel_entropy' class='config-info-title text-center'>
                                    Entropy
                                </div>
                                <div id='info_entropy' class='info-quality-label text-center'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
  </div>
    <script src='../vendor/jquery-3.5.1.min.js'></script>
    <script src="../vendor/popper.min.js"></script>
    <script src="../vendor/bootstrap.min.js"></script>
    <script src="./pass_check_man.js"></script>
    <script src="./pass_check.js"></script>
    <script src="./pass_gen.js"></script>
    <script src="./pass_gen_manager.js"></script>
    <script src='./popup.js'></script>
    <script src='../js/options.js'></script>
  </body>
</html>