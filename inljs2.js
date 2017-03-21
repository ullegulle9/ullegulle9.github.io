window.onload = function () {

    let requestBtn = document.getElementById('reqBtn');
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
    let viewBox = document.getElementById('view');
    let errorBx = document.getElementById('errorBox');
    errorBx.style.display = 'none';
    let clickCount = 0;
    let googleKey = 'AIzaSyCzu8UBYkafWG1BaUwyKpOOmyRv4PdRGMc';
    let goglBtn = document.getElementById('googleBtn');

    let apiKey;
    let tdEdit = document.getElementsByClassName('editBtn');
    let tdDelete = document.getElementsByClassName('deleteBtn');


    if (localStorage.getItem("apiKey") !== null) {

        apiKey = localStorage.getItem("apiKey");


    }




    requestBtn.addEventListener('click', function (ev) {
        let keyReq = new XMLHttpRequest;
        let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
        keyReq.onreadystatechange = function () {
            if (keyReq.status == 200 && keyReq.readyState == 4) {
                let data = JSON.parse(keyReq.responseText);

                if (data.status == 'success') {
                    apiSucc.style.display = 'block';
                    apiSucc.innerHTML = `You API Key is: ${data.key}. This app will remember your API Key for future visits, but you are free to request a new one at any time. Please notice that your local library is connected to a unique key and the library will NOT be accesable if you change API Keys.`;
                    apiKey = data.key;
                    localStorage.setItem("apiKey", apiKey);
                } else {
                    apiFail.style.display = 'block';
                    apiFail.innerHTML = 'Something went wrong, please try again.';
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
        if (apiKey === undefined || apiKey === null) {
            showErrorBox();
        } else {
            title = titl;
            author = auth;
          

            let addReq = new XMLHttpRequest;

            let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=' + apiKey + '&title=' + title + '&author=' + author;

            addReq.onreadystatechange = function () {
                if (addReq.status == 200 && addReq.readyState == 4) {
                    let data = JSON.parse(addReq.responseText);
                    if (data.status == 'success') {
                        error.style.display = 'none';
                        succeed.style.display = 'block';
                        succeed.innerHTML = `The books have succesfully been added!`;
                  
                    } else {
                        addBooksToDB(title, author);
                    }
                }
            }
            addReq.open('GET', url);
            addReq.send();
        }


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
                    if (bookList[i].volumeInfo.hasOwnProperty('authors')) {
                        let title = bookList[i].volumeInfo.title;
                        let author = bookList[i].volumeInfo.authors[0];
                        addBooksToDB(title, author);
                    }

                }
            }
        }
        gReq.open('GET', url);
        gReq.send();
    }

    goglBtn.addEventListener('click', getGoogleBooks);

    viewLib.addEventListener('click', viewBooks);

    function viewBooks(e) {
        if (apiKey === undefined || apiKey === null) {
            showErrorBox();
        } else {
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

                            tdDelete.addEventListener('click', deleteItem);
                            tdEdit.addEventListener('click', function (ev) {
                                clickCount++;
                                editItem(ev, data);
                            });
                        }
                    } else {
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

    }

    function hide() {
        bookTable.style.display = 'none';
        viewLib.removeEventListener('click', hide);
        viewLib.addEventListener('click', viewBooks);
        viewLib.innerText = 'View books';
    }

    let errorBool = false;


    function editItem(ev, data) {
        if (clickCount < 2) {
            let row = ev.target.parentElement.parentElement;
            row.querySelector("td:nth-child(2)").innerHTML = `<input type="text" value="${row.querySelector("td:nth-child(2)").innerHTML}">`;
            row.querySelector("td:nth-child(3)").innerHTML = `<input type="text" value="${row.querySelector("td:nth-child(3)").innerHTML}">`;

            let id = row.querySelector("td:nth-child(1)").innerHTML;

            let editTitle = row.querySelector("input:nth-child(1)");



            let editAuth1 = row.querySelector("td:nth-child(3)");
            let editAuth2 = editAuth1.querySelector("input:nth-child(1)");

            function updateBook() {
                if (errorBool) {
                    errorBool = false;
                } else {
                    let newTitle = row.querySelector("input:nth-child(1)").value;

                    let newAuth = editAuth1.querySelector("input:nth-child(1)").value;

                    let modReq = new XMLHttpRequest;
                    modReq.onreadystatechange = function () {
                        if (errorBool) {
                            errorBool = false;
                        } else {
                            if (modReq.status == 200 && modReq.readyState == 4) {
                                let resp = JSON.parse(modReq.responseText);
                                if (resp.status == 'success') {
                                    editTitle.removeEventListener('blur', updateBook);
                                    editAuth2.removeEventListener('blur', updateBook);
                                    viewBooks();
                                    clickCount = 0;
                                } else if (resp.status == 'error') {
                                    errorBool = true;
                                    showErrorBox();
                                }


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
                    updateBook();
                }
            })
            editAuth2.addEventListener('keypress', function (e) {
                if (e.keyCode == 13) {
                    updateBook();
                }
            })

            editTitle.addEventListener('blur', updateBook);
            editAuth2.addEventListener('blur', updateBook);

        }

    }

    function showErrorBox() {
        errorBx.style.display = 'block';
        let html;
        if (apiKey === undefined || apiKey === null) {
            html = `You don't seem to have an API Key. <br>
                                Please request one and try again.
<span class="top-right" id="closeBox">Close(X)</span>`;
        } else {
            html = `Something went wrong. <br>
                                Please try again.
<span class="top-right" id="closeBox">Close(X)</span>`;
        }

        errorBx.innerHTML = html;
        let close = document.getElementById('closeBox');
        close.addEventListener('click', function (e) {
            errorBx.style.display = 'none';
            errorBool = false;
        })
    }

    function deleteItem(ev) {
        let row = ev.target.parentElement.parentElement;
        let id = row.querySelector("td:nth-child(1)").innerHTML;
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
                    close.addEventListener('click', function (e) {
                        errorBx.style.display = 'none';
                    })
                }
            }
        }
        let url = `https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=${apiKey}&id=${id}`;
        delReq.open('GET', url);
        delReq.send();

    }
}
