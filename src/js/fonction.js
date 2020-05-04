/* eslint-disable */
// eslint-disable-next-line no-unused-vars
/***************************************************************************************************************/
/* fonction pour masque la date soit lord de la prise de rendez-vous ou soit de la modification du rendez-vous */
/***************************************************************************************************************/
export function dateDisabled (ymd, date) {
  let check = false
  const weekday = date.getDay()
  const day = date.getDate()
  const month = date.getMonth()
  if ((weekday === 0) || (weekday === 6) || (month === 0 && day === 1) || (month === 4 && day === 1) || (month === 6 && day === 21) || (month === 7 && day === 15) || (month === 10 && day === 1) || (month === 10 && day === 11) || (month === 11 && day === 25) || (month === 6 && day === 11) || (month === 10 && day === 2) || (month === 10 && day === 15)) {
    check = true
  }
  // Return `true` if the date should be disabled
  return check
}
/*********************************************************************************/
/* fonction utiliser pour le modal qui permet de modifier le rendez-vou demander */
/*********************************************************************************/
/* ouverture modal */
export function showModal () {
  setTimeout(() => {
  this.$refs['my-modal'].show()}, 10)
}
/* modification des données de la base données */
export function TraitementModal (elemModale) {
  let data = elemModale.rdvModal
  let tabDate = data['date'].split('/')
  let dateM = new Date(tabDate[2],tabDate[1]-1,tabDate[0])
  if (dateM == 'Invalid Date'){ // test date correct
    dateM = new Date(data['date'])
  }
  let mdateM = '' + dateM.toLocaleDateString()
  if (mdateM === 'Invalid Date') {
    mdateM = data['date']
  }
  data.date = mdateM

  mdateM = mdateM.replace(/\//gi, '')
  let heureM = data['heure']
  heureM = heureM.replace(':', '')
  let childM = '' + data['hopital'] + '' + mdateM + '' + heureM + '' + data.patient
  data.id = childM
  if (childM == elemModale.rdvModalId) { // test si c'est la meme cle
    this.$firebaseRefs.rdvList.child(elemModale.rdvModalId).update(data)
  } else {
    this.$firebaseRefs.rdvList.child(elemModale.rdvModalId).update({'annule': true})
    this.$firebaseRefs.rdvList.child(childM).set(data)
  }
}
/* fermeture modal */
export function hideModal () {
  setTimeout(() => {
    this.$refs['my-modal'].hide()
  }, 10)
}
/****************************************************************************/
/* fonction pour le message de tooltip dans les components AgendaM, AgendaS */
/****************************************************************************/
export function verUrgent (x) {
  if (x === 'y') {
    return 'warning'
  } else {
    return 'primary'
  }
}
/***************************************************************************************************/
/* fonction utilise pour change la couleur du numéro du jour de la date dans le components AgendaM */
/***************************************************************************************************/
export function verMessage (rdv, patient) {
  let verMessage = 'Rdv du patient est le ' + rdv.date + ', l\'heure est à ' + rdv.heure + '.\n'
  if (rdv.urgent !== 'n') {
    verMessage += 'C\'est une URGENT.\n'
  }
  verMessage += 'C\'est un examen de type : ' + rdv.examen + ', à l\'hopital du ' + rdv.hopital + '.\n'
  verMessage += 'Nom du Patient : ' + patient.Nom + '.\n'
  verMessage += 'Prénom du Patient : ' + patient.Prenom + '.\n'
  if (patient.Sexe === 'M') {
    verMessage += 'C\'est un Homme.\n'
  } else {
    verMessage += 'C\'est un Femme.\n'
  }
  verMessage += 'Née le ' + patient.DateN
  if (patient.Diabete !== 'n') {
    verMessage += 'Personne diabétique de \n' + patient.Diabete + '.\n'
  }
  verMessage += 'Poids : ' + patient.Poids + ' Kg.\n'
  verMessage += 'Taille : ' + patient.Taille + ' cm.\n'
  verMessage += 'NISS : ' + patient.Niss + '.\n'
  verMessage += 'Téléphone : ' + patient.Telephone + '.\n'
  return verMessage
}
