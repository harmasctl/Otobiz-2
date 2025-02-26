export const emailTemplates = {
  verification: {
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00853f;">Verify your email address</h1>
        <p>Please click the button below to verify your email address:</p>
        <a 
          href="{{verificationUrl}}"
          style="
            display: inline-block;
            background-color: #00853f;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin: 16px 0;
          "
        >
          Verify Email
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p>{{verificationUrl}}</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  },
  welcome: {
    subject: "Welcome to Otobiz!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00853f;">Welcome to Otobiz!</h1>
        <p>Thank you for joining our vehicle marketplace. Here's what you can do next:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Browse available vehicles</li>
          <li>List your own vehicle</li>
          <li>Connect with sellers</li>
        </ul>
        <a 
          href="{{dashboardUrl}}"
          style="
            display: inline-block;
            background-color: #00853f;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin: 16px 0;
          "
        >
          Go to Dashboard
        </a>
      </div>
    `,
  },
  passwordReset: {
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00853f;">Reset your password</h1>
        <p>Click the button below to reset your password:</p>
        <a 
          href="{{resetUrl}}"
          style="
            display: inline-block;
            background-color: #00853f;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin: 16px 0;
          "
        >
          Reset Password
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p>{{resetUrl}}</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  },
};
