let nom = document.getElementById("nom");
let vnom = document.getElementById("Vnom");
let marque = document.getElementById("marque");
let vmarque = document.getElementById("Vmarque");
let dateproduction = document.getElementById("dateproduction");
let vdateproduction = document.getElementById("Vdateproduction");
let prix = document.getElementById("prix");
let vprix = document.getElementById("Vprix");
let oui = document.getElementById("oui");
let non = document.getElementById("non");
let vpromotion = document.getElementById("Vpromotion");
let type = document.getElementById("type");
let vtype = document.getElementById("Vtype");
let tableau = document.getElementById("tableau");
let tableauG = document.getElementById("tableauG");
let BooNom = 0,BooMarque = 0 ,BooPrix = 0, BooDate = 0, BooPromotion = 0, BooType = 0;
let arr = [];

if ( localStorage.produit != null ) {
    arr = JSON.parse(localStorage.produit);
}

class Article {
    constructor(Nom,Marque,Prix,DateProduction,Type){
        this.Nom = Nom
        this.Marque = Marque
        this.Prix = Prix
        this.DateProduction = DateProduction
        this.Promotion = this.VerificationDePromo()
        this.Type =Type
    }
    Details(){
        let body = document.getElementById('body');
        let detail = document.createElement('div');
        let parag = document.createElement('p');
        let confirmation = document.createElement('button');
        confirmation.innerHTML = "Ok";
        parag.innerHTML ="<li>Nom:  "+this.Nom+ "</li><li>Marque:  "+ this.Marque+"</li><li>Prix:  "+this.Prix+" DH</li><li>Date de publication de l'article:  "+this.DateProduction+"</li><li>Promotion:  "+this.Promotion+"</li><li>Type:  "+this.Type+"</li>";
        detail.setAttribute("class","fenetredetail");
        body.appendChild(detail);
        detail.appendChild(parag);
        detail.appendChild(confirmation);
          confirmation.onclick = ok;
         function ok() {
            detail.remove();
            line();
         }
    }
    VerificationDePromo(){
         if (document.getElementById("oui").checked) 
            return "Oui";
             else 
            return "Non"; 
        }
}

//tri:
function tri() {
    arr.sort(function compare(a, b){
     if(a.Nom.toLowerCase() < b.Nom.toLowerCase())
         {return -1;}
     else if(a.Nom.toLowerCase() > b.Nom.toLowerCase())
         {return 1;}
    else return 0;
    });
}

//vider les champs
function vider() {
    nom.value ="";
    nom.style.border ="none";
    vnom.innerHTML = "";
    marque.value ="";
    marque.style.border = "none";
    vmarque.innerHTML ="";
    prix.value ="";
    prix.style.border = "";
    vprix.innerHTML ="";
    dateproduction.value ="";
    dateproduction.style.border = "";
    vdateproduction.innerHTML ="";
    document.getElementById("oui").checked = false;
    document.getElementById("non").checked = false;
    vpromotion.innerHTML ="";
    type.value = type.options[0].value;
    type.style.border = "";
    vtype.innerHTML ="";
}

// Validation de nom 
function validationNom() {
       let expnom = new RegExp('[^a-zA-Z]','g');
       if (expnom.test(nom.value) == true || nom.value.length > 30 || nom.value == "") {
           nom.style.border ="2px solid red";
           vnom.innerHTML ="Saisir nom";
           BooNom = 0;         
       } else {
           nom.style.border ="2px solid green";
           vnom.innerText="Valider";
           vnom.style.color = "green";
            BooNom = 1;
       }
}

//Validation de marque:
function validationMarque() {
  let expmarque = new RegExp('[^a-zA-Z]','g');
  if (expmarque.test(marque.value) == true || marque.value.length > 30 || marque.value == "") {
     marque.style.border ="2px solid red";
     vmarque.innerHTML ="Saisir la marque";
    BooMarque = 0;
 }else{
     marque.style.border ="2px solid green";
     vmarque.innerText="Valider";
     vmarque.style.color = "green";
   BooMarque = 1;
 }  
}

// Validation du prix  
function validationPrix() {
   let expprix = new RegExp('[^0-9.]','g');
   if (expprix.test(prix.value) == true || prix.value == "") {
       prix.style.border ="2px solid red";
       vprix.innerHTML = "Saisir le prix";
       BooPrix = 0; 
   } else {
       prix.style.border ="2px solid green";
       vprix.innerHTML = "Valider";
       vprix.style.color = "green";
       BooPrix = 1; 
   } 
}

// Validation de la date de production
function validationDate() {
   if (dateproduction.value =="" ) {
    dateproduction.style.border ="2px solid red";
    vdateproduction.innerHTML = "Saisir la date";
    BooDate = 0;
   } else {
    dateproduction.style.border ="2px solid green";
    vdateproduction.innerHTML = "Valider";
    vdateproduction.style.color = "green";
    BooDate = 1; 
   }  
}

//Validation de la promotion: 
function validationPromotion() {
    if (oui.checked == false && non.checked == false) {
        vpromotion.innerHTML = "Veuillez selctionner une promotion";
        BooPromotion = 0;
       } else {
       vpromotion.innerHTML = "Valider";
       vpromotion.style.color = "green";
       BooPromotion = 1; 
   }  
}

//Validation de type  
function validationType() {
    if(type.options[0].selected == true)  {
        type.style.border = "2px solid red";
        vtype.innerHTML = "Veuillez sectionner un type";
        BooType = 0;
    }else if (type.value) {
        type.style.border = "2px solid green";
        vtype.innerHTML = "valider";
        vtype.style.color = "green";
        BooType = 1;
    } 
}
//Ajouter
function valider(e) {
    e.preventDefault();
    validationNom();
    validationMarque();
    validationPrix();
    validationDate();
    validationPromotion();
    validationType();
    //validation de boutton ajouter
    if (BooNom == 1 && BooMarque == 1 && BooPrix == 1 && BooDate == 1 && BooPromotion == 1 && BooType == 1 ) {
           //creer un objet produit
           let produit = new Article(nom.value,marque.value,prix.value,dateproduction.value,type.value);
           arr.push(produit);
            tri();
           //afficher les donnees 
           produit.Details();
           localStorage.setItem("produit",JSON.stringify(arr));
            vider();
        }}

function line() {
        tableau.innerHTML = ""; 
   for (let i = 0; i < arr.length; i++) { 
    //creer une ligne 
    let ligne = document.createElement('tr');
    let cnom = document.createElement('td');
    let cmarque = document.createElement('td');
    let cprix = document.createElement('td');
    let cdateproduction = document.createElement('td');
    let cpromotion =document.createElement('td');
    let ctype = document.createElement('td');
    let cbutton = document.createElement('td');
    let bmodifier = document.createElement('button');
    let bsupprimer = document.createElement('button');
     //donner un nom au buttons  
     bsupprimer.innerHTML = "Supprimer";
     bmodifier.innerHTML = "Modifier";
     // lier la ligne avec le tableau
     tableau.appendChild(ligne);
     // lier les colonnes avec la ligne 
     ligne.appendChild(cnom);
     ligne.appendChild(cmarque);
     ligne.appendChild(cprix);
     ligne.appendChild(cdateproduction);
     ligne.appendChild(cpromotion);
     ligne.appendChild(ctype);
     ligne.appendChild(cbutton);
     // lier les buttons avec la colonne cbutton
     cbutton.appendChild(bsupprimer);
     cbutton.appendChild(bmodifier);
     //affecter les valeurs au colonnes creer
         cnom.innerHTML = arr[i].Nom;
         cmarque.innerHTML = arr[i].Marque;
         cprix.innerHTML = arr[i].Prix;
         cdateproduction.innerHTML = arr[i].DateProduction.split("-").reverse().join("-"); //lorsque il trouve "-" inverse la date et le separateur -
         cpromotion.innerHTML = arr[i].Promotion;
         ctype.innerHTML = arr[i].Type;
  
     //Pour supprimer une ligne
     bsupprimer.onclick = supprimer;  
     function supprimer() {
         let supp = document.createElement('div');
         let parag = document.createElement('p');
         let okB = document.createElement('button');
         let anuler = document.createElement('button');
         let body = document.getElementById('body');
         okB.innerHTML = "Ok";
         anuler.innerHTML = "Annuler";
         parag.innerHTML = "Voulez vous supprimer cette ligne?";
         supp.setAttribute("class","fenetreSupp");
         body.appendChild(supp);
         supp.appendChild(parag);
         supp.appendChild(okB);
         supp.appendChild(anuler);
           okB.onclick = ok;
           function ok(){
             supp.remove();
             tableau.removeChild(ligne);
             arr.splice(i,1);
             localStorage.setItem("produit",JSON.stringify(arr));
           }
          anuler.onclick = annuler;
          function annuler() {
             supp.remove();
          }}
     //Pour modifier une ligne
     bmodifier.onclick = modifier;
     function modifier() {
         nom.value = arr[i].Nom;
         marque.value = arr[i].Marque;
         prix.value = arr[i].Prix;
         dateproduction.value = arr[i].DateProduction;
         document.getElementById("type").value = arr[i].Type;
         if (arr[i].Promotion == "Oui") {
             document.getElementById("oui").checked = true;
         }else{
             document.getElementById("non").checked = true;
         }
         document.getElementById("ajouter").innerHTML = "Modifier";
         document.getElementById("ajouter").onclick = ModifierdeAjouter;
         function ModifierdeAjouter() {
                 arr[i].Nom = nom.value;
                 arr[i].Marque = marque.value;
                 arr[i].Prix = prix.value;
                 arr[i].DateProduction = dateproduction.value;
                 if (oui.checked == true) {
                    arr[i].Promotion = "Oui";
                 } else {
                    arr[i].Promotion = "Non";
                 }
                 arr[i].Type = type.value;
                 tri();
                 localStorage.setItem("produit",JSON.stringify(arr)); 
                 //affecter les valeurs au colonnes creer
                 tableauG.rows[ligne.rowIndex].cells[0].innerHTML = arr[i].Nom;
                 tableauG.rows[ligne.rowIndex].cells[1].innerHTML= arr[i].Marque;
                 tableauG.rows[ligne.rowIndex].cells[2].innerHTML = arr[i].Prix;
                 tableauG.rows[ligne.rowIndex].cells[3].innerHTML = arr[i].DateProduction.split("-").reverse().join("-");
                 tableauG.rows[ligne.rowIndex].cells[5].innerHTML = arr[i].Type;
                 if (oui.checked == true) {
                     tableauG.rows[ligne.rowIndex].cells[4].innerHTML = arr[i].Promotion;   
                 }else if (document.getElementById("non").checked == true) {
                     tableauG.rows[ligne.rowIndex].cells[4].innerHTML = arr[i].Promotion;
                 }
                 //desactiver le boutton modifier reactiver le boutton ajouter
                 document.getElementById("ajouter").innerHTML = "Ajouter";
                 document.getElementById("ajouter").onclick = valider;    
                }
            }
                   
        }     
    }
line();      