
const addbox = document.querySelector(".add-box");
 popupbox = document.querySelector(".popup-box");
 popup = popupbox.querySelector(".popup");

 popuptitle = popupbox.querySelector("header p");
 closeicon = popupbox.querySelector("header i");
 titleTag = popupbox.querySelector("input");
 descTag = popupbox.querySelector("textarea");
 addBtn = popupbox.querySelector(" form ");
  editBtn = popupbox.querySelector(".content form button ");



 const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 const notes=JSON.parse(localStorage.getItem("notes") || "[]"); // hiển thị danh sách cũ nhất
//  const notes=JSON.parse(localStorage.getItem("save") || "[]"); hiển thị key khác nhau
let isUpdate=false;
let updateId=-1;


addbox.addEventListener("click", ()=> {
    titleTag.focus();
    popupbox.classList.add("show");
    popuptitle.innerText="Add a new note"
    editBtn.textContent="Add Note";

    
    
});

function display()
{

    if(popupbox.classList.contains("show"))
    {
        popupbox.addEventListener("click",e=>
    {
    if(e.target!=popup)
    {
        popupbox.classList.remove("show");
        console.log(popup);
    
    }
    })

    }
}

  
closeicon.addEventListener("click", () => {
    isUpdate=false;
    titleTag.value=``;
    descTag.value=``;
    popuptitle.innerText="Add a new note"
    editBtn.textContent="Add Note";
    popupbox.classList.remove("show");
});

const showNotes=()=>
{
    document.querySelectorAll(".note").forEach(note =>
        {
            note.remove();
        })
   notes.forEach((note,index) => 
    {
        
let liTag=`  <li class="note">
<div class="details">
    <p>${note.title}</p>
    <span>${note.description}</span>
    <div class="bottom-content">
        <span>${note.date}</span>
        <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
                <li onclick="editNote(${index})"><i class="uil uil-pen"></i>Edit</li>
                <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>

            </ul>
        </div>

    </div>
</div>
</li>`;

addbox.insertAdjacentHTML("afterend",liTag);
        

   }); 
}
showNotes();


const showMenu=item =>
{
item.parentElement.classList.add("show");
document.addEventListener("click",e=>
{
    if(e.target.tagName!="I" || e.target!=item)
    {
        item.parentElement.classList.remove("show");
    }
})
};



async function deleteNote(i)
{
     let confirmDel=confirm("Are you sure want to delete this note?");
    if(!confirmDel)
     return;
else
{

    notes.splice(i,1);
    localStorage.setItem("notes",JSON.stringify(notes)); 
showNotes();
}
}

 function editNote(i)
{
    isUpdate=true;
    updateId=i;

    addbox.click();
    popuptitle.innerText="Update a Note"
    editBtn.textContent="Save Note"; //dùng  innter text cũng được
    
  let note=notes[i];
   title=titleTag.value=note.title;
  description= descTag.value=note.description;



  


}




//   addBtn.addEventListener('keydown',e=>
//   {
//     if(e.key==='Enter')
//     {
//         addBtn.submit();
//     }
//   })

addBtn.addEventListener('submit',e=>
{
    e.preventDefault();
   let noteDesc=descTag.value;
   let noteTitle=titleTag.value;
   if(noteTitle|| noteDesc)
   {
    let dateObj= new Date(),
    month=months[dateObj.getMonth()],
    day=dateObj.getDate(),
    year=dateObj.getFullYear();

    let noteInfo=
    {
        title:noteTitle,
        description:noteDesc,
        date:`${month} ${day}, ${year}`
    }

    if(!isUpdate)
    {
        notes.push(noteInfo);

    }

    else
    {
        isUpdate=false;
        notes[updateId]=noteInfo;
    }
    localStorage.setItem("notes",JSON.stringify(notes)); //lưu vào ds

    document.addEventListener('keydown',e=>
    {
      if(e.key==='Enter')
      {
          addBtn.submit();
      }
    })
    closeicon.click();
    showNotes();

   }

})
