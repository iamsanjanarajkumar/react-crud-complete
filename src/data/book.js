import {toast} from 'react-toastify'


let books = JSON.parse(localStorage.getItem("books")) || []
let loginUser = JSON.parse(localStorage.getItem("loginUser"));

const addBook = async(book) =>{
    let extTitle = books.find((item) => item.title === book.title)
    if(extTitle) {
        toast.success(`Book title is ${book.title} already exists  `)
    } else{
        if(loginUser){
            let data = {
                email: loginUser,
                ...book
            };
                books.push(data);
                save();
                toast.success("New Book added successfully");
                setInterval(() =>{
                    window.location.href ="/";

                },3000);
    }
 }
}

const readBooks =() =>{
   let filBooks = books.filter(item => item.email === loginUser)
   if(filBooks) {
    return filBooks;
   } else {
    return [];
   }
}

const readSingle = (id) =>{
    let extdata =  books.find((item) => item.id === id);
    if(!extdata){
        toast.warning(`Requested book id ${id} is not matched`)
    } else if(extdata.email !== loginUser){
        toast.warning('UnAuthorized User..')
    } else {
        return extdata;
    }
}

const updateBook =  (book,id) => {
    if(book.email !== loginUser){
        toast.warning("Un-Authorized Access denied ...");
    } else {
        let extBookIndex = books.findIndex(item => item.id === book.id);
        if(!extBookIndex){
            toast.warning("Requested Book id not found");
        } else{
            books.splice(extBookIndex , 1 ,book);
            save();
            toast.success("Book Details updated Successfully!");
            setInterval(() =>{
                window.location.href ="/";

            },3000);
        }
    }
}

const deleteBook = (id) => {
    let extBookIndex = books.findIndex(item => item.id === id)//index position
    let extBook = books.find(item => item.id === id) //books data

    if(extBook.email !== loginUser){
        toast.warning("Un-Authorized Access denied ...");
    }  else{
        if(!extBookIndex){
            toast.warning("Requested Book id is not found")
        } else {
      books.splice(extBookIndex ,1)
      save();
      toast.success("Book data successfully deleted!")
      setInterval(() =>{
        window.location.href ="/";

    },3000);
    }
 }
}


const save = () => { 
    localStorage.setItem("books",JSON.stringify(books))
}

export {addBook,readBooks ,readSingle, updateBook,deleteBook}