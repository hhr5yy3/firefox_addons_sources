var htmlFactory;void 0===htmlFactory&&(htmlFactory={getShadowRootStyle:function(){return`<style>
        * {
          box-sizing: border-box;
          font-family: inherit;
        }

        .dialog {
          font-family: 'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;
          position: fixed;
          width: 100%;
          top: 0;
          opacity: 0.9;
          border: 1px solid #000;
          background-color: #fff;
          z-index: 2147483647; /* Highest value accepted in modern browsers */
          overflow: auto;
        }

        .dialog-2 {
          font-family: 'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;
          font-size: 14px;
          position: fixed;
          top: 10px;
          right: 0px;
          background-color: #fff;
          z-index: 2147483647; /* Highest value accepted in modern browsers */
          overflow: hidden;
          animation: dialog-2-fade-in .5s linear;
          min-height: 130px;
          width: 360px;
          box-shadow: 0px 0px 10px #071b2c;
        }

        .dialog-2.fade-out {
          animation: dialog-2-fade-out .5s linear;
          right: -440px;
        }

        .dialog-2 .button-container a {
          margin-right: 5px;
        }

        .dialog-2 .logo-container{
          align-items: center;
          display: flex;
          gap: 8px;
          font-weight: 500;
        }

        .dialog-2 .close-btn{
          min-height: 16px;
        }

        @keyframes dialog-fade-in {
          from {
            top: -60px;
            overflow: hidden;
          }
          to {
            top: 0px;
            overflow: auto;
          }
        }

        @keyframes dialog-2-fade-in {
          from {
            right: -440px;
          }
          to {
            right: 0px;
          }
        }

        @keyframes dialog-2-fade-out {
          from {
            right: 0px;
          }
          to {
            right: -440px;
          }
        }

        .dialog.debug {
          left: 0;
          right: initial;
          font-size: 12px;
          height: initial;
          max-height: 100vh;
          top: initial;
          bottom: 0;
          width: 500px;
          animation-name: initial;
          padding: 5px;
        }

        .opacity-3 {
          opacity: 0.3;
        }

        .dialog-2 a {
          border: 1px solid #dce0e4;
          padding-right: 4px;
          padding-left: 4px;
          cursor: pointer;
          background-color: white;
          color: black;
          display: inline-block;
          transition: background-color 0.15s ease-in-out;
        }

        .dialog-2 a:hover {
          background-color: #dce0e4;
        }

        .dialog-2 .close-button {
          width: initial;
          position: absolute;
          right: 0px;
        }

        .mb {
          margin-bottom: 20px;
        }

        .float-right {
          float: right;
        }

        .clear-fix {
          clear: both;
        }

        .url-container {
          word-break: break-all;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: 0;
        }

        textarea, input, select {
          font-family: inherit;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .dialog .main {
          display: flex;
          justify-content: space-between;
          flex: 1 0;
        }

        .main .title-container {
          min-height: 32px;
          background-color: #1f75be;
          color: white;
          padding: 8px;
          border-bottom: 2px solid white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .main .title-container .title {
          font-size: 14px;
        }

        .main .content-container {
          gap: 12px;
          padding-right: 32px;
          padding-left: 32px;
          padding-top: 16px;
          padding-bottom: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 98px;
        }

        .error-message {
          color: red;
        }

        .generator-icon {
          transition: transform .1s ease-in-out;
          cursor: pointer;
        }

        .generator-icon:hover {
          transform: scale(1.1);
        }

        .dropdown {
          display: inline-block;
          position: relative;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          right: 0;
          margin-top: -1px;
          min-width: 160px;
          z-index: 1;
        }

        .dropdown-content a {
          color: black;
          text-decoration: none;
          display: block;
          margin-top: 0;
          padding-top: 2px;
          padding-bottom: 2px;
          white-space: nowrap;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .text-black {
          color: black;
        }
      </style>
      `}});