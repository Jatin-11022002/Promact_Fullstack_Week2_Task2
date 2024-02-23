# Setup Guide

Follow the below steps for setting up the application and using it to generate PDF for any valid URL

-Step 1: Clone the repository in your local by using below command

'''
git clone  https://github.com/Jatin-11022002/Promact_Fullstack_Week2_Task2.git

'''

-Step 2: Navigate to "backend" folder by using below command in terminal (Assuming to be currently in root folder):

'''
cd backend
'''

-Step 3: Now run below command for installing dependencies required by application:
'''
npm install
'''

-Step 4: In backend folder you will find one file named as ".env.sample", rename the file to ".env". This step is necessary as all important URL and API key used by the application are stored in this file. You can also use your own values in the file for altering the behaviour of application.

-Step 5: run below command to start the backend server:
'''
node server.js
'''

Now you should be getting "SERVER STARTED" message in console, denoting that backend server is running successfully.


-Step 6: Now open another terminal and use below command to navigate to frontend folder (Assuming to be currently in root folder):

'''
cd frontend
'''

-Step 7: Now run below command for installing dependencies required by application:
'''
npm install
'''

-Step 8: In frontend folder you will find one file named as ".env.sample", rename the file to ".env". This step is necessary as all important URL and API key used by the application are stored in this file. You can also use your own values in the file for altering the behaviour of application.

-Step 9: run below command to start the frontend server:
'''
npm run dev
'''

You will be able to see the url on console, denoting that React server is running successfully. Navigate to that url in your browser

Now you will be able to use the application and can try generating webpage of any valid url to PDF.
