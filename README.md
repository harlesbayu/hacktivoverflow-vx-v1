#MYAPP - SOLVEKU

## CARA MENGGUNAKAN APLIKASI

```
Lakukan npm install pada folder server.
Jalankan perintah "npm start" pada terminal *(buka terminal pada folder server).
Jalankan perintah npm run serve pada terminal *(buka terminal pada folder client).
Jalankan mongod pada terminal, atau bisa menggunakan database MLAB, Keteranangan ada pada file .env
```

##SERVER SIDE 

###USER

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /users/signup             | POST   | Registrasi user                                            |
| /users/signin             | POST   | Login user manul                                           |
| /users/signinFB           | POST   | Login user melalui facebook                                |


###QUESTION

|           Route                  |   HTTP  |                         Description                              |
|----------------------------------|---------|------------------------------------------------------------------|
| /questions                       | GET     | Menampilkan semua daftar questions                               |
| /questions/findQuestionUser/:id  | GET     | Menampilkan satu question                                        |
| /questions/myQuestions           | GET     | Menampilkan questions user yang sudah login                      |
| /questions/mostAnswers           | GET     | Menampilkan daftar questions dengan jawaban terbanyak lim 10     |  
| /questions/popularQuestions      | GET     | Menampilkan daftar questions dengan jumlah like terbanyak lim 10 |
| /questions/searchQuestuon        | GET     | Pencarian Question berdasarkan title                             |
| /questions/create                | POST    | Membuat question baru                                            |
| /questions/remove/:id            | DELETE  | Menghapus question                                               |
| /questions/update/:id            | PUT     | Update question                                                  |
| /questions/upvote/:id            | POST    | Upvote question                                                  |
| /questions/downvote/:id          | POST    | downvote question                                                |


###ANSWER

|           Route                  |   HTTP  |                         Description                              |
|----------------------------------|---------|------------------------------------------------------------------|
| /answers/update/:id              | PUT     | Update answer                                                    |
| /answers/create/:id              | POST    | Membuat answer baru (:id => id question)                         |
| /answers/upvote/:id              | GET     | Upvote answer                                                    |
| /answers/downvote/:id            | GET     | downvote answer                                                  |  


```
Flow aplikasi :
user melakukan registrasi secara manual atau bisa masuk menggunakan facebook sigin
setelah berhasil melakukan registrasi

Setelah berhasil login : 
 * user dapat mebuat question
 * user dapat melakukan upvote atau downvote pada question atau answer user lain (* tidak bisa milik sendiri)
```


## TOOLS YANG DIGUNAKAN

* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [live-server](https://www.npmjs.com/package/live-server)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [mongodb](https://www.mongodb.com/)
* [express](https://www.npmjs.com/package/express)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [postman](https://www.getpostman.com)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [axios](https://www.npmjs.com/package/axios)
* [cors](https://www.npmjs.com/package/cors)
* [MLab](https://www.mlab.com)
* [vue](https://vuejs.org/)
* [vuetify](https://vuetifyjs.com/en/)
* [Material Icon](https://material.io/tools/icons/?style=baseline)


