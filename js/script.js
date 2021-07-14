const listKegiatan = {
   aktifitas: "",
   complete: false
}
// Mengatasi Pop-Up
const localStorageName = "nama-header";
const storageKey = "key-list";
const addName = document.querySelector('.pop-up');
const yourName = document.querySelector('.your-name')
const getElementButton = document.querySelector('.mid button');
const blank = document.querySelector('.kotak-blank');
const getElementUl = document.querySelector('.kotak-kolom .list-kolom ul');
const munculkan = document.querySelectorAll('.kotak-kolom .list-kolom ul li');
const getHeadingJadwalkan = document.querySelector('.kotak-kolom .list-kolom h1');

// Menghilangkan Tulisan "Jadwalkan Kegiatan Anda" Ketika Daftar List Dibuat Dan Menghilangkan Daftar List Ketika
// Memencet Tombol "X"
getElementUl.addEventListener('click', function(e){
   const getLi = getElementUl.querySelectorAll('li');
   if(e.target.tagName === 'P'){
      const getChild = e.target.parentElement.children[1].firstChild.innerHTML;
      const getListKegiatan = getUser()
      const filterKegiatan = getListKegiatan.map(listKegiatan => listKegiatan).filter(newListKegiatan => {
         if(getChild !== newListKegiatan.aktifitas){
            return newListKegiatan
         }
      });

      localStorage.setItem(storageKey, JSON.stringify(filterKegiatan))
      if(getLi.length <= 1 ){
         getHeadingJadwalkan.style.display = 'block';
      }
      e.target.parentElement.remove()
      
   }
})


// Menyimpan List Data Ke Dalam LocalStorage
const runStorage = (user) => {
   if(checkStorage()){
      let listData = [];
      if(localStorage.getItem(storageKey) === null){
         listData = [];
      }
      else {
         listData = JSON.parse(localStorage.getItem(storageKey));
      }
      listData.push(user);
      localStorage.setItem(storageKey, JSON.stringify(listData))
   }

}




// Menghapus Kotak Pop-Up Atau Masukkan Nama Ketika Memencet Tombol Submit
// Serta Menghapus Kotak Blank Warna Hitam Ketika Ingin Memasukkan Nama
// 
getElementButton.addEventListener('click', function(){
   const ambilValue = yourName.value
   if(ambilValue.length > 0){
      addName.style.display = 'none'
      localStorage.setItem(localStorageName, JSON.stringify(ambilValue))
      excuteName()
      blank.classList.remove('kotak-blank')
   }
})

// Memunculkan nama di header
function excuteName (){
   const getNameHeader = getName();
   const buatName = `<h4 class="heading-3">Hallo, ${getNameHeader}</h4>
                     <button class="change-name">Ganti Nama</button>`
   const masukName = document.querySelector('.bagian-1');
   masukName.innerHTML = buatName;
}


// Menambahkan List ketika mengisi kotak input
function addList (){
   const isiList = document.getElementById('form-list');
   const newIsiList = isiList.value;
   listKegiatan.aktifitas = newIsiList
   runStorage(listKegiatan)
   let li = document.createElement('li');
   li.setAttribute('class', 'pas')
   li.innerHTML = `<input type="checkbox" id=${createId()} />
                     <label class="baru" for=${createFor()}><span>${newIsiList}</span></label>
                     <p>X<p>`;
   
   const masukkanList = document.querySelector('.cointainer ul')
         masukkanList.appendChild(li);
                  
         // menghapus value form yang sudah diketik
         isiList.value = '';
}

// Mendpatkan semua List dari localstorage
function getAllList (listData) {
   listData.forEach(list => {
      let li = document.createElement('li');
      li.setAttribute('class', 'pas')
      li.innerHTML = `<input type="checkbox" id=${createId()} />
                     <label class="baru" for=${createFor()}><span>${list.aktifitas}</span></label>
                     <p>X<p>`;
         
         const masukkanList = document.querySelector('.cointainer ul')
         masukkanList.appendChild(li);
   })
   const getAllElementLi = Array.from(document.querySelectorAll('.kotak-kolom .list-kolom ul li'));
   if(getAllElementLi.length > 0){
      getHeadingJadwalkan.style.display = "none";
   }

}

// Menambahkan List ketika memencet Button/Enter pada keyboard
const ambil = document.getElementById('kata1');
const getIdFormList = document.getElementById('form-list');
ambil.addEventListener('click', function(){
   if(getIdFormList.value.length > 0){
      addList()
      getHeadingJadwalkan.style.display = 'none';
      const tes = getUser();
      console.log(tes)
   }else{
      alert('Tulis Rencana Anda Terlebih Dahulu')
   }
});

getIdFormList.addEventListener('keypress', function(event){
   if(event.key === 'Enter'){
      if(getIdFormList.value.length > 0){
         addList()
         getHeadingJadwalkan.style.display = 'none';
      }else{
         alert('Tulis Rencana Anda Terlebih Dahulu')
      }
      
   }
});

// Untuk mencentang Kotak List Ketika Mengklik Daftar/Nama List
const checkbox = document.querySelectorAll('.pas input');
const centang = document.querySelector('.cointainer ul');
centang.addEventListener('click', function(e){
   const daftarKegiatan = getUser()
   if(e.target.tagName === 'LABEL'){console.log(e.target)
      const text = e.target.firstChild.innerHTML;
      e.target.classList.toggle('alpha')
      daftarKegiatan.forEach(daftar => {
         if(daftar.aktifitas === text && daftar.complete === false){
            daftar.complete = true
         }
         else if(daftar.aktifitas === text && daftar.complete === true){
            daftar.complete = false;
         }
      })
      localStorage.setItem(storageKey, JSON.stringify(daftarKegiatan))
      
   }
   else if(e.target.tagName === 'SPAN'){
      console.log(e.target.parentElement.classList.toggle('alpha'))
      e.target.parentElement.classList.toggle('alpha')
      const anotherText = e.target.innerHTML;
      daftarKegiatan.forEach(daftar => {
         if(daftar.aktifitas === anotherText && daftar.complete === false){
            daftar.complete = true
         }
         else if(daftar.aktifitas === anotherText && daftar.complete === true){
            daftar.complete = false;
         }
      })
      localStorage.setItem(storageKey, JSON.stringify(daftarKegiatan))
   }
   else if(e.target.tagName === 'INPUT'){
      e.target.parentElement.children[1].classList.toggle('alpha');
      const textHasil = e.target.parentElement.children[1].textContent;
      const daftarListKegiatan = getUser();
      if(e.target.checked === true){
         daftarListKegiatan.forEach(listData => {
            if(listData.aktifitas === textHasil){
               listData.complete = true;
            }
         })
      }else {
         daftarListKegiatan.forEach(listData => {
            if(listData.aktifitas === textHasil){
               listData.complete = false;
            }
         })
         
      }
      localStorage.setItem(storageKey, JSON.stringify(daftarListKegiatan))
   }
},false);


const cliked = document.querySelector('.cointainer ul')
cliked.addEventListener('click', function(e){
   if(e.target.tagName === 'LABEL'){
      e.target.classList.toggle('alpha')
   }
})

// Mengelola tombol centang dalam daftar List
function centangList (e){
   const allCheckbox = document.querySelectorAll('.cointainer ul li input');
   const allLabel = document.querySelectorAll('.cointainer ul li label');
   const daftarListKegiatan = getUser()

      if(e.target.tagName === "INPUT"){console.log(e.target)
         for(let i = 0; i < allCheckbox.length || i < allLabel.length; i++){
            if(allCheckbox[i].id === e.target.id){
               if(allCheckbox[i].id === allLabel[i].htmlFor){
                  daftarListKegiatan.forEach(listKegiatan => {
                     const label = allLabel[i].firstChild.textContent
                     if(listKegiatan.aktifitas === label && listKegiatan.complete === false ){
                        listKegiatan.complete = true
                     }
                     else if(listKegiatan.aktifitas === label && listKegiatan.complete === true){
                        listKegiatan.complete = false
                     }
                  })
                  localStorage.setItem(storageKey, JSON.stringify(daftarListKegiatan))
                  allLabel[i].classList.toggle('alpha');
               }
            }
         }
      }
}


// Mengoprasikan otomatis attribute id dan for
let angka = 1;
let angka2 = 1;

function createId (){
   
   let huruf = 'pas';


   let unjuk = huruf + angka++
   return unjuk
}

function createFor (){
   let huruf = 'pas';


   let unjuk = huruf + angka2++
   return unjuk
}

const checkStorage = () => {
	return typeof(Storage) !== "undefined"
}
const getUser = () => {
	if(checkStorage()){
		return JSON.parse(localStorage.getItem(storageKey)) || [];
	} 
	else {
		return [];
	}
}

const getName = () => {
   if(checkStorage()){ 
      return JSON.parse(localStorage.getItem(localStorageName)) || "";
   } 
   else {
      return "";
   }
}
const buttonGet = document.querySelector('.button-change');
buttonGet.addEventListener('click', function(e){
      blank.classList.add('kotak-blank');
      addName.style.display = 'block'
      yourName.value = ''
})
const getButtonNow = document.querySelector('.bagian-1');
getButtonNow.addEventListener('click', function(e){
   if(e.target.tagName === 'BUTTON'){
      blank.classList.add('kotak-blank');
      addName.style.display = 'block'
      yourName.value = ''
   }
})

window.addEventListener('load', function(){
   // Mendapatkan semua list data pada localstorage
   if (checkStorage()) {
		if (localStorage.getItem(storageKey) !== null){
				const userData = getUser();
				getAllList(userData);
			}
	}else{
		alert("Browser yang Anda gunakan tidak mendukung Web Storage")
	}

   // Tetap centang pada checkbox ketika di refresh
   const dapatkanUl = Array.from(document.querySelectorAll('.kotak-kolom .list-kolom ul input'));
   if(dapatkanUl.length !== 0){
      const listData = getUser();
      for(let i = 0; i < dapatkanUl.length || i < listData.length; i++){
         if(listData[i].complete === true){
            dapatkanUl[i].checked = listData[i].complete;
            dapatkanUl[i].parentElement.children[1].classList.add('alpha')
         }
      }
   }

   // Tidak akan memasukkan ulang nama ketika sudah mengisi nama di awal.
   if(localStorage.getItem(localStorageName) !== null){
      addName.style.display = 'none'
      blank.classList.remove('kotak-blank');
      excuteName();
   }
})
