**Google Sheet Automation** https://github.com/Illusion0-0/zecko/blob/main/Google%20Sheets%20Automation.mp4

Clone the repository
```bash
  git clone https://github.com/Illusion0-0/zecko.git
  cd zecko/
```
Install required NPM packages
```bash
npm i
```
Get the access-token from the Google Auth2 Playground: https://developers.google.com/oauthplayground/

1. Find the **Google Sheets API V4**:
2. Click on it, and then click the scope: https://www.googleapis.com/auth/spreadsheets
3. Click **Authorize APIs**. You'll be asked to sign in with Google and provide access. Sign in, and then hit **Allow** so you can use the scope.
4. After you login and authorize it, you'll get an Authorization code, click **Exchange authorization code for tokens**.
5. Copy the **ACCESS TOKEN**, you can check Auto-refresh token before it expires

Create a dotenv(.env or .env.local) file outside src and add variables
> REACT_APP_SHEET_ID = {google-spreadsheet-id}
> REACT_APP_ACCESS_TOKEN = {OAuth2.0-access-token}

Run the APP using
```bash
npm start
```
<br/>
Note: Access Token expires in a while so you may need to generate it again.
<br/>
Note: Re-run [npm start] after you change .env file.

Thank you for visiting this repo :D
