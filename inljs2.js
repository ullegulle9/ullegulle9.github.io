window.onload = function () {

    let requestBtn = document.getElementById('reqBtn');
    const apiKey = 'GDQwy';
    let bkAuthor = document.getElementById('bAuthor');
    let bkTitle = document.getElementById('bTitle');
    let addBooks = document.getElementById('addData');
    let secondApi = document.getElementById('secondAPI');
    let apiSucc = document.getElementById('apiSuccess');
    apiSucc.style.display = 'none';
    let apiFail = document.getElementById('apiFail');
    apiFail.style.display = 'none';
    let succeed = document.getElementById('success');
    succeed.style.display = 'none';
    let error = document.getElementById('fail');
    error.style.display = 'none';
    let viewLib = document.getElementById('getLibr');
    let tbody = document.getElementById('bookList');
    let bookTable = document.getElementById('libTable');
    bookTable.style.display = 'none';
    //console.log(bookTable.style.display);
    let viewBox = document.getElementById('view');
    let errorBx = document.getElementById('errorBox');
    errorBx.style.display = 'none';
    let clickCount = 0;
    let googleKey = 'AIzaSyCzu8UBYkafWG1BaUwyKpOOmyRv4PdRGMc';
    let goglBtn = document.getElementById('googleBtn');


    let tdEdit = document.getElementsByClassName('editBtn');
    let tdDelete = document.getElementsByClassName('deleteBtn');

    //apiKey = localStorage.getItem("apiKey");

    let database = [];


    requestBtn.addEventListener('click', function (ev) {
        let keyReq = new XMLHttpRequest;
        console.log('displ: ' + bookTable.style.display);
        let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
        keyReq.onreadystatechange = function () {
            if (keyReq.status == 200 && keyReq.readyState == 4) {
                let data = JSON.parse(keyReq.responseText);

                if (data.status == 'success') {
                    apiSucc.style.display = 'block';
                    apiSucc.innerHTML = data.key;
                    console.log(data);
                    //apiKey = data.key;
                    //localStorage.setItem("apiKey", apiKey);
                } else {
                    apiFail.style.display = 'block';
                    apiFail.innerHTML = 'Error!';
                }

            }
        }
        keyReq.open('GET', url);
        keyReq.send();
    });

    addBooks.addEventListener('click', function (ev) {
        addBooksToDB(bkTitle.value, bkAuthor.value);
    })

    function addBooksToDB(titl, auth) {
        title = titl;
        author = auth;
        console.log(title);

        let addReq = new XMLHttpRequest;

        let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=' + apiKey + '&title=' + title + '&author=' + author;

        addReq.onreadystatechange = function () {
            if (addReq.status == 200 && addReq.readyState == 4) {
                let data = JSON.parse(addReq.responseText);
                if (data.status == 'success') {
                    error.style.display = 'none';
                    succeed.style.display = 'block';
                    succeed.innerHTML = `The books have succesfully been added!`;
                    //console.log(data);
                } else {
                    addBooksToDB(title, author);
                }
            }
        }
        addReq.open('GET', url);
        addReq.send();
    }

    function getGoogleBooks() {
        let gReq = new XMLHttpRequest;
        let searchAuthor = bkAuthor.value;
        let searchText = bkTitle.value;
        let url = `https://www.googleapis.com/books/v1/volumes?q=${searchText}+inauthor:${searchAuthor}`;

        gReq.onreadystatechange = function () {
            if (gReq.status == 200 && gReq.readyState == 4) {
                let data = JSON.parse(gReq.responseText);
                let bookList = data.items;
                
                for (let i = 0; i < 5; i++) {
                    if (bookList[i].volumeInfo.hasOwnProperty('authors')){
                        console.log(bookList[i]);
                    let title = bookList[i].volumeInfo.title;
                    let author = bookList[i].volumeInfo.authors[0];
                    addBooksToDB(title, author);
                    }
                    
                }
            } else {
                console.log('Google not');
                console.log(gReq.status);
            }
        }
        gReq.open('GET', url);
        gReq.send();
    }

    goglBtn.addEventListener('click', getGoogleBooks);

    viewLib.addEventListener('click', viewBooks);

    function viewBooks(e) {
        console.log(apiKey);
        let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=' + apiKey;
        let viewReq = new XMLHttpRequest;

        viewReq.onreadystatechange = function () {

            if (viewReq.readyState == 4 && viewReq.status == 200) {
                let data = JSON.parse(viewReq.responseText);
                if (data.status == 'success') {
                    bookTable.style.display = 'table';
                    tbody.innerHTML = '';
                    for (let i = 0; i < data.data.length; i++) {
                        let tRow = document.createElement('TR');
                        tbody.appendChild(tRow);
                        let html =
                            `<td>${data.data[i].id}</td>
                    <td>${data.data[i].title}</td>
                    <td>${data.data[i].author}</td>
                    <td><span class="glyphicon glyphicon-edit editBtn" style="cursor: pointer"></span></td>
                    <td><span class="glyphicon glyphicon-trash deleteBtn" style="cursor: pointer"></span></td>`;
                        tRow.innerHTML = html;
                        tdEdit = tRow.querySelector("td:nth-child(4)");
                        tdDelete = tRow.querySelector("td:nth-child(5)");
                        //console.log(tdEdit);
                        tdDelete.addEventListener('click', deleteItem);
                        tdEdit.addEventListener('click', function (ev) {
                            clickCount++;
                            editItem(ev, data);
                        });

                        /*
                                            let bookObj = {
                                                id: data.data[i].id,
                                                title: data.data[i].title,
                                                author: data.data[i].author
                                            }
                                            database.push(bookObj);
                                            console.log('database: ' + database);*/
                    }
                } else {
                    /*
                let tbody = document.getElementById('bookList');
                let tr1 = tbody.createElement('TR');
                tr1.appendChild(tbody);
               for (let i = 0; i<data.length; i++){
                    console.log(data[i].id);*/
                    viewBooks();
                }

            }

        }
        viewReq.open('GET', url);
        viewReq.send();
        viewLib.innerText = "Hide books";
        viewLib.removeEventListener('click', viewBooks);
        viewLib.addEventListener('click', hide);
    }
    
    function hide(){
        bookTable.style.display = 'none';
        viewLib.removeEventListener('click', hide);
        viewLib.addEventListener('click', viewBooks);
        viewLib.innerText = 'View books';
    }

    let errorBool = false;
    

    function editItem(ev, data) {
        if (clickCount < 2) {
            let row = ev.target.parentElement.parentElement;
            console.log(row.querySelector("td:nth-child(2)").innerHTML);
            row.querySelector("td:nth-child(2)").innerHTML = `<input type="text" value="${row.querySelector("td:nth-child(2)").innerHTML}">`;
            row.querySelector("td:nth-child(3)").innerHTML = `<input type="text" value="${row.querySelector("td:nth-child(3)").innerHTML}">`;

            let id = row.querySelector("td:nth-child(1)").innerHTML;

            let editTitle = row.querySelector("input:nth-child(1)");
            console.log(editTitle);



            let editAuth1 = row.querySelector("td:nth-child(3)");
            let editAuth2 = editAuth1.querySelector("input:nth-child(1)");
            console.log(editAuth2);
            console.log(id);

            function updateBook() {
                if (errorBool) {
                    errorBool = false;
                } else {
                    let newTitle = row.querySelector("input:nth-child(1)").value;

                    let newAuth = editAuth1.querySelector("input:nth-child(1)").value;

                    let modReq = new XMLHttpRequest;
                    console.log(id);
                    console.log(newTitle);
                    console.log(newAuth);
                    modReq.onreadystatechange = function () {
                        if (errorBool) {
                            errorBool = false;
                        } else {
                            console.log('EVENT');
                            if (modReq.status == 200 && modReq.readyState == 4) {
                                //console.log(modReq.responseText);

                                let resp = JSON.parse(modReq.responseText);
                                console.log(resp);
                                if (resp.status == 'success') {
                                    console.log(resp.status);
                                    editTitle.removeEventListener('blur', updateBook);
                                editAuth2.removeEventListener('blur', updateBook);
                                    viewBooks();
                                    clickCount = 0;
                                } else if (resp.status == 'error') {
                                    errorBool = true;
                                    showErrorBox();
                                }


                            } else {
                                console.log('Inte 200');
                            }
                        }

                    }

                    let url = `https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${apiKey}&id=${id}&title=${newTitle}&author=${newAuth}`;
                    modReq.open('GET', url);
                    modReq.send();
                }

            }
            editTitle.addEventListener('keypress', function (e) {
                if (e.keyCode == 13) {
                    console.log('Title-keypress');
                    updateBook();
                }
            })
            editAuth2.addEventListener('keypress', function (e) {
                if (e.keyCode == 13) {
                    console.log('Auth-keypress');
                    updateBook();
                }
            })
            
            editTitle.addEventListener('blur', updateBook);
            editAuth2.addEventListener('blur', updateBook);

        }

    }

    function showErrorBox() {
        errorBx.style.display = 'block';
        let html = `Something went wrong. <br>
                                Please try again.
<span class="top-right" id="closeBox">Close(X)</span>`;
        errorBx.innerHTML = html;
        let close = document.getElementById('closeBox');
        close.addEventListener('click', function (e) {
            errorBx.style.display = 'none';
            errorBool = false;
        })
    }

    function deleteItem(ev) {
        let row = ev.target.parentElement.parentElement;
        console.log(row);
        let id = row.querySelector("td:nth-child(1)").innerHTML;
        console.log(id);
        let delReq = new XMLHttpRequest;
        delReq.onreadystatechange = function () {
            if (delReq.readyState == 4 && delReq.status == 200) {
                let resp = JSON.parse(delReq.responseText)
                if (resp.status == 'success') {
                    viewBooks();
                } else if (resp.status == 'error') {
                    errorBx.style.display = 'block';
                    let html = `Something went wrong. <br>
                                Please try again.
<span class="top-right" id="closeBox">Close(X)</span>`;
                    errorBx.innerHTML = html;
                    let close = document.getElementById('closeBox');
                    console.log(close);
                    close.addEventListener('click', function (e) {
                        errorBx.style.display = 'none';
                    })
                }
            } else {
                console.log('delete error');
            }
        }
        let url = `https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=${apiKey}&id=${id}`;
        delReq.open('GET', url);
        delReq.send();

    }
}
