# ProTracker
This repository contains the 6th Semester Project Based Learning undertaking, ProTracker, a task assignment and managing web app, built using HTML,CSS,JS and a Django backend

It is designed to let a manager of a team assign tasks to his/her team members and the members be able to recieve and mark them completed as they carry it out.

### Prerequsites: 
The required prerequsites are:
- Python 3.x
- Django (use command `pip install Django` in terminal/cmd to install)
- Pillow (use command `pip install Pillow` in terminal/cmd to install)


### Getting Started:

To get started with this web app, follow these steps:
1. Download the source code in the ***final*** branch as ZIP. Unzip it and place it in the desired location
2. Using a terminal of your preference, navigate to the ***Protracker*** folder within the downloaded folder. Do note it is the first folder with the name Protracker as the folder also contains another folder called ProTracker. Use the `dir` command(Windows) or the `ls` command(Linux/MacOS) to check the contents of the current folder, and if you can see 
  > manage.py 

![manage py](https://user-images.githubusercontent.com/45360115/127109456-0b220c9e-9572-434c-8379-b013f28c6ee9.jpg)

then you are in the correct folder!



3. Run the commands 
 ```
python manage.py makemigrations

python manage.py migrate --run-syncdb
```
4. After these commands, create a admin account for the system admin using the command `python manage.py createsuperuser` . Enter the details and credentials neccesary.
5. Finally, use the command `python manage.py runserver` to get the server up and running. You can also use `python manage.py runserver 12345` where 12345 can be any available non priviledged port that you wish to run at. By default, the server will be hosted on the 8000 port, and going to `http://127.0.0.1:8000/` on your browser will show you the login page!![loginpage](https://user-images.githubusercontent.com/45360115/127109489-5e20c60b-e7d7-4389-9420-8583dc4b8220.jpg)

6. However, before we can login, the admin needs to create the managers and employees who will be able to login to the app. For this, got to `http://127.0.0.1:8000/admin/`  on your browser, ![admin](https://user-images.githubusercontent.com/45360115/127109548-48372320-2db5-41d5-9572-c93853d54237.jpg)
and login using the credentials created for the admin.
7. Once logged in, click on the ***Managers*** tab under the ***app*** header. ![manager](https://user-images.githubusercontent.com/45360115/127109699-dd776f49-33ae-467a-925a-ca967cd24efb.jpg)
Then click on the add Manager and fill in the details of the first manager. Do so for all such managers within the organization.

8. Once done, click on the ***Employees*** tab on the left hand side,![employee](https://user-images.githubusercontent.com/45360115/127109761-59ac1987-1325-4993-899b-e7711a078914.jpg)
 and repeat process for all of the employees in the organization.
9. And thats it! Now all the users can login and see their tasks flow!
